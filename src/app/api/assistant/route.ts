import { NextResponse } from "next/server";
import {
  ASSISTANT_SYSTEM_PROMPT,
  GENERAL_SYSTEM_PROMPT,
  localAnswer,
} from "@/lib/assistant-kb";
import { anthropicText } from "@/lib/anthropic";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  let body: { messages?: ChatMessage[]; mode?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const topic: "general" | "tutor" = body.mode === "general" ? "general" : "tutor";

  const messages = (body.messages ?? []).filter(
    (m) => m && typeof m.content === "string" && m.content.trim().length > 0,
  );
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  if (!lastUser) {
    return NextResponse.json({ error: "No message provided" }, { status: 400 });
  }

  // Live mode: use Claude (then DeepSeek fallback) when configured.
  const reply = await anthropicText({
    system: topic === "general" ? GENERAL_SYSTEM_PROMPT : ASSISTANT_SYSTEM_PROMPT,
    messages: messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
    maxTokens: 700,
  });
  if (reply) {
    return NextResponse.json({ reply, mode: "live" });
  }

  // Fallback: built-in rule-based answer (no key required).
  return NextResponse.json({
    reply: localAnswer(lastUser.content, topic),
    mode: "local",
  });
}
