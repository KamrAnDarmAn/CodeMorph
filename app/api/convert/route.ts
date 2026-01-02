import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge"; // optional but recommended

export async function POST(req: Request) {
  const { input, task } = await req.json();

  const prompt = `
You are a syntax converter.

Task: ${task}

Rules:
- Preserve logic
- Do not add explanations
- Output only the converted result

Input:
${input}
`;

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    prompt,
  });

  return result.toTextStreamResponse();
}
