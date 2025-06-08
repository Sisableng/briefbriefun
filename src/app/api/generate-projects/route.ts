// import { openai } from '@ai-sdk/openai';
import { generateObject, streamObject } from "ai";
import { outputSchema, systemPrompt } from "@/ai-stuff/output-schema";

import { ollama } from "ollama-ai-provider";
import { groq } from "@ai-sdk/groq";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create Rate limit
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(5, "1d"),
  enableProtection: true,
});

export async function POST(req: Request) {
  const headers = new Headers();

  const body = await req.json();

  const { type, industry, vibe, ip } = JSON.parse(body);

  const { success, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response("Ratelimited!", { status: 429 });
  }

  headers.set("X-RateLimit-Remaining", remaining.toString());

  const userPrompt = `Generate a fake creative brief from a fictional Indonesian client based on the following parameters:

- Project type: ${type}
- Industry: ${industry}
- Vibe/tone: ${vibe}

Write the full brief now using Bahasa Indonesia.`;

  if (process.env.NODE_ENV === "development") {
    const result = await streamObject({
      model: ollama("llama3.1:8b"),
      schema: outputSchema,
      schemaName: "projectBrief",
      prompt: userPrompt,
      system: systemPrompt,
    });

    return result.toTextStreamResponse();
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

  return result.toTextStreamResponse();
}
