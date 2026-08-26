import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// High-limit parsing configurations for direct camera snapshot image base64 payloads
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// Loop-Defending Safe Google Gen AI Studio Initialization Client
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("CRITICAL CONFIGURATION ERROR: GEMINI_API_KEY environment variable is not defined.");
}

// Single isolated global client instance prevents client recreation loops
export const aiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "" });

// ==========================================
// CORE CONSUMER SCANNERS & E20 FUEL DIAGNOSTICS
// ==========================================

// Evaluation Multi-Modal API Route (Hardened against loops, crashes, and model hallucinations)
app.post("/api/evaluate", async (req: express.Request, res: express.Response): Promise<any> => {
  try {
    const { market_region, vehicle_type, app_section, user_issue, image } = req.body;

    // Direct Input Field Validation
    if (!market_region || !vehicle_type || !app_section) {
      return res.status(400).json({ 
        error: "Missing required parameters: market_region, vehicle_type, and app_section are mandatory fields." 
      });
    }

    // Prepare dynamic multimodal payload safely
    const payloadParts: any[] = [];

    // Optional phone camera base64 snapshot parsing
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

    // Append context parameters
    payloadParts.push({
      text: `
--- CONTEXT PARAMETERS ---
Market Location Region: ${market_region}
Selected Vehicle Type: ${vehicle_type}
Current Selected App Section Focus: ${app_section}

--- USER PROBLEM LOGS / SYMPTOMS ---
${user_issue || "No diagnostic text provided. Extrapolating issues directly from visual scan snapshot data."}
`
    });

    // Hardened System Instructions incorporating Indian E20 Ethanol and Core Summary logic
    const consumerProtectionInstruction = `
      You are the core automotive forensic diagnostic engine for the Auto Forensic platform. 
      Your purpose is to evaluate car or bike mechanical issues for everyday used vehicle owners to save them from workshop fraud.
      
      SPECIAL FIELD DIRECTIVE (INDIAN AUTOMOBILE SECTOR - E20 COMPLIANCE):
      The Society of Indian Automobile Manufacturers (SIAM) has documented massive surges in customer field failures due to E20 fuel contamination (excessive moisture and chloride levels) leading to severe corrosion or wear in parts.
      If the user is from India ('market_region' indicates India) or explicitly reports E20 symptoms (jerking, rough idling, starting trouble, stalling after immediate refueling), evaluate for E20 Ethanol-related moisture water ingress, phase separation, or high chloride-related fuel system corrosion.

      EXECUTION CORE MATRIX:
      1. Diagnostic Breakdown: Pinpoint the failing part.
      2. App Summary Header: Generate a highly punchy, clear 1-sentence headline capturing the CORE issue discovered (e.g., "CORE ISSUE DETECTED: E20 Fuel Contamination & Phase Separation in Fuel Tank"). This must act as the primary visual answer.
      3. E20 Risk Evaluation: Check if the vehicle components are breaking due to chemical degradation or pre-April 2023 manufacturing.
      4. Financial Action: Build a hyper-local, realistic repair budget split into parts prices and local labor averages.
    `;

    // Safe content generation matching the exact production library standards (No 3.5 Hallucinations)
    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: payloadParts,
      config: {
        systemInstruction: consumerProtectionInstruction,
        temperature: 0.2, // Low temperature forces strict compliance to json matrices
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            appSummaryCoreIssue: {
              type: "STRING",
              description: "A mandatory, single-sentence, ultra-clear headline capturing the absolute root problem (e.g., 'CORE ISSUE: Faulty Fuel Injectors heavily worn down by E20 Chloride Corrosion')."
            },
            diagnosticBreakdown: { 
              type: "STRING", 
              description: "Clear non-technical explanation of what component is failing, why it occurs, and immediate vehicle risks." 
            },
            severityClassification: { 
              type: "STRING", 
              enum: ["CRITICAL", "MONITOR", "MINOR"] 
            },
            e20EthanolCompatibilityAlert: {
              type: "OBJECT",
              properties: {
                isAtRiskFromEthanol: { type: "BOOLEAN", description: "True if symptoms point to E20 water-ingress phase separation or chloride corrosion." },
                componentRiskAnalysis: { type: "STRING", description: "Technical breakdown of how E20 ethanol or chloride presence is corroding fuel injectors, fuel pumps, EGR valves, or degrading gaskets." },
                preventativeActionTip: { type: "STRING", description: "Indian localized remedy (e.g., using anti-corrosion fuel additives or inspecting fuel lines)." }
              },
              required: ["isAtRiskFromEthanol", "componentRiskAnalysis", "preventativeActionTip"]
            },
            estimatedExpenses: {
              type: "OBJECT",
              properties: {
                currencySymbol: { type: "STRING", description: "The regional currency symbol based on context parameters (e.g., ₹, $)" },
                partsLowerEstimate: { type: "NUMBER" },
                partsUpperEstimate: { type: "NUMBER" },
                laborFeesCalculation: { type: "STRING", description: "Estimated local mechanic labor charge description." }
              },
              required: ["currencySymbol", "partsLowerEstimate", "partsUpperEstimate", "laborFeesCalculation"]
            },
            workshopFraudIndicators: { 
              type: "STRING", 
              description: "Workshop tricks, overcharging notes, or unneeded add-ons mechanics typically upsell for this error." 
            },
            mechanicNegotiationScript: { 
              type: "STRING", 
              description: "A short, sharp script the used car owner can quote to the mechanic to show technical expertise." 
            }
          },
          required: ["appSummaryCoreIssue", "diagnosticBreakdown", "severityClassification", "e20EthanolCompatibilityAlert", "estimatedExpenses", "workshopFraudIndicators", "mechanicNegotiationScript"]
        }
      },
    });

    const reportTextOutput = response.text || "{}";
    const parsedStructuredData = JSON.parse(reportTextOutput);

    return res.status(200).json({ 
      success: true, 
      report: parsedStructuredData 
    });

  } catch (error: any) {
    console.error("Evaluation Route Exception Failure:", error);
    return res.status(500).json({ 
      error: error?.message || "An unexpected error occurred during vehicle diagnostic evaluation." 
    });
  }
});

// ==========================================
// VITE WORKSPACE MIDDLEWARE ENGINE
// ==========================================

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
    
    app.get("*", (req, res): any => {
      return res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Auto Forensic Full-Stack server is operational on port: ${PORT}`);
  });
}

bootstrap();
