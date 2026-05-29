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
 * Built-in demo accounts for previews and local development. They are only
 * accepted when demo mode is on (non-production, or ALLOW_DEMO_ACCOUNTS=true).
 * In production the only credentialed login is the env-configured admin.
 */
export const DEMO_ACCOUNTS: DemoAccount[] = [
  { id: "u-admin", name: "Dr. Rami Shaheen", email: "admin@iqcdl.org", role: "admin", password: "quantum" },
  { id: "u-chapter", name: "Chapter Owner", email: "chapter@iqcdl.org", role: "chapter", password: "quantum" },
  { id: "u-center", name: "Training Center", email: "center@iqcdl.org", role: "center", password: "quantum" },
  { id: "u-trainer", name: "Lead Trainer", email: "trainer@iqcdl.org", role: "trainer", password: "quantum" },
  { id: "u-student", name: "Aisha Q.", email: "student@iqcdl.org", role: "student", password: "quantum" },
];

export const SESSION_COOKIE = "iqcdl_session";

/** Demo logins (including passwordless role buttons) are only honored in demo mode. */
export function demoAccountsEnabled(): boolean {
  if (process.env.ALLOW_DEMO_ACCOUNTS === "true") return true;
  return process.env.NODE_ENV !== "production";
}

/** Real admin login, configured via env. Active only when ADMIN_PASSWORD is set. */
function envAdminAccount(): DemoAccount | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return {
    id: "u-admin",
    name: process.env.ADMIN_NAME || "Dr. Rami Shaheen",
    email: (process.env.ADMIN_EMAIL || "info@iaidl.org").trim().toLowerCase(),
    role: "admin",
    password,
  };
}

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length > 0) return new TextEncoder().encode(secret);
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production");
  }
  return new TextEncoder().encode("iqcdl-development-secret-change-me");
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

  const admin = envAdminAccount();
  if (admin && admin.email === normalized && admin.password === password) {
    return admin;
  }

  if (demoAccountsEnabled()) {
    return (
      DEMO_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === normalized && a.password === password,
      ) ?? null
    );
  }

  return null;
}

export function accountForRole(role: Role): DemoAccount | undefined {
  if (!demoAccountsEnabled()) return undefined;
  return DEMO_ACCOUNTS.find((a) => a.role === role);
}
