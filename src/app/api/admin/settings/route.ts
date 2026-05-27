import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-guard";
import { maskedStatus, saveSettings, type IntegrationSettings } from "@/lib/settings-server";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json(await maskedStatus());
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  let body: Partial<IntegrationSettings> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  await saveSettings({
    anthropicPrimary: body.anthropicPrimary,
    anthropicFallback: body.anthropicFallback,
    stripeSecret: body.stripeSecret,
  });
  return NextResponse.json({ ok: true, status: await maskedStatus() });
}
