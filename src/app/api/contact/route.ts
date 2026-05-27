import { NextResponse } from "next/server";
import { addContact } from "@/lib/contacts-server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { name?: string; email?: string; phone?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();

  if (!EMAIL_RE.test(email) || phone.length < 5) {
    return NextResponse.json(
      { error: "A valid email and contact number are required" },
      { status: 400 },
    );
  }

  const record = await addContact({ name, email, phone });

  // Notify the admin inbox (Resend when configured, otherwise logged).
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_EMAIL || "admin@iqcdl.org";
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM || "IQCDL <onboarding@resend.dev>",
        to,
        subject: `New website contact — ${name || email}`,
        text: `A visitor started a general chat on iqcdl.org.\n\nName: ${name || "—"}\nEmail: ${email}\nContact: ${phone}\nReceived: ${record.createdAt}`,
      });
    } catch (err) {
      console.error("Contact email failed:", err);
    }
  } else {
    console.log(`[contact] ${name || "—"} <${email}> ${phone}`);
  }

  return NextResponse.json({ ok: true });
}
