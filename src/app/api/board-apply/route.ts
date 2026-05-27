import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; profile?: string; fit?: string; value?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  if (!body.name || !body.email || !body.fit) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOARD_INBOX || "board@iqcdl.org";
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM || "IQCDL <onboarding@resend.dev>",
        to,
        subject: `Board application — ${body.name}`,
        text: `Name: ${body.name}\nEmail: ${body.email}\nProfile: ${body.profile ?? "—"}\n\nFit:\n${body.fit}\n\nValue:\n${body.value ?? "—"}`,
      });
    } catch (err) {
      console.error("Board-apply email failed:", err);
    }
  } else {
    console.log(`[board-apply] ${body.name} <${body.email}>`);
  }
  return NextResponse.json({ ok: true });
}
