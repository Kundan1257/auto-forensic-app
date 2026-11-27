import { GoogleGenAI } from "@google/genai";
import { verifyAccessToken } from "./_auth.js";

function getInlineData(value: unknown, fallbackMimeType: string) {
  if (typeof value !== "string" || !value) {
    return null;
  }

  const dataUrlMatch = value.match(/^data:([^;,]+);base64,(.+)$/s);
  return dataUrlMatch
    ? { mimeType: dataUrlMatch[1], data: dataUrlMatch[2] }
    : { mimeType: fallbackMimeType, data: value };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authorization = req.headers?.authorization;
  const token = typeof authorization === "string" && authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";
  if (!token || !verifyAccessToken(token)) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server GEMINI_API_KEY is missing" });
  }

  const {
    issue = "",
    marketRegion = "na",
    currencySymbol = "$",
    vehicleType = "Car",
    appSection = "Common Symptoms",
    appLanguage = "en",
    audioBase64,
    imageBase64,
  } = req.body || {};
  const prompt = `You are an expert automotive forensic AI mechanic and diagnostic guide.

Analyze the driver's issue and any supplied audio or image evidence. For conversational or informational requests, answer directly with useful step-by-step automotive guidance, and use N/A for cost estimates when no repair is indicated.

MULTI-MARKET CURRENCY RULES:
- The selected market region is "${marketRegion}" and its currency symbol is "${currencySymbol}".
- Format every parts and labor estimate using the provided currency symbol and culturally appropriate numeric grouping for that market.
- Do not substitute another market's currency symbol.

LANGUAGE RULE:
- Write the complete "result" value in the native language and script corresponding to this appLanguage code: "${appLanguage}".

ACOUSTIC AND IMAGE ANALYSIS RULES:
- If the vehicle has a diesel engine, rapid, loud, rhythmic injector clatter can be a normal high-compression operating baseline. Do not diagnose normal diesel clatter as a lifter defect or rod knock without distinct abnormal evidence.
- Diagnose only findings supported by the issue description or supplied media. If the audio is steady and lacks irregular metallic impact or friction sounds, report no fault indicated by the audio and set both parts_appraisal and labor_fee to "${currencySymbol}0".
- If clear abnormal engine knocks, misfires, or physical defects are present, explain the likely cause and provide a realistic market-appropriate parts estimate and workshop labor estimate. State uncertainty where evidence is inconclusive.

STRICT RESPONSE CONTRACT:
- Return one valid JSON object only, without markdown or code fences.
- It must contain exactly these string fields: "result", "parts_appraisal", and "labor_fee".
- "result" must contain the complete diagnostic or instructional answer; the other two fields must contain localized price strings or "N/A".

Vehicle issue: ${typeof issue === "string" ? issue : ""}
Market region: ${marketRegion}
Vehicle type: ${vehicleType}
App section: ${appSection}
App language: ${appLanguage}`;

  const contents: any[] = [{ text: prompt }];
  const audio = getInlineData(audioBase64, "audio/webm");
  if (audio) {
    contents.push({ inlineData: audio });
  }
  const image = getInlineData(imageBase64, "image/jpeg");
  if (image) {
    contents.push({ inlineData: image });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: { responseMimeType: "application/json" },
    });
    return res.status(200).json({ text: response.text || "" });
  } catch (error: any) {
    console.error("Diagnosis failed:", error);
    return res.status(500).json({ error: error?.message || "Diagnosis failed" });
  }
}
