import { timingSafeEqual } from "crypto";
import { signAccessToken } from "./_auth";

export default function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const adminPassword = process.env.ADMIN_UNLOCK_PASSWORD;
  if (!adminPassword) {
    return res.status(503).json({ error: "System unlock is not configured" });
  }

  const password = req.body?.password;
  if (typeof password !== "string") {
    return res.status(401).json({ error: "Invalid password" });
  }

  const expected = Buffer.from(adminPassword, "utf8");
  const supplied = Buffer.from(password, "utf8");
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return res.status(401).json({ error: "Invalid password" });
  }

  try {
    const token = signAccessToken("premium");
    return res.status(200).json({ unlocked: true, token });
  } catch (error) {
    console.error("System unlock token signing failed:", error);
    return res.status(503).json({ error: "System unlock is not configured" });
  }
}
