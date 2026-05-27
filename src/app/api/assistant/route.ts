import { NextResponse } from "next/server";
import { ASSISTANT_SYSTEM_PROMPT, localAnswer } from "@/lib/assistant-kb";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  let body: { messages?: ChatMessage[] } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) => m && typeof m.content === "string" && m.content.trim().length > 0,
  );
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  if (!lastUser) {
    return NextResponse.json({ error: "No message provided" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Live mode: use Claude when a key is configured.
  if (apiKey) {
    try {
      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey });
      const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

      const response = await client.messages.create({
        model,
        max_tokens: 700,
        system: ASSISTANT_SYSTEM_PROMPT,
        messages: messages.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      const reply = response.content
        .filter((block) => block.type === "text")
        .map((block) => (block as { text: string }).text)
        .join("\n")
        .trim();

      return NextResponse.json({
        reply: reply || localAnswer(lastUser.content),
        mode: "live",
      });
    } catch (err) {
      // Fall through to local guide on any API error.
      console.error("Assistant live mode failed, falling back:", err);
    }
  }

  // Fallback: built-in rule-based guide (no key required).
  return NextResponse.json({
    reply: localAnswer(lastUser.content),
    mode: "local",
  });
}
