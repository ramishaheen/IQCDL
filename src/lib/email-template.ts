import "server-only";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface MarketingEmailInput {
  title: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaUrl: string;
  unsubscribeUrl: string;
}

/** Returns a brand-styled HTML email for the IQCDL marketing drip. */
export function renderMarketingEmail({
  title,
  paragraphs,
  ctaLabel,
  ctaUrl,
  unsubscribeUrl,
}: MarketingEmailInput): string {
  const paragraphsHtml = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 14px 0;font-size:15px;line-height:1.65;color:#cbd5e1;">${escapeHtml(p)}</p>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#070b14;font-family:Arial,Helvetica,sans-serif;color:#e2e8f0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#070b14;padding:32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#0f1726;border:1px solid rgba(56,189,248,0.14);border-radius:18px;overflow:hidden;">
        <tr>
          <td style="padding:26px 32px;background:linear-gradient(120deg,#1d8ec2 0%,#2ba9e0 60%,#38bdf8 100%);">
            <div style="font-family:'Arial Black',Arial,sans-serif;font-size:30px;letter-spacing:3px;color:#ffffff;font-weight:900;">IQCDL</div>
            <div style="font-size:11px;letter-spacing:2px;color:rgba(255,255,255,0.85);margin-top:4px;">INTERNATIONAL QUANTUM COMPUTING DRIVING LICENSE</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 18px 0;font-size:22px;color:#ffffff;line-height:1.3;font-weight:700;">${escapeHtml(title)}</h1>
            ${paragraphsHtml}
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
              <tr>
                <td style="background:#1d8ec2;border-radius:999px;">
                  <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;padding:13px 24px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">${escapeHtml(ctaLabel)} &rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;background:#050811;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;color:#94a3b8;line-height:1.7;">
            You're receiving this because you contacted IQCDL.<br>
            <a href="${escapeHtml(unsubscribeUrl)}" style="color:#94a3b8;text-decoration:underline;">Unsubscribe</a>
            &nbsp;·&nbsp;
            <a href="https://iqcdl.org" style="color:#94a3b8;text-decoration:underline;">iqcdl.org</a>
            <br>
            Part of the IAIDL group &middot; <a href="https://iaidl.org" style="color:#94a3b8;text-decoration:underline;">iaidl.org</a> &middot; <a href="https://iaidlcollege.co.uk" style="color:#94a3b8;text-decoration:underline;">iaidlcollege.co.uk</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
