import "server-only";
import { getAnthropicKeys } from "./settings-server";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

// Calls Claude, trying the primary key first and the fallback key on failure.
// Returns the text, or null when no key works (callers fall back to local logic).
export async function anthropicText(opts: {
  system: string;
  messages: Msg[];
  maxTokens?: number;
  model?: string;
}): Promise<string | null> {
  const keys = await getAnthropicKeys();
  if (keys.length === 0) return null;

  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const model = opts.model || process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

  for (const key of keys) {
    try {
      const client = new Anthropic({ apiKey: key });
      const res = await client.messages.create({
        model,
        max_tokens: opts.maxTokens ?? 600,
        system: opts.system,
        messages: opts.messages,
      });
      const text = res.content
        .filter((b) => b.type === "text")
        .map((b) => (b as { text: string }).text)
        .join("\n")
        .trim();
      if (text) return text;
    } catch (err) {
      console.error("Anthropic key failed, trying next key:", err);
    }
  }
  return null;
}
