import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET || "nooraxis-super-secret-key-12345";
const SESSION_COOKIE_NAME = "nooraxis_admin_session";

export interface SessionPayload {
  email: string;
  expires: number;
}

// Generate an HMAC SHA-256 signature
function generateSignature(payloadStr: string): string {
  return crypto.createHmac("sha256", SECRET).update(payloadStr).digest("hex");
}

// Create a signed token
export function createSessionToken(email: string): string {
  // Session valid for 24 hours
  const expires = Date.now() + 24 * 60 * 60 * 1000;
  const payload: SessionPayload = { email, expires };
  const serializedPayload = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = generateSignature(serializedPayload);
  return `${serializedPayload}.${signature}`;
}

// Verify and decode a token
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [serializedPayload, signature] = parts;
    const expectedSignature = generateSignature(serializedPayload);

    if (signature !== expectedSignature) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(serializedPayload, "base64").toString("utf-8")
) as SessionPayload;

    if (Date.now() > payload.expires) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

const CANDIDATE_COOKIE_NAME = "nooraxis_candidate_session";

export function getCandidateCookieName() {
  return CANDIDATE_COOKIE_NAME;
}

export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}


