import { createHmac, timingSafeEqual } from "crypto";

interface AccessTokenPayload {
  role: string;
  exp: number;
}

const ACCESS_TOKEN_TTL_SECONDS = 30 * 24 * 60 * 60;

export function signAccessToken(role: string): string {
  const secret = process.env.APP_AUTH_SECRET;
  if (!secret) {
    throw new Error("APP_AUTH_SECRET is not configured");
  }

  const payload: AccessTokenPayload = {
    role,
    exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_TTL_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifyAccessToken(token: string): AccessTokenPayload | null {
  const secret = process.env.APP_AUTH_SECRET;
  if (!secret || typeof token !== "string") {
    return null;
  }

  const [encodedPayload, encodedSignature, ...extraParts] = token.split(".");
  if (!encodedPayload || !encodedSignature || extraParts.length > 0) {
    return null;
  }

  const expectedSignature = createHmac("sha256", secret).update(encodedPayload).digest();
  const suppliedSignature = Buffer.from(encodedSignature, "base64url");
  if (
    suppliedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(suppliedSignature, expectedSignature)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as AccessTokenPayload;
    if (
      typeof payload.role !== "string" ||
      typeof payload.exp !== "number" ||
      !Number.isFinite(payload.exp) ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
