import express from "express";
import cors from "cors";
import path from "path";
import { createHmac, timingSafeEqual } from "crypto";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors({
  origin: ["https://www.auto-forensic.com", "https://auto-forensic.com"],
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
if (!GEMINI_API_KEY) {
  console.error("CRITICAL CONFIGURATION ERROR: GEMINI_API_KEY environment variable is not defined.");
}

export const aiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "" });

app.post("/api/payments/razorpay/verify", (req: express.Request, res: express.Response): any => {
  if (!RAZORPAY_KEY_SECRET) {
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

  const expectedSignature = createHmac("sha256", RAZORPAY_KEY_SECRET).update(signedPayload).digest();
  let suppliedSignature: Buffer;
  try {
    suppliedSignature = Buffer.from(razorpay_signature, "hex");
  } catch {
    return res.status(400).json({ verified: false, error: "Invalid payment signature." });
  }
  if (suppliedSignature.length !== expectedSignature.length || !timingSafeEqual(suppliedSignature, expectedSignature)) {
    return res.status(401).json({ verified: false, error: "Payment signature mismatch." });
  }

  return res.json({ verified: true });
});

app.post("/api/evaluate", async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { market_region, vehicle_type, app_section, user_issue, image, audio, app_language } = req.body;

    if (!market_region || !vehicle_type || !app_section) {
      return res.status(400).json({ 
        error: "Missing required parameters: market_region, vehicle_type, and app_section are mandatory fields." 
      });
    }

    const payloadParts = [];

    // 📸 CAMERA BASE64 SNAPSHOT PARSING
    if (image && typeof image === "string" && image.includes("base64,")) {
      try {
        const mimeType = image.substring(image.indexOf(":") + 1, image.indexOf(";"));
        const base64Data = image.substring(image.indexOf("base64,") + 7);
        
        payloadParts.push({
          inlineData: {
            mimeType: mimeType || "image/jpeg",
            data: base64Data,
          },
        });
      } catch (imgErr: any) {
        console.error("Failed to parse inline base64 image data payload:", imgErr.message);
      }
    }

    // 🎙️ MULTI-MODAL ACOUSTIC AUDIO TELEMETRY BASE64 PARSING
    if (audio && typeof audio === "string" && audio.includes("base64,")) {
      try {
        const mimeType = audio.substring(audio.indexOf(":") + 1, audio.indexOf(";"));
        const base64Data = audio.substring(audio.indexOf("base64,") + 7);
        
        payloadParts.push({
          inlineData: {
            mimeType: mimeType || "audio/mp3",
            data: base64Data,
          },
        });
        console.log("⚡ Success: Embedded localized audio stream chunk securely into Gemini payload matrix.");
      } catch (audErr: any) {
        console.error("Failed to parse inline base64 audio data payload:", audErr.message);
      }
    }

            payloadParts.push({
      text: `You are an elite automotive forensic AI expert, conversation guide, and master mechanic.
      
      CORE MISSION OBJECTIVE DETERMINATION RULES:
      Analyze the vehicle issue description: "\${user_issue || 'General Conversation and Inquiry Mode'}" for vehicle category node: \${vehicle_type}.
      
            1. GENERAL AUTOMOTIVE INQUIRY & CHAT DIRECTIVE:
         - Autonomously evaluate the user input intent. If the query is conversational, instructional, or informational, answer the user directly with comprehensive, step-by-step guidance arrays based on your complete internal automotive intelligence database. Do not use rigid response templates or ask troubleshooting questions unless a clear mechanical failure sound scan or diagnostic issue is present. Keep the cost parameters completely clean.

      2. MULTIMODAL ACOUSTIC SCAN & PHOTO APPRAISAL DIRECTIVE:
         - If an audio file chunk or component photo frame binary data payload is present inside this multimodal package, inspect the telemetry variables with absolute precision.
         - If the vehicle uses a "DIESEL" high-compression powertrain node, expect a rapid, loud rhythmic injection clatter cadence as its completely optimal operational baseline. Do NOT mistake normal healthy diesel idling noise for lifter defects or rod knocks.
         - If the audio wave spectrum cadence is perfectly uniform, steady, quiet, or lacks chaotic metallic friction thuds, classify the powertrain as 100% optimal. Set your parts_appraisal and labor_fee fields explicitly to "₹0".
         - If clear asymmetrical structural engine knock waves, cylinder misfire logs, or physical photo defects are identified, provide a detailed mechanical forensic cause analysis and use your internal tracking dataset to calculate an accurate, dynamic parts and workshop labor fee projection.

      CRITICAL UNBREAKABLE CONDITION: You MUST write your complete textual response answer in the native language script corresponding to this short ISO code: \${app_language || 'en'}.
      
      RESPONSE FORMAT CONTRACT:
      You MUST respond with a single, perfectly formatted JSON data object structure matching this exact shape. Do not wrap it in markdown code block markers like \`\`\`json. Output raw JSON fields only:
      {
        "result": "Your full comprehensive step-by-step instructional answer or complete automotive diagnostic forensic cause report analysis text here.",
        "parts_appraisal": "Direct calculated price string here (e.g., ₹0, ₹3,500 - ₹5,000, or N/A)",
        "labor_fee": "Direct calculated workshop labor fee string here (e.g., ₹0, ₹1,200 - ₹1,800, or N/A)"
      }

      --- MULTIMODAL INTEGRATION MATRIX ---
      Market Region Code: ${market_region}
      Selected Vehicle Category: ${vehicle_type}
      Current Selected App Section Focus: ${app_section}`
    });



        // 📡 MASTER RE-INITIALIZED API DATA BRIDGE CONTRACT
    // Enforces a strict schema model layout so Gemini responds with raw JSON object parameters
    const aiResponse = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: payloadParts,
      config: {
        responseMimeType: "application/json"
      }
    });

        // 🟢 SECURED TYPE CONTRACT PROCESSING BLOCK
    const outputText = aiResponse.text || ""; // 👈 Added fallback to satisfy type validation contract!
    console.log("📥 Raw response stream from Gemini engine node:", outputText);

    // Parse the textual stream directly into a real dynamic data dictionary frame block
    let structuredPayloadResult;
    try {
      // TypeScript is now 100% happy because outputText is guaranteed to be a valid string primitive!
      structuredPayloadResult = JSON.parse(outputText);
        } catch (parseErr) {
      // 🟢 PURE TRANSPARENT FALLBACK:
      // If the string parsing hits unexpected text formats, completely preserve Gemini's raw text content!
      // This leaves the pricing methodology 100% inside Gemini's intelligence with zero frontend forcing.
      structuredPayloadResult = {
        result: outputText,
        parts_appraisal: outputText,
        labor_fee: outputText
      };
    }


    return res.json(structuredPayloadResult);



  } catch (error: any) {
    console.error("Evaluation Route Exception Failure:", error);
    return res.status(500).json({ 
      error: error?.message || "An unexpected error occurred during vehicle diagnostic evaluation." 
    });
  }
});

async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Express with Vite Development Server Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production static assets safely...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      return res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Auto Forensic Full-Stack server is operational on port: ${PORT}`);
  });
}

bootstrap();
