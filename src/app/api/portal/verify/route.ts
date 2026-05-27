import { NextResponse } from "next/server";
import { findCertificateByToken } from "@/lib/portal-server";

export const runtime = "nodejs";

// Public certificate verification by tokenization number.
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return NextResponse.json({ found: false });
  const cert = await findCertificateByToken(token);
  if (!cert) return NextResponse.json({ found: false });
  return NextResponse.json({
    found: true,
    certificate: {
      studentName: cert.studentName,
      studentNumber: cert.studentNumber,
      level: cert.level,
      token: cert.token,
      issuedAt: cert.issuedAt,
      expiresAt: cert.expiresAt,
      status: cert.status,
    },
  });
}
