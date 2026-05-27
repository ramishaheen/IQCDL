import { NextResponse } from "next/server";
import {
  accountForRole,
  createSessionToken,
  findAccount,
  type Role,
  ROLE_ORDER,
  SESSION_COOKIE,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { email?: string; password?: string; role?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  let account = null;

  if (body.role && ROLE_ORDER.includes(body.role as Role)) {
    // Demo convenience: sign in directly as a role.
    account = accountForRole(body.role as Role) ?? null;
  } else if (body.email && body.password) {
    account = findAccount(body.email, body.password);
  }

  if (!account) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const user = {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
  };
  const token = await createSessionToken(user);

  const res = NextResponse.json({ user });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
