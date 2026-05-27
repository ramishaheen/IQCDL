import { NextResponse } from "next/server";
import { juryAssess } from "@/lib/ai-jury";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { text?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const result = await juryAssess(body.text ?? "");
  return NextResponse.json(result);
}
