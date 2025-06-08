// import { openai } from '@ai-sdk/openai';
import { streamObject } from "ai";
import { outputSchema, systemPrompt } from "@/ai-stuff/output-schema";

import { ollama } from "ollama-ai-provider";
import { groq } from "@ai-sdk/groq";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const body = await req.json();

  const { type, industry, vibe } = JSON.parse(body);

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

  const result = await streamObject({
    model: groq("llama-3.3-70b-versatile"),
    schema: outputSchema,
    schemaName: "projectBrief",
    prompt: userPrompt,
    system: systemPrompt,
  });

  return result.toTextStreamResponse();
}
