import { streamObject } from "ai";
import { outputSchema, systemPrompt } from "@/ai-stuff/output-schema";

import { ollama } from "ollama-ai-provider";
import { groq } from "@ai-sdk/groq";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

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
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set(
      "Set-Cookie",
      `X-RateLimit-Remaining=${remaining}; Path=/; SameSite=Strict`,
    );
    return response;
  }

  const result = streamObject({
    model: groq("llama-3.3-70b-versatile"),
    mode: "tool",
    schema: outputSchema,
    schemaName: "projectBrief",
    prompt: userPrompt,
    system: systemPrompt,
    maxTokens: 1024,
    onError(event) {
      console.log(event.error);
    },
  });

  const response = result.toTextStreamResponse();
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set(
    "Set-Cookie",
    `X-RateLimit-Remaining=${remaining}; Path=/; SameSite=Strict`,
  );
  return response;
}
