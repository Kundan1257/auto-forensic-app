import express from "express";
import cors from "cors";
import path from "path";
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
if (!GEMINI_API_KEY) {
  console.error("CRITICAL CONFIGURATION ERROR: GEMINI_API_KEY environment variable is not defined.");
}

export const aiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "" });

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
      text: `You are an elite automotive forensic AI expert. Analyze this vehicle issue description: "${user_issue}" for vehicle category node: ${vehicle_type}.
      
      If an audio file data chunk is present inside this multimodal package, listen to the acoustic parameters (knocks, screeching, ticking, grinding) with absolute precision. Differentiate structural engine knocks from light top-end valvetrain noises.

      ⚠️ MANDATORY DIESEL & HEALTHY ENGINE PERFORMANCE DIRECTIVE:
      - If the user specifies "DIESEL", heavy commercial truck, or a TDI/CRDI vehicle model, expect a naturally loud, rapid, high-compression metallic clicking or rhythmic chattered cadence as its completely healthy operational baseline. 
      - Do NOT mistake normal diesel idling clatter or loud mechanical injection clicks for valve lifter damage, connecting rod defects, or engine failures.
      - If the audio spectrum cadence is perfectly uniform, steady, and lacks chaotic screeching loops or heavy metal-on-metal thuds, classify the powertrain as 100% optimal.
      - If the engine is optimal and safe, you MUST skip all fault summaries and return exactly: partsDisplay = "₹0", laborDisplay = "₹0", and your text summary output MUST start precisely with: "[CRITICAL FAULT DETECTED: 🟢 Engine Performance Status: Optimal. Powertrain operates smoothly within factory-calibrated parameters. Zero faults detected.]"

      CRITICAL UNBREAKABLE CONDITION: You MUST write your complete entire response in the native language script corresponding to this short ISO code: ${app_language || 'en'}. Example: if 'hi' write Hindi text script, if 'ja' write Japanese text script, if 'ko' write Korean text script, if 'zh' write Chinese text script. Do not output any English text rows if a non-English ISO code is specified.
      
      Structure your response exactly like this template layout:
      [CRITICAL FAULT DETECTED: FAULT DESCRIPTION HERE]

      📊 LOGGED TELEMETRY PARAMETERS:
      • Metric items list here

      🧠 AI FORENSIC CAUSE ANALYSIS:
      1. Hardware trace breakdown item here

      🛠️ RECOMMENDATION AUDIT SUMMARY:
      • Engineering remedy list item here
      
      SPECIAL FIELD DIRECTIVE (ELECTRIC VEHICLE NODE SELECTION):
      If the vehicle_type is explicitly specified as 'EV', completely skip internal combustion mechanisms (like spark plugs, fuel line contamination, or exhaust smoke logs). Instead, focus your forensic analysis explicitly on high-voltage battery cell impedance delta variations, thermal coolant circulation loop leaks, regenerative braking pressure drops, or inverter gate driver board fault alerts.

      --- CONTEXT PARAMETERS ---
      Market Location Region: ${market_region}
      Selected Vehicle Type: ${vehicle_type}
      Current Selected App Section Focus: ${app_section}`
    });


    const aiResponse = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: payloadParts,
    });

    // 🟢 The perfect, textbook-ready SDK function call:
const outputText = aiResponse.text || "⚠️ Zero-telemetry return frame from the Proprietary AI Engine model loop.";



    return res.json({ result: outputText });

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
