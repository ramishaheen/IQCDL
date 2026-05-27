import { NextResponse } from "next/server";
import { improveDraft } from "@/lib/ai-jury";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { draft?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const result = await improveDraft(body.draft ?? "");
  return NextResponse.json(result);
}
