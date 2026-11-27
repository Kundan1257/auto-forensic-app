import { createHmac, timingSafeEqual } from "crypto";
import { signAccessToken } from "../../_auth";

export default function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ verified: false, error: "Method not allowed" });
  }

  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!razorpayKeySecret) {
    return res.status(503).json({ verified: false, error: "Payment verification is not configured." });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_payment_link_id,
    razorpay_payment_link_reference_id,
    razorpay_payment_link_status,
    razorpay_signature,
  } = req.body || {};
  if (typeof razorpay_payment_id !== "string" || typeof razorpay_signature !== "string") {
    return res.status(400).json({ verified: false, error: "Missing payment proof." });
  }
  if (!/^[a-f\d]{64}$/i.test(razorpay_signature)) {
    return res.status(400).json({ verified: false, error: "Invalid payment signature." });
  }

  let signedPayload: string;
  if (typeof razorpay_order_id === "string" && razorpay_order_id) {
    signedPayload = `${razorpay_order_id}|${razorpay_payment_id}`;
  } else if (
    typeof razorpay_payment_link_id === "string" && razorpay_payment_link_id &&
    typeof razorpay_payment_link_reference_id === "string" && razorpay_payment_link_reference_id &&
    razorpay_payment_link_status === "paid"
  ) {
    signedPayload = `${razorpay_payment_link_id}|${razorpay_payment_link_reference_id}|${razorpay_payment_link_status}|${razorpay_payment_id}`;
  } else {
    return res.status(400).json({ verified: false, error: "Missing signed order or paid-link details." });
  }

  const expectedSignature = createHmac("sha256", razorpayKeySecret).update(signedPayload).digest();
  const suppliedSignature = Buffer.from(razorpay_signature, "hex");
  if (suppliedSignature.length !== expectedSignature.length || !timingSafeEqual(suppliedSignature, expectedSignature)) {
    return res.status(401).json({ verified: false, error: "Payment signature mismatch." });
  }

  try {
    const token = signAccessToken("premium");
    return res.status(200).json({ verified: true, token });
  } catch (error) {
    console.error("Payment verification token signing failed:", error);
    return res.status(503).json({ verified: false, error: "Payment verification is not configured." });
  }
}
