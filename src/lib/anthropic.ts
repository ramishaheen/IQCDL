import "server-only";
import { getAnthropicKeys } from "./settings-server";
import { deepseekText } from "./deepseek";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

// Unified AI text helper. Tries Claude first (primary key, then fallback key),
// then DeepSeek as a final fallback. Returns null only when no provider works,
// so callers can fall back to the built-in rule-based logic.
export async function anthropicText(opts: {
  system: string;
  messages: Msg[];
  maxTokens?: number;
  model?: string;
}): Promise<string | null> {
  const keys = await getAnthropicKeys();

  if (keys.length > 0) {
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
  }

  // Final fallback: DeepSeek (no-op when DEEPSEEK_API_KEY is unset).
  return deepseekText({
    system: opts.system,
    messages: opts.messages,
    maxTokens: opts.maxTokens,
  });
}
