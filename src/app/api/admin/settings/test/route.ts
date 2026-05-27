import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-guard";
import { getAnthropicKeys, getStripeKey, loadSettings } from "@/lib/settings-server";

export const runtime = "nodejs";

type Provider = "anthropic-primary" | "anthropic-fallback" | "stripe";

async function testAnthropic(key: string): Promise<{ ok: boolean; message: string }> {
  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: key });
    const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
    const res = await client.messages.create({
      model,
      max_tokens: 5,
      messages: [{ role: "user", content: "ping" }],
    });
    return { ok: true, message: `Connected — model ${res.model} responded.` };
  } catch (err) {
    return { ok: false, message: errText(err) };
  }
}

async function testStripe(key: string): Promise<{ ok: boolean; message: string }> {
  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(key);
    const balance = await stripe.balance.retrieve();
    return { ok: true, message: `Connected — Stripe account live (${balance.livemode ? "live" : "test"} mode).` };
  } catch (err) {
    return { ok: false, message: errText(err) };
  }
}

function errText(err: unknown): string {
  const m = err instanceof Error ? err.message : String(err);
  return m.slice(0, 200);
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  let body: { provider?: Provider; key?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const provider = body.provider;
  // Test the inline value if supplied (test-before-save), else the stored/env value.
  const inline = body.key?.trim();
  const s = await loadSettings();

  if (provider === "stripe") {
    const key = inline || (await getStripeKey());
    if (!key) return NextResponse.json({ ok: false, message: "No Stripe key set." });
    return NextResponse.json(await testStripe(key));
  }

  if (provider === "anthropic-primary" || provider === "anthropic-fallback") {
    let key = inline;
    if (!key) {
      if (provider === "anthropic-primary") {
        key = s.anthropicPrimary || process.env.ANTHROPIC_API_KEY;
      } else {
        key = s.anthropicFallback || process.env.ANTHROPIC_API_KEY_FALLBACK;
      }
    }
    if (!key) return NextResponse.json({ ok: false, message: "No key set." });
    return NextResponse.json(await testAnthropic(key));
  }

  // No provider specified: report how many Anthropic keys are usable.
  const keys = await getAnthropicKeys();
  return NextResponse.json({ ok: keys.length > 0, message: `${keys.length} Anthropic key(s) configured.` });
}
