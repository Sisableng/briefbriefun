import { streamObject } from "ai";
import { outputSchema, systemPrompt } from "@/ai-stuff/output-schema";

import { ollama } from "ollama-ai-provider";
import { groq } from "@ai-sdk/groq";
import { google } from "@ai-sdk/google";
import { togetherai } from "@ai-sdk/togetherai";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const modifyResult = (response: Response, remaining: number) => {
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set(
    "Set-Cookie",
    `X-RateLimit-Remaining=${remaining}; Path=/; SameSite=Strict`,
  );
  return response;
};

// Helper function to check if error is rate limit related
const isRateLimitError = (error: any): boolean => {
  const errorMessage = error?.message?.toLowerCase() || "";
  const errorCode = error?.code || "";

  return (
    errorMessage.includes("rate limit") ||
    errorMessage.includes("quota") ||
    errorMessage.includes("too many requests") ||
    errorCode === "RATE_LIMIT_EXCEEDED" ||
    error?.status === 429
  );
};

export async function POST(req: NextRequest) {
  const headers = new Headers();

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

  // Create Rate limit
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(5, "1d"),
    enableProtection: true,
  });

  const { success, remaining } = await ratelimit.limit(session.user.id, {
    ip,
  });

  if (!success && process.env.NODE_ENV === "production") {
    return new Response("Ratelimited!", { status: 429 });
  }

  headers.set("X-RateLimit-Remaining", remaining.toString());

  const userPrompt = `Generate a fake creative brief from a fictional Indonesian client based on the following parameters:

- Project type: ${type}
- Industry: ${industry}
- Vibe/tone: ${vibe}

Write the full brief now using Bahasa Indonesia.`;

  // use local LLM for development
  if (process.env.NODE_ENV === "development") {
    const result = await streamObject({
      model: ollama("llama3.1:8b"),
      schema: outputSchema,
      schemaName: "projectBrief",
      prompt: userPrompt,
      system: systemPrompt,
    });

    const response = result.toTextStreamResponse();
    const modified = modifyResult(response, remaining);
    return modified;
  }

  // Define model configurations in order of preference
  const modelConfigs = [
    {
      name: "google-gemini",
      call: () =>
        streamObject({
          model: google("gemini-2.0-flash-lite"),
          schema: outputSchema,
          schemaName: "projectBrief",
          prompt: userPrompt,
          system: systemPrompt,
        }),
    },
    {
      name: "groq",
      call: () =>
        streamObject({
          model: groq("llama-3.3-70b-versatile"),
          mode: "tool",
          schema: outputSchema,
          schemaName: "projectBrief",
          prompt: userPrompt,
          system: systemPrompt,
          maxTokens: 1024,
        }),
    },
    {
      name: "togetherai",
      call: () =>
        streamObject({
          model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"),
          mode: "tool",
          schema: outputSchema,
          schemaName: "projectBrief",
          prompt: userPrompt,
          system: systemPrompt,
          maxTokens: 1024,
        }),
    },
  ];

  // Try each model in sequence until one succeeds
  let result;
  let usedProvider = "";
  let lastError;

  for (let i = 0; i < modelConfigs.length; i++) {
    const config = modelConfigs[i];

    try {
      console.log(`Trying ${config.name}...`);
      result = await config.call();
      usedProvider = config.name;
      break; // Success! Exit the loop
    } catch (error) {
      console.log(`${config.name} failed:`, error);
      lastError = error;

      // If it's not a rate limit error and it's the first model, re-throw
      if (i === 0 && !isRateLimitError(error)) {
        throw error;
      }

      // Continue to next model if rate limited or if we're already in fallback mode
      if (i < modelConfigs.length - 1) {
        console.log(
          `Rate limit or error detected, falling back to ${modelConfigs[i + 1].name}...`,
        );
        continue;
      }
    }
  }

  // If all models failed
  if (!result) {
    console.log("All AI services failed. Last error:", lastError);
    return new Response(
      "All AI services are currently unavailable. Please try again later.",
      {
        status: 503,
        statusText: "Service Unavailable",
      },
    );
  }

  const response = result.toTextStreamResponse();

  // Add header to indicate which model was used
  response.headers.set("X-AI-Provider", usedProvider);

  const modified = modifyResult(response, remaining);
  return modified;
}
