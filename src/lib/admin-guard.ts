import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

// Returns true only for a valid admin session. Used to gate admin-only API routes.
export async function isAdminRequest(): Promise<boolean> {
  try {
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    if (!token) return false;
    const user = await verifySessionToken(token);
    return user?.role === "admin";
  } catch {
    return false;
  }
}
