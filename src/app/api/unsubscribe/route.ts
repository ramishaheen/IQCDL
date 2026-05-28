import { NextResponse } from "next/server";
import { findByUnsubscribeToken, updateContact } from "@/lib/contacts-server";

export const runtime = "nodejs";

const PAGE = (title: string, body: string) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} · IQCDL</title>
<style>
  html,body{margin:0;background:#070b14;color:#e2e8f0;font-family:Arial,Helvetica,sans-serif;}
  .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;}
  .card{max-width:520px;width:100%;background:#0f1726;border:1px solid rgba(56,189,248,0.14);border-radius:18px;padding:32px;text-align:center;}
  h1{margin:0 0 12px;font-size:22px;color:#fff;}
  p{margin:8px 0;color:#cbd5e1;line-height:1.6;font-size:15px;}
  a{color:#38bdf8;text-decoration:underline;}
  .brand{font-family:'Arial Black',Arial,sans-serif;font-weight:900;font-size:22px;letter-spacing:3px;color:#38bdf8;margin-bottom:14px;}
</style>
</head>
<body>
<div class="wrap"><div class="card">
  <div class="brand">IQCDL</div>
  <h1>${title}</h1>
  ${body}
  <p style="margin-top:18px;"><a href="https://iqcdl.org">Back to iqcdl.org</a></p>
</div></div>
</body>
</html>`;

function html(content: string, init?: { status?: number }) {
  return new NextResponse(content, {
    status: init?.status ?? 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || "";
  const contact = await findByUnsubscribeToken(token);
  if (!contact) {
    return html(
      PAGE("Link not recognised", "<p>That unsubscribe link is invalid or has expired.</p>"),
      { status: 404 },
    );
  }
  if (contact.unsubscribed) {
    return html(
      PAGE("Already unsubscribed", `<p>You're already opted out — we won't send any more marketing emails to <strong>${contact.email}</strong>.</p>`),
    );
  }
  await updateContact(contact.id, { unsubscribed: true });
  return html(
    PAGE("Unsubscribed", `<p>Done — we've removed <strong>${contact.email}</strong> from our marketing list. You may still receive transactional or account emails (e.g. course or membership notifications).</p>`),
  );
}
