import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { deleteTarget, updateTarget, type OutreachStatus } from "@/lib/outreach-server";

export const runtime = "nodejs";

async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const user = token ? await verifySessionToken(token) : null;
  return !!user && user.role === "admin";
}

const ALLOWED_STATUS: OutreachStatus[] = [
  "queued",
  "in-sequence",
  "engaged",
  "replied",
  "dormant",
  "unsubscribed",
];

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  let body: { status?: string; notes?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const patch: Record<string, unknown> = {};
  if (body.status && ALLOWED_STATUS.includes(body.status as OutreachStatus)) {
    patch.status = body.status;
  }
  if (typeof body.notes === "string") patch.notes = body.notes;
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }
  const updated = await updateTarget(id, patch);
  if (!updated) {
    return NextResponse.json({ error: "Target not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, target: updated });
}

export async function DELETE(
  _request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const ok = await deleteTarget(id);
  if (!ok) {
    return NextResponse.json({ error: "Target not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
