import { SignJWT, jwtVerify } from "jose";

export type Role = "admin" | "chapter" | "center" | "trainer" | "student";

export const ROLE_ORDER: Role[] = ["admin", "chapter", "center", "trainer", "student"];

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface DemoAccount extends SessionUser {
  password: string;
}

/**
 * Demo accounts for the portal preview. In production these would be replaced
 * by a real identity provider / database. Passwords are intentionally simple
 * because this is a non-production demonstration environment.
 */
export const DEMO_ACCOUNTS: DemoAccount[] = [
  { id: "u-admin", name: "Dr. Rami Shaheen", email: "admin@iqcdl.org", role: "admin", password: "quantum" },
  { id: "u-chapter", name: "Chapter Owner", email: "chapter@iqcdl.org", role: "chapter", password: "quantum" },
  { id: "u-center", name: "Training Center", email: "center@iqcdl.org", role: "center", password: "quantum" },
  { id: "u-trainer", name: "Lead Trainer", email: "trainer@iqcdl.org", role: "trainer", password: "quantum" },
  { id: "u-student", name: "Aisha Q.", email: "student@iqcdl.org", role: "student", password: "quantum" },
];

export const SESSION_COOKIE = "iqcdl_session";

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET || "iqcdl-development-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ name: user.name, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub || !payload.role) return null;
    return {
      id: payload.sub,
      name: String(payload.name ?? ""),
      email: String(payload.email ?? ""),
      role: payload.role as Role,
    };
  } catch {
    return null;
  }
}

export function findAccount(email: string, password: string): DemoAccount | null {
  const normalized = email.trim().toLowerCase();
  return (
    DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === normalized && a.password === password,
    ) ?? null
  );
}

export function accountForRole(role: Role): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find((a) => a.role === role);
}
