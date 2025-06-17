import { streamObject } from "ai";
import { createFallback } from "ai-fallback";
import { outputSchema, systemPrompt } from "@/ai-stuff/output-schema";

import { ollama } from "ollama-ai-provider";
import { groq } from "@ai-sdk/groq";
import { google } from "@ai-sdk/google";
import { togetherai } from "@ai-sdk/togetherai";

import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/hooks/useRateLimit";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create fallback model with automatic switching
const fallbackModel = createFallback({
  models: [
    google("gemini-2.0-flash-lite", {
      structuredOutputs: true,
    }), // Primary model
    groq("llama-3.3-70b-versatile"), // First fallback
    togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"), // Second fallback
  ],
  onError: (error, modelId) => {
    console.error(`Error with model ${modelId}:`, error);
  },
  modelResetInterval: 60000, // Reset to primary model after 1 minute
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, industry, vibe, ip } = JSON.parse(body);

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return new Response("Authenticate required", {
      status: 403,
      statusText: "Forbidden",
    });
  }

  // Use the rate limit hook - much cleaner!
  const { success } = await checkRateLimit(
    session.user.id,
    "api", // Use 'api' config (5 requests per day)
    { ip },
  );

  if (!success && process.env.NODE_ENV === "production") {
    return new Response("Ratelimited!", { status: 429 });
  }

  const userPrompt = `Generate a fake creative brief from a fictional Indonesian client based on the following parameters:

- Project type: ${type}
- Industry: ${industry}
- Vibe/tone: ${vibe}

Write the full brief now using Bahasa Indonesia.`;

  // use local LLM for development
  if (process.env.NODE_ENV === "development") {
    const result = streamObject({
      model: ollama("llama3.1:8b"),
      schema: outputSchema,
      schemaName: "projectBrief",
      prompt: userPrompt,
      system: systemPrompt,
    });

    const response = result.toTextStreamResponse();
    return response;
  }

  // Production: Use fallback model (handles switching automatically)
  const result = streamObject({
    model: fallbackModel,
    schema: outputSchema,
    schemaName: "projectBrief",
    prompt: userPrompt,
    system: systemPrompt,
    maxTokens: 1024,
    mode: fallbackModel.currentModelIndex === 1 ? "tool" : "auto",
  });

  const response = result.toTextStreamResponse();
  response.headers.set("X-AI-Provider", "fallback-enabled");

  return response;
}
