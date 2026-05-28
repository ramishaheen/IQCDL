import "server-only";
import { getDeepseekKey } from "./settings-server";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

// Calls DeepSeek's OpenAI-compatible chat API. Used as a fallback when Claude
// is unavailable. Returns the text, or null when no key is set or the call fails.
export async function deepseekText(opts: {
  system: string;
  messages: Msg[];
  maxTokens?: number;
}): Promise<string | null> {
  const key = await getDeepseekKey();
  if (!key) return null;

  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";
  try {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: opts.maxTokens ?? 600,
        messages: [
          { role: "system", content: opts.system },
          ...opts.messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });
    if (!res.ok) {
      console.error("DeepSeek request failed:", res.status, await res.text().catch(() => ""));
      return null;
    }
    const data = await res.json();
    const text = String(data?.choices?.[0]?.message?.content ?? "").trim();
    return text || null;
  } catch (err) {
    console.error("DeepSeek call failed:", err);
    return null;
  }
}
