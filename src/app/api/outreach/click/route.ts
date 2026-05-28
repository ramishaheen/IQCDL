import { NextResponse } from "next/server";
import { findByToken, markClicked } from "@/lib/outreach-server";

export const runtime = "nodejs";

const ALLOWED_HOST_RE = /^https?:\/\/(?:[a-z0-9-]+\.)*iqcdl\.org(?:\/|$)/i;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("t") || "";
  const dest = url.searchParams.get("u") || "";

  // Default safe redirect; we only follow `u` if it points back to our domain.
  const safeDest = ALLOWED_HOST_RE.test(dest) ? dest : "https://iqcdl.org";

  const target = await findByToken(token);
  if (target) {
    await markClicked(target.id).catch(() => undefined);
  }
  return NextResponse.redirect(safeDest, 302);
}
