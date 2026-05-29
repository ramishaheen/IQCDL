import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-guard";
import { listOutbox } from "@/lib/email-outbox";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const limit = Number(new URL(request.url).searchParams.get("limit") ?? "100");
  const items = await listOutbox(Math.max(1, Math.min(500, limit)));
  return NextResponse.json({ items, count: items.length });
}
