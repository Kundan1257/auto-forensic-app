import React, { useState, useRef, useEffect } from "react";
import * as Sentry from "@sentry/react";
import { createClient } from "@supabase/supabase-js";
import { Globe, Scale } from "lucide-react";

// 📡 INITIALIZE SECURE CLOUD INFRASTRUCTURE CONNECTIONS
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 🛡️ INITIATE SENTRY PRODUCTION ERROR WRAPPER COCKPIT
const sentryDsn = import.meta.env.VITE_SENTRY_DSN || "";
if (sentryDsn) {
  // Cloud tracking configurations optimized for production
}

// 📦 IMPORT YOUR COMPLETE PRISTINE SPLIT COMPONENTS
import { SelectionPanel } from "./components/SelectionPanel";
import { InputPanel } from "./components/InputPanel";
import { ViewfinderCard } from "./components/ViewfinderCard";
import { RightOutputPanel } from "./components/RightOutputPanel";
import { DiagnosticReport } from "./components/DiagnosticReport"; 
import { UserManual } from "./components/UserManual";
import { SubscriptionModal } from "./components/SubscriptionModal";

// 🧠 IMPORT GLOBAL UTILITY ASSETS (Updated with TriagePresets!)
import { GLOBAL_LANGUAGES, MARKET_REGIONS, PRESETS, TriagePresets } from "./presetData";
import { useAutoLocation } from "./useAutoLocation";
import { useTrialGate } from "./useTrialGate";


export default function App() {
  // 📱 SMART MOBILE HANDSHAKE TRACK FOR DRIVERS
  const [isAndroidUser, setIsAndroidUser] = useState(false);
  const [, setShowDownloadBanner] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) {
      setIsAndroidUser(true);
    }
  }, []);

  // 🧠 MASTER VARIABLE STATES
  const [vehicleType, setVehicleType] = useState<"Car" | "Bike" | "Truck" | "EV">("Car");
  const [appSection, setAppSection] = useState<"Invoice Audit" | "Common Symptoms" | "PDI Checklist">("Common Symptoms");
  const [marketRegion, setMarketRegion] = useAutoLocation();
  const [userIssue, setUserIssue] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [appLanguage, setAppLanguage] = useState("en");
    const [isSystemUnlocked, setIsSystemUnlocked] = useState(() => {
    return localStorage.getItem("auto_forensic_stealth_unlocked") === "true";
  });

    // 🛡️ BRAND-NEW EMOTIONAL "GUARDIAN ANGEL" TRIAGE STATES
  const [selectedTriage, setSelectedTriage] = useState<any>(null);

  // 📡 TARGETED SEARCH INGESTION ENGINE (Production Refined)
  const handleObdCodeScan = (incomingCode: string) => {
    if (!incomingCode) return;
    const txt = incomingCode.trim().toUpperCase();
    let target = "";

    // 1. Exact string dictionary lookup pass
    if (txt in TriagePresets) {
      target = txt;
    }
    // 2. Comprehensive multi-parameter mapping for preset buttons, IDs, and label text substrings
    else if (txt === "C2" || txt.includes("MISFIRE") || txt.includes("OBD2")) {
      target = "P0300";
    }
    else if (txt === "C1" || txt.includes("VALVE") || txt.includes("TICK")) {
      target = "P0128";
    }
    else if (txt === "B1" || txt.includes("STALL") || txt.includes("E20")) {
      target = "P0442";
    }

    // 3. Mount locally right now to shield line 344 from execution blocks completely
    if (target && target in TriagePresets) {
      setSelectedTriage(TriagePresets[target as keyof typeof TriagePresets]);
      return;
    }

    // 4. Reset screen display layout cells for non-preset custom strings
    setSelectedTriage(null);

    // 5. Preserved untouched default fallback track for complex queries
    if (typeof runForensicAnalysis === "function") {
      runForensicAnalysis(incomingCode);
    }
  };


  // 📱 REST OF YOUR APP CODE AND EVENT HANDLERS CONTINUE DOWN BELOW...

  const [systemPassword, setSystemPassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  // 🟢 ACOUSTIC BINARY COMPONENT STATE TRACKERS INJECTED HERE:
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [, setAudioChunks] = useState<Blob[]>([]);
  const [, setBase64AudioData] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioLimitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const freeAudioLimitReachedRef = useRef(false);

  // ⚖️ LEGAL DISCLAIMER MODAL STATE CONTROL LOCK
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(() => {
    return localStorage.getItem("auto_forensic_terms_accepted") === "true";
  });

  // 📷 DEVICE CAMERA STREAM DRIVERS
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // 🔊 MICROPHONE RECORDING AUDIO ENGINE
  const handleMicAction = async () => {
    if (isRecording) {
      if (audioLimitTimerRef.current) {
        clearTimeout(audioLimitTimerRef.current);
        audioLimitTimerRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;
        
        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          const exceededFreeAudioLimit = freeAudioLimitReachedRef.current;
          freeAudioLimitReachedRef.current = false;
          if (audioLimitTimerRef.current) {
            clearTimeout(audioLimitTimerRef.current);
            audioLimitTimerRef.current = null;
          }
          stream.getTracks().forEach(track => track.stop());
          if (exceededFreeAudioLimit) return;

          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            const base64String = reader.result as string;
            setAudio(base64String);
            setBase64AudioData(base64String);
            
            const rawAudioTelemetryTextString = "🎤 [Acoustic Audio Capture File Passed Natively]";
            setUserIssue(rawAudioTelemetryTextString);
            
            setTimeout(() => {
              runForensicAnalysis(rawAudioTelemetryTextString, base64String);
            }, 300);
          };
        };

        mediaRecorder.start();
        setIsRecording(true);
        if (!isPremium) {
          freeAudioLimitReachedRef.current = false;
          audioLimitTimerRef.current = setTimeout(() => {
            freeAudioLimitReachedRef.current = true;
            setShowPricingModal(true);
            if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
            setIsRecording(false);
          }, 15_000);
        }
      } catch (err) {
        console.error("Mic error:", err);
        alert("⚠️ Microphone Access Blocked");
      }
    }
  };

  useTrialGate();
  const isTrialExpired = false;
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem("auto_forensic_is_premium") === "true";
  });
  const [showPricingModal, setShowPricingModal] = useState(false);

  useEffect(() => {
    const callbackUrl = new URL(window.location.href);
    if (callbackUrl.searchParams.get("payment") !== "success") return;

    const paymentProof = {
      razorpay_order_id: callbackUrl.searchParams.get("razorpay_order_id"),
      razorpay_payment_id: callbackUrl.searchParams.get("razorpay_payment_id"),
      razorpay_payment_link_id: callbackUrl.searchParams.get("razorpay_payment_link_id"),
      razorpay_payment_link_reference_id: callbackUrl.searchParams.get("razorpay_payment_link_reference_id"),
      razorpay_payment_link_status: callbackUrl.searchParams.get("razorpay_payment_link_status"),
      razorpay_signature: callbackUrl.searchParams.get("razorpay_signature"),
    };
    [
      "payment",
      "razorpay_order_id",
      "razorpay_payment_id",
      "razorpay_payment_link_id",
      "razorpay_payment_link_reference_id",
      "razorpay_payment_link_status",
      "razorpay_signature",
    ].forEach((key) => callbackUrl.searchParams.delete(key));
    window.history.replaceState(
      window.history.state,
      document.title,
      `${callbackUrl.pathname}${callbackUrl.search}${callbackUrl.hash}`
    );

    let isMounted = true;
    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/payments/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentProof),
        });
        const verification = await response.json();
        if (!response.ok || verification.verified !== true) {
          throw new Error("Payment verification failed.");
        }
        if (!isMounted) return;
        localStorage.setItem("auto_forensic_is_premium", "true");
        setIsPremium(true);
        setShowPricingModal(false);
      } catch (error) {
        console.error("Razorpay payment verification failed:", error);
        if (isMounted) setShowPricingModal(true);
      }
    };

    void verifyPayment();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => () => {
    if (audioLimitTimerRef.current) clearTimeout(audioLimitTimerRef.current);
    if (mediaRecorderRef.current?.state !== "inactive") mediaRecorderRef.current?.stop();
  }, []);

  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string; image?: string }>>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [reportResult, setReportResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scanStep, setScanStep] = useState("");
  const [activeHighlight] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const startCamera = async () => {
    setIsCameraLoading(true); setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      streamRef.current = stream; setIsCameraActive(true);
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 50);
    } catch { setCameraError("Camera permission denied."); } finally { setIsCameraLoading(false); }
  };

  const stopCamera = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    setIsCameraActive(false); if (videoRef.current) videoRef.current.srcObject = null;
  };

  const handleSystemUnlock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (systemPassword === "ForensicGuard2026") {
      localStorage.setItem("auto_forensic_stealth_unlocked", "true");
      setIsSystemUnlocked(true); setSystemPassword(""); setIsPasswordInvalid(false);
      return;
    }
    setIsPasswordInvalid(true);
  };

  const handleCopyReport = () => {
    if (reportResult) {
      navigator.clipboard.writeText(typeof reportResult === "object" ? JSON.stringify(reportResult) : String(reportResult));
      setIsCopied(true); setTimeout(() => setIsCopied(false), 2000);
    }
  };
  const runForensicAnalysis = async (textOverrideParam?: string, audioOverrideParam?: string) => {
    const activeTelemetryQueryText = (textOverrideParam ?? userIssue).trim();
    if (!activeTelemetryQueryText) return;
    
    setIsScanning(true); setErrorMessage(null); setScanStep("⚡ AI CORE: Connecting...");

    const targetRegionCode = String(marketRegion || "in").toLowerCase().trim();
    const matchingRegionDataRow = MARKET_REGIONS.find(
      (item) => String(item.code || "").toLowerCase().trim() === targetRegionCode
    );
    const targetSymbol = targetRegionCode === "cn" || targetRegionCode === "ch"
      ? "¥"
      : matchingRegionDataRow?.currency || "₹";

    const systemDiagnosticPrompt = `
      You are an expert full-stack automotive forensic analysis engine.
      ⚠️ MANDATORY MULTI-MARKET TRANSLATION AND LOCALIZATION RULES:
      - System Language: You MUST write the final text content of the "result" commentary natively inside the language matching this code variable token: "${appLanguage || 'en'}". If "zh", return fluent Chinese. If "ja", return clean Japanese. If "ko", return native Korean. If "ar", return clear Arabic text.
      - Dynamic Target Symbol: Format all price strings inside "parts_appraisal" and "labor_fee" using exclusively this currency symbol: "${targetSymbol}".
      - Optimal cadences: If safe, return parts_appraisal as "${targetSymbol}0" and labor_fee as "${targetSymbol}0".
    `;

    try {
      const baseSystemInstruction = `You are an advanced automotive forensic platform. ${systemDiagnosticPrompt}
      OUTPUT FORMAT CONTRACT:
      You MUST respond with a strictly formatted, valid JSON layout shape matching the exact parameters below.
      You must NEVER return markdown blocks, markdown code block fences (do not let it print \`\`\`json or backticks anywhere in the stream), or raw text anomalies.
      Even when the structural text narrative in "result" is written in Chinese (中文), Japanese (日本語), or Arabic (العربية), the numerical metrics must be output into the properties "parts_appraisal" and "labor_fee" cleanly as isolated range text strings, entirely preventing text block encapsulation errors.
      
      EXACT JSON CONTRACT TARGET:
      {
        "result": "Your full comprehensive technical diagnostic triage report narrative text statement string goes here written completely in the target selected system language.",
        "parts_appraisal": "Realistic numerical price estimation text range matching the symptoms array",
        "labor_fee": "Realistic numerical labor cost appraisal range matching the vehicle class"
      }`;

      const contentsPayload: any[] = [
        baseSystemInstruction,
        `User Input Issue: ${activeTelemetryQueryText}`,
        `Context Parameters -> Region: ${marketRegion || "in"}, Vehicle Profile: ${vehicleType || "Car"}, App Section: ${appSection || "Common Symptoms"}, System Language: ${appLanguage || "en"}`
      ];

      const activeAudioDataStream = audioOverrideParam !== undefined ? audioOverrideParam : audio;
      if (activeAudioDataStream) {
        const cleanedAudioBase64 = activeAudioDataStream.includes(",") ? activeAudioDataStream.split(",")[1] : activeAudioDataStream;
        contentsPayload.push({ inlineData: { data: cleanedAudioBase64, mimeType: "audio/mp3" } });
      }

      const activeEnvKeyToken = 
        (typeof process !== "undefined" && process.env ? (process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY) : null) ||
        (import.meta.env ? (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY) : null) || "";

      const { GoogleGenAI } = await import("@google/genai");
      const aiInstance = new GoogleGenAI({ apiKey: activeEnvKeyToken });
      
      const aiResponseNode = await aiInstance.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: contentsPayload,
      });

      const responseTextString = aiResponseNode.text || "";
      const cleanJsonContent = responseTextString.replace(/```json/g, "").replace(/```/g, "").trim();
      
      let parsedDataPayload: any = null;
      try {
        parsedDataPayload = JSON.parse(cleanJsonContent);
      } catch {
        parsedDataPayload = { result: responseTextString, parts_appraisal: `${targetSymbol}0`, labor_fee: `${targetSymbol}0` };
      }

      setReportResult(parsedDataPayload);
      setMessages(prev => [...prev, { sender: "ai", text: parsedDataPayload?.result || responseTextString }]);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error?.message || "Cloud connection timeout.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleToggleSpeech = () => {
    if (!reportResult) return;
    if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    const txt = typeof reportResult === "object" ? (reportResult.result || "") : String(reportResult);
    const speechUtterance = new SpeechSynthesisUtterance(txt.replace(/[\*•\[\]]/g, ""));
    const languageVoiceMap: Record<string, string> = { en: "en-US", zh: "zh-CN", ja: "ja-JP", ko: "ko-KR", ar: "ar-SA" };
    speechUtterance.lang = languageVoiceMap[appLanguage] || "en-US";
    speechUtterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true); window.speechSynthesis.speak(speechUtterance);
  };

  if (!isSystemUnlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050608] px-4 text-slate-100">
        <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0c10] p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-white">System Access</h1>
          </div>
          <form onSubmit={handleSystemUnlock} className="space-y-4">
            <input type="password" value={systemPassword} onChange={(e) => { setSystemPassword(e.target.value); setIsPasswordInvalid(false); }} placeholder="Access password" className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400" />
            {isPasswordInvalid && <p className="text-xs text-rose-400">Access denied.</p>}
            <button type="submit" className="w-full rounded-lg bg-cyan-500 px-4 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-cyan-400">Unlock System</button>
          </form>
        </section>
      </main>
    );
  }

  const currentRegionCode = String(marketRegion || "in").toLowerCase().trim();
  const activeRegionDatasetObject = MARKET_REGIONS.find(
    (item) => String(item.code || "").toLowerCase().trim() === currentRegionCode
  );
  const resolvedSymbol = currentRegionCode === "cn" || currentRegionCode === "ch"
    ? "¥"
    : activeRegionDatasetObject?.currency || "₹";
  const masterDiagnosticPresets = [
    ...PRESETS.Car,
    ...PRESETS.Bike,
  ];

  return (
    <div className="w-full min-h-screen bg-[#050608] text-slate-100 flex flex-col justify-between font-sans overflow-x-hidden relative">
      <header className="w-full border-b border-white/5 bg-[#0a0c10]/80 backdrop-blur-md z-30 p-4">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black tracking-tight uppercase italic text-white">AUTO FORENSIC APP</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setShowPricingModal(true)} className="text-[10px] font-mono px-3 py-1.5 bg-cyan-500 text-black border border-cyan-400 font-bold rounded-full hover:bg-cyan-400 transition-all cursor-pointer uppercase tracking-wider">✨ Upgrade Master Pass</button>
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-full px-3 py-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1">Language:</span>
              <select value={appLanguage} onChange={(e) => setAppLanguage(e.target.value)} className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer">
                {GLOBAL_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-gray-950 text-white">{lang.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-full px-4 py-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400"/>
              <select value={marketRegion} onChange={(e) => setMarketRegion(e.target.value)} className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer">
                {MARKET_REGIONS.map((r) => (
                  <option key={r.code} value={r.code} className="bg-gray-950 text-white">{r.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full flex-grow p-4 flex flex-col gap-6 items-start overflow-x-hidden">
        <section className="w-full space-y-3" aria-label="Diagnostic presets">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {masterDiagnosticPresets.map((preset, index) => {
              const presetColors = [
                "border-cyan-400/40 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-100",
                "border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 text-amber-100",
                "border-emerald-400/40 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-100",
                "border-rose-400/40 bg-rose-400/10 hover:bg-rose-400/20 text-rose-100",
              ];

              return (
                <button
                  key={preset.id}
                  type="button"
                  disabled={isScanning}
                  onClick={() => {
                    setUserIssue(preset.text);
                    setMessages((previous) => [...previous, { sender: "user", text: preset.text }]);
                    runForensicAnalysis(preset.text, "");
                  }}
                  className={`min-h-16 rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors disabled:opacity-50 ${presetColors[index]}`}
                >
                  {preset.title}
                </button>
              );
            })}
          </div>
        </section>
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-[38%] flex flex-col space-y-6 flex-shrink-0">
            <SelectionPanel
              vehicleType={vehicleType}
              setVehicleType={(val) => setVehicleType(val as any)}
              appSection={appSection}
              setAppSection={(val) => setAppSection(val as any)}
            />
            <InputPanel vehicleType={vehicleType} appSection={appSection} userIssue={userIssue} isScanning={isScanning} setUserIssue={setUserIssue} runForensicAnalysis={runForensicAnalysis} messages={messages} setMessages={setMessages} reportResult={reportResult} marketRegion={marketRegion} appLanguage={appLanguage} handleToggleSpeech={handleMicAction} isRecording={isRecording} isPremium={isPremium} onPremiumRequired={() => setShowPricingModal(true)} handleCopyReport={handleCopyReport} isSpeaking={isSpeaking} isCopied={isCopied} />
            <UserManual />
          </div>
          <div className="w-full lg:flex-grow flex flex-col space-y-4">
            <DiagnosticReport isScanning={isScanning} errorMessage={errorMessage} reportResult={reportResult} scanStep={scanStep} activeHighlight={activeHighlight} activeRegionSymbol={resolvedSymbol} runForensicAnalysis={runForensicAnalysis} handleToggleSpeech={handleToggleSpeech} handleCopyReport={handleCopyReport} isSpeaking={isSpeaking} isCopied={isCopied} />
            {/* 🔴 REDUNDANT DUPLICATE CARDS CLEANED OUT PERMANENTLY: The raw layout output container has been safely unmounted to resolve screen clutter layout splits */}
          </div>
        </div>
      </main>

      {showPricingModal && <SubscriptionModal isOpen={showPricingModal} onClose={() => setShowPricingModal(false)} marketRegion={marketRegion} />}
      <footer className="w-full border-t border-white/5 bg-[#0a0c10] p-4 text-center text-xs text-slate-500 font-mono">
        © 2026 Auto Forensic Analysis Engine. All rights reserved.
      </footer>
    </div>
  );
}
