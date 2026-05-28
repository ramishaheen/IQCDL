import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { addTarget, listTargets, type OutreachSegment } from "@/lib/outreach-server";

export const runtime = "nodejs";

async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const user = token ? await verifySessionToken(token) : null;
  return !!user && user.role === "admin";
}

const SEGMENTS: OutreachSegment[] = ["minister", "policymaker", "partner", "sponsor"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const targets = await listTargets();
  return NextResponse.json({ targets });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: {
    name?: string;
    title?: string;
    org?: string;
    country?: string;
    email?: string;
    segment?: string;
    language?: string;
    notes?: string;
  } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const name = (body.name ?? "").trim();
  const org = (body.org ?? "").trim();
  const email = (body.email ?? "").trim();
  const segment = (body.segment ?? "") as OutreachSegment;
  if (!name || !org || !EMAIL_RE.test(email) || !SEGMENTS.includes(segment)) {
    return NextResponse.json(
      { error: "name, org, valid email and a known segment are required" },
      { status: 400 },
    );
  }
  const target = await addTarget({
    name,
    title: body.title,
    org,
    country: body.country,
    email,
    segment,
    language: body.language,
    notes: body.notes,
  });
  return NextResponse.json({ ok: true, target });
}
