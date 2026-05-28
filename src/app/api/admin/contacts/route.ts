import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { listContacts } from "@/lib/contacts-server";

export const runtime = "nodejs";

async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const user = token ? await verifySessionToken(token) : null;
  return !!user && user.role === "admin";
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const contacts = await listContacts();
  return NextResponse.json({ contacts });
}
