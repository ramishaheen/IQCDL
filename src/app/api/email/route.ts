import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const user = token ? await verifySessionToken(token) : null;
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: { to?: string; subject?: string; body?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const to = body.to?.trim();
  const subject = body.subject?.trim();
  const text = body.body?.trim() ?? "";
  if (!to || !subject) {
    return NextResponse.json({ error: "Missing recipient or subject" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "IQCDL <onboarding@resend.dev>";

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        text: text || subject,
      });
      if (error) {
        return NextResponse.json(
          { ok: false, mode: "live", error: error.message },
          { status: 502 },
        );
      }
      return NextResponse.json({ ok: true, mode: "live", id: data?.id });
    } catch (err) {
      console.error("Resend send failed:", err);
      return NextResponse.json(
        { ok: false, mode: "live", error: "Send failed" },
        { status: 502 },
      );
    }
  }

  // No key configured — log only (demo fallback).
  console.log(`[email:mock] to=${to} subject="${subject}"`);
  return NextResponse.json({ ok: true, mode: "mock" });
}
