import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Read-only diagnostic for the auth env config. Returns booleans only — never
 * the actual values of secrets. Hit `/api/auth/diagnostic` from a browser to
 * confirm what the deployed instance has loaded.
 *
 * To disable this endpoint after debugging, set DISABLE_AUTH_DIAGNOSTIC=true
 * in env (it will then return 404).
 */
export async function GET() {
  if (process.env.DISABLE_AUTH_DIAGNOSTIC === "true") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const adminEmail = (process.env.ADMIN_EMAIL || "info@iaidl.org")
    .trim()
    .toLowerCase();

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV ?? "unknown",
    authSecretSet: Boolean(process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 16),
    adminPasswordSet: Boolean(
      process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 1,
    ),
    adminPasswordLength: process.env.ADMIN_PASSWORD?.length ?? 0,
    adminEmailExplicitlySet: Boolean(process.env.ADMIN_EMAIL),
    adminEmailEffective: adminEmail,
    /** Surface a hint about whether demo logins (chapter@, center@, etc.) work. */
    demoAccountsEnabled:
      process.env.ALLOW_DEMO_ACCOUNTS === "true" ||
      process.env.NODE_ENV !== "production",
    /** Anthropic / Stripe presence for the membership flow — booleans only. */
    anthropicKeySet: Boolean(process.env.ANTHROPIC_API_KEY),
    anthropicFallbackSet: Boolean(process.env.ANTHROPIC_API_KEY_FALLBACK),
    deepseekKeySet: Boolean(process.env.DEEPSEEK_API_KEY),
    stripeSecretSet: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeWebhookSet: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    /** Help spot stale deploys: this is baked at build time. */
    commit:
      process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
      process.env.GIT_COMMIT_SHA?.slice(0, 7) ??
      "unknown",
  });
}
