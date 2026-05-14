import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const ALLOWED_EMAILS = ["chandan@moleculeventures.in", "pranjal@moleculeventures.in"];
const LOGIN_PASSWORD = "Molecule@2026";
const EDIT_PASSWORD = "EditMolecule@2026";
const COOKIE_NAME = "mv_admin_session";
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret(): string {
  return process.env.ADMIN_COOKIE_SECRET ?? "mv-fallback-dev-secret-change-in-prod";
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function makeToken(email: string): string {
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = `${email}:${exp}`;
  const sig = sign(payload);
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

function verifyToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const lastColon = decoded.lastIndexOf(":");
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);
    const expected = sign(payload);
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    const colonIdx = payload.lastIndexOf(":");
    const exp = Number(payload.slice(colonIdx + 1));
    if (Date.now() > exp) return null;
    return payload.slice(0, colonIdx); // email
  } catch {
    return null;
  }
}

export function validateCredentials(email: string, password: string): boolean {
  return ALLOWED_EMAILS.includes(email) && password === LOGIN_PASSWORD;
}

export function validateEditPassword(password: string): boolean {
  return password === EDIT_PASSWORD;
}

export async function createSession(email: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, makeToken(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_TTL_MS / 1000,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
