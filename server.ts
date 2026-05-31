import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Request parsing configuration with high limit for direct base64 image payloads (camera snaps/uploads)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// Lazy evaluation client helper to avoid startup crashes if API keys are missing initially
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing. Go to Settings > Secrets in AI Studio to add it.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Evaluation API Route
app.post("/api/evaluate", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { market_region, vehicle_type, app_section, user_issue, image } = req.body;

    // Basic Validation
    if (!market_region || !vehicle_type || !app_section) {
      res.status(400).json({ error: "Missing required parameters: market_region, vehicle_type, and app_section are mandatory." });
      return;
    }

    const ai = getAiClient();

    // Prepare payload parts for multi-modal analysis
    const parts: any[] = [];

    // Optional base64-encoded image input (from scanner/upload)
    if (image && typeof image === "string" && image.includes("base64,")) {
      try {
        const mimeType = image.substring(image.indexOf(":") + 1, image.indexOf(";"));
        const base64Data = image.substring(image.indexOf("base64,") + 7);
        parts.push({
          inlineData: {
            mimeType: mimeType || "image/jpeg",
            data: base64Data,
          },
        });
      } catch (imgErr) {
        console.error("Failed to parse inline base64 image", imgErr);
      }
    }

    // Parameters string
    parts.push({
      text: `
--- PAYLOAD PARAMETERS ---
1. Market Region: ${market_region}
2. Vehicle Type: ${vehicle_type}
3. App Section: ${app_section}

--- USER DETAILED LOGS / ISSUE ---
${user_issue || "No direct text provided (analyzing scanned sheet / capture image)"}
`
    });

    // Instructions as system instruction or config prompt
    const systemInstruction = `You are the primary full-stack AI engine for the "Auto Forensic" app. You evaluate cars, bikes, and trucks to protect users from workshop fraud or bad purchases.

You process an incoming payload with 4 parameters:
1. market_region
2. vehicle_type
3. app_section
4. user_issue (text details or camera scanned images)

EXECUTION MATRIX:
- IF app_section is "Invoice Audit": Analyze line items. Flag overcharging or duplicate labor based on market_region. Provide a 2-sentence mechanic negotiation script.
- IF app_section is "Common Symptoms": Diagnose likely defects for the selected vehicle_type. Mark severity as [CRITICAL], [MONITOR], or [MINOR]. Estimate local repair prices.
- IF app_section is "PDI Checklist": Output a strict physical visual delivery inspection checklist for the dealer stockyard.

FORMAT RULES:
Start immediately with the markdown report. Use bold terms, headers, and bullet points. Never include conversational filler text.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: parts,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // low temperature to adhere strictly to format matrices
      },
    });

    const report = response.text || "Failed to generate evaluation report.";
    res.json({ success: true, report });
  } catch (error: any) {
    console.error("Evaluation error:", error);
    res.status(500).json({ error: error?.message || "An unexpected error occurred during vehicle forensics evaluation." });
  }
});

// Configure Vite middleware in development or serve built files in production
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Express with Vite Development Server Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Auto Forensic Full-Stack server is operational on http://localhost:${PORT}`);
  });
}

bootstrap();
