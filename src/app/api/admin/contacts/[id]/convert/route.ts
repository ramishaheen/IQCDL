import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { markConverted } from "@/lib/contacts-server";

export const runtime = "nodejs";

async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const user = token ? await verifySessionToken(token) : null;
  return !!user && user.role === "admin";
}

export async function POST(
  _request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const updated = await markConverted(id, "admin-tag");
  if (!updated) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, contact: updated });
}
