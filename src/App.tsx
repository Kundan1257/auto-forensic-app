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

interface BoundaryProps { children: React.ReactNode; }
interface BoundaryState { hasError: boolean; }
class DiagnosticErrorBoundary extends React.Component<BoundaryProps, BoundaryState> {
  public state: BoundaryState = { hasError: false };
  public static getDerivedStateFromError() { return { hasError: true }; }
  public componentDidCatch(err: Error, info: React.ErrorInfo) { console.error("Isolated device bug:", err, info); }
  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/40 text-center shadow-2xl mt-4">
          <span className="text-2xl">🛡️</span>
          <h3 className="text-lg font-bold text-white mt-2">Guardian Shield Active</h3>
          <p className="text-slate-300 text-xs mt-1 leading-relaxed">Your device interface handled the layout metrics uniquely. We have safely isolated this panel layout drawer.</p>
          <button onClick={() => this.setState({ hasError: false })} className="mt-4 px-4 py-2 rounded-xl bg-slate-950 text-amber-400 border border-slate-800 text-xs uppercase font-semibold">Reboot Workspace Panel</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// 📦 IMPORT YOUR COMPLETE PRISTINE SPLIT COMPONENTS
import { SelectionPanel } from "./components/SelectionPanel";
import { InputPanel } from "./components/InputPanel";
import { ViewfinderCard } from "./components/ViewfinderCard";
import { UserManual } from "./components/UserManual";
import { SubscriptionModal } from "./components/SubscriptionModal";

// 🧠 IMPORT GLOBAL UTILITY ASSETS (Updated with TriagePresets!)
import { GLOBAL_LANGUAGES, MARKET_REGIONS, TriagePresets } from "./presetData";
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
  const [showInspectionMenu, setShowInspectionMenu] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const [selectedInspectionMode, setSelectedInspectionMode] = useState<
    "📡 Physical Bluetooth ELM327 Link" | "🌐 Local Wi-Fi Hardware Port" | "🧪 Manual Engine Code Emulation Mode" | null
  >(null);
      const [isSystemUnlocked, setIsSystemUnlocked] = useState(true);


    // 🛡️ BRAND-NEW EMOTIONAL "GUARDIAN ANGEL" TRIAGE STATES
  const [selectedTriage, setSelectedTriage] = useState<any>(null);

    const handleResetEngine = () => {
      if (typeof setReportResult === 'function') setReportResult(null);
      if (typeof setSelectedTriage === 'function') setSelectedTriage(null);
      if (typeof setSystemPassword === 'function') setSystemPassword('');
      if (typeof setIsPasswordInvalid === 'function') setIsPasswordInvalid(false);
    };

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

    const { isTrialExpired } = useTrialGate();

  const [isPremium, setIsPremium] = useState(() => {
      return Boolean(localStorage.getItem("auto_forensic_access_token"));
  });
  const [showPricingModal, setShowPricingModal] = useState(false);
  const betaUnlockStartedRef = useRef(false);

    useEffect(() => {
      const callbackUrl = new URL(window.location.href);
      const betaCode = callbackUrl.searchParams.get("beta");
      if (betaCode === null || betaUnlockStartedRef.current) return;
      betaUnlockStartedRef.current = true;

      const unlockBetaAccess = async () => {
        try {
          const response = await fetch("/api/unlock", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: betaCode }),
          });
          const result = await response.json();
          if (!response.ok || result.unlocked !== true || typeof result.token !== "string") {
            throw new Error(result.error || "Beta access verification failed.");
          }
          localStorage.setItem("auto_forensic_access_token", result.token);
          callbackUrl.searchParams.delete("beta");
          window.history.replaceState(
            window.history.state,
            document.title,
            `${callbackUrl.pathname}${callbackUrl.search}${callbackUrl.hash}`
          );
          setIsPremium(true);
          setIsSystemUnlocked(true);
          setShowPricingModal(false);
        } catch (error) {
          console.error("Beta access verification failed:", error);
        }
      };

      void unlockBetaAccess();
    }, []);

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
        if (typeof verification.token !== "string") {
          throw new Error("Payment verification did not return an access token.");
        }
        if (!isMounted) return;
        localStorage.setItem("auto_forensic_access_token", verification.token);
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

  const handleSystemUnlock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPasswordInvalid(false);
    try {
      const response = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: systemPassword }),
      });
      const result = await response.json();
      if (!response.ok || result.unlocked !== true || typeof result.token !== "string") {
        setIsPasswordInvalid(true);
        return;
      }
      localStorage.setItem("auto_forensic_access_token", result.token);
      localStorage.setItem("auto_forensic_stealth_unlocked", "true");
      setIsPremium(true);
      setIsSystemUnlocked(true);
      setShowPricingModal(false);
      setSystemPassword("");
    } catch (error) {
      console.error("System unlock verification failed:", error);
      setIsPasswordInvalid(true);
    }
  };

  const handleCopyReport = () => {
    if (reportResult) {
      navigator.clipboard.writeText(typeof reportResult === "object" ? JSON.stringify(reportResult) : String(reportResult));
      setIsCopied(true); setTimeout(() => setIsCopied(false), 2000);
    }
  };
    const runForensicAnalysis = async (
    textOverrideParam?: string,
    audioOverrideParam?: string,
    imageOverrideParam?: string
  ) => {
    const activeTelemetryQueryText = (textOverrideParam ?? userIssue).trim();
    if (!activeTelemetryQueryText) return;
    
    setIsScanning(true); setErrorMessage(null); setScanStep("⚡ AI CORE: Connecting...");

    const targetRegionCode = String(marketRegion || "na").toLowerCase().trim();
    const matchingRegionDataRow = MARKET_REGIONS.find(
      (item) => String(item.code || "").toLowerCase().trim() === targetRegionCode
    );
    const targetSymbol = targetRegionCode === "cn" || targetRegionCode === "ch"
      ? "¥"
      : matchingRegionDataRow?.currency || "$";

    try {
      const activeAudioDataStream = audioOverrideParam !== undefined ? audioOverrideParam : audio;
      const activeImageDataStream = imageOverrideParam !== undefined ? imageOverrideParam : image;

      const apiRes = await fetch("/api/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auto_forensic_access_token") || ""}`,
        },
        body: JSON.stringify({
          issue: activeTelemetryQueryText,
          marketRegion,
          currencySymbol: targetSymbol,
          vehicleType,
          appSection,
          appLanguage,
          audioBase64: activeAudioDataStream,
          imageBase64: activeImageDataStream,
        }),
      });

      const aiResponseNode = await apiRes.json();
      if (apiRes.status === 401) {
        localStorage.removeItem("auto_forensic_access_token");
        setIsPremium(false);
        setShowPricingModal(true);
        return;
      }
      if (!apiRes.ok) {
        throw new Error(aiResponseNode.error || "Diagnosis request failed");
      }



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
  const selectedClassification = vehicleType.toUpperCase();
  const runDiagnosticPreset = (issue: string) => {
    setUserIssue(issue);
    setMessages((previous) => [...previous, { sender: "user", text: issue }]);
    runForensicAnalysis(issue, "");
  };

  return (
    <div className="w-full min-h-screen bg-[#050608] text-slate-100 flex flex-col justify-between font-sans overflow-x-hidden relative">
      <header className="w-full border-b border-white/5 bg-[#0a0c10]/80 backdrop-blur-md z-30 p-4">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black tracking-tight uppercase italic text-white">AUTO FORENSIC APP</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setShowPricingModal(true)} style={{ backgroundImage: "linear-gradient(to right, #22d3ee, #34d399, #22d3ee)", backgroundSize: "200% auto", textShadow: "0 0 12px rgba(34, 211, 238, 0.8)", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} className="text-[10px] font-mono px-3 py-1.5 text-black border border-cyan-400 font-bold rounded-full hover:bg-cyan-400 transition-all cursor-pointer uppercase tracking-wider">✨ Upgrade Master Pass</button>
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
            {selectedClassification === "CAR" && (
              <>
                <button type="button" disabled={isScanning} onClick={() => runDiagnosticPreset("Isolate ticking sound near top cylinder valve cover area")} className="min-h-16 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-left text-sm font-bold text-cyan-100 transition-colors hover:bg-cyan-400/20 disabled:opacity-50">Engine Valve Tick</button>
                <button type="button" disabled={isScanning} onClick={() => runDiagnosticPreset("Scan cylinder misfire tracking logs on powertrain control unit")} className="min-h-16 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-left text-sm font-bold text-amber-100 transition-colors hover:bg-amber-400/20 disabled:opacity-50">OBD2 Misfire Check</button>
                <button type="button" disabled={isScanning} onClick={() => runDiagnosticPreset("Analyze E20 fuel stalling symptoms and fuel system compatibility")} className="min-h-16 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-left text-sm font-bold text-emerald-100 transition-colors hover:bg-emerald-400/20 disabled:opacity-50">E20 Stalling</button>
              </>
            )}
            {selectedClassification === "BIKE" && (
              <button type="button" disabled={isScanning} onClick={() => runDiagnosticPreset("Evaluate drive chain link tension margins for sprocket safety")} className="min-h-16 rounded-xl border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-left text-sm font-bold text-rose-100 transition-colors hover:bg-rose-400/20 disabled:opacity-50">Chain Slap Guard</button>
            )}
            {selectedClassification === "TRUCK" && (
              <button type="button" disabled={isScanning} onClick={() => runDiagnosticPreset("Diagnose air brake booster pressure loss")} className="min-h-16 rounded-xl border border-purple-400/40 bg-purple-400/10 px-4 py-3 text-left text-sm font-bold text-purple-100 transition-colors hover:bg-purple-400/20 disabled:opacity-50">Air Brake Booster Loss</button>
            )}
            {selectedClassification === "EV" && (
              <button type="button" disabled={isScanning} onClick={() => runDiagnosticPreset("Measure battery cell degradation delta")} className="min-h-16 rounded-xl border border-lime-400/40 bg-lime-400/10 px-4 py-3 text-left text-sm font-bold text-lime-100 transition-colors hover:bg-lime-400/20 disabled:opacity-50">Cell Degradation Delta</button>
            )}
          </div>
        </section>
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full max-w-4xl mx-auto flex flex-col space-y-6 flex-shrink-0">
            <DiagnosticErrorBoundary>
              <SelectionPanel
                vehicleType={vehicleType}
                setVehicleType={(val) => setVehicleType(val as any)}
                appSection={appSection}
                setAppSection={(val) => setAppSection(val as any)}
              />
              <InputPanel vehicleType={vehicleType} appSection={appSection} userIssue={userIssue} isScanning={isScanning} setUserIssue={setUserIssue} runForensicAnalysis={runForensicAnalysis} messages={messages} setMessages={setMessages} reportResult={reportResult} marketRegion={marketRegion} appLanguage={appLanguage} handleToggleSpeech={handleMicAction} isRecording={isRecording} isPremium={isPremium} isTrialExpired={isTrialExpired} onPremiumRequired={() => setShowPricingModal(true)} handleCopyReport={handleCopyReport} isSpeaking={isSpeaking} isCopied={isCopied} />
            </DiagnosticErrorBoundary>
                        <UserManual
              showInspectionMenu={showInspectionMenu}
              setShowInspectionMenu={setShowInspectionMenu}
              selectedInspectionMode={selectedInspectionMode}
              setSelectedInspectionMode={setSelectedInspectionMode}
              onRunObdScan={(promptText) => {
                setUserIssue(promptText);
                setMessages((prev) => [...prev, { sender: "user", text: promptText }]);
                runForensicAnalysis(promptText, "");
              }}
            />

          </div>
        </div>
      </main>

            {showPricingModal && (
        <SubscriptionModal
          isOpen={showPricingModal}
          onClose={() => setShowPricingModal(false)}
          marketRegion={marketRegion}
          onAppSumoUnlock={() => {
            setIsPremium(true);
            setShowPricingModal(false);
          }}
        />
      )}

                  <footer className="w-full border-t border-white/5 bg-[#0a0c10] p-4 text-center text-xs text-slate-500 font-mono">
        © 2026 Auto Forensic Analysis Engine. All rights reserved. •{" "}
        <button
          type="button"
          onClick={() => setShowPrivacyPolicy(true)}
          className="underline hover:text-cyan-400 transition-colors cursor-pointer"
        >
          Privacy Policy
        </button>
      </footer>

      {showPrivacyPolicy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Privacy Policy"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div className="bg-[#0a0c10] border border-cyan-500/30 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 text-left text-slate-300 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-lg font-bold text-cyan-400">Privacy Policy — Auto Forensic Triage</h2>
              <button
                type="button"
                onClick={() => setShowPrivacyPolicy(false)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <p className="text-xs text-slate-400">
              <strong>Developer:</strong> Auto Forensic Diagnostics • <strong>Package:</strong> com.autoforensic.triage • <strong>Effective Date:</strong> November 22, 2026
            </p>
            <p className="text-sm leading-relaxed">
              Auto Forensic Diagnostics operates the <strong>Auto Forensic Triage</strong> application. This policy discloses how we access, collect, use, and protect user data:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Camera &amp; Photos (Optional):</strong> Photos of vehicle components or repair invoices are transmitted securely solely to generate real-time AI diagnostic and parts appraisal reports. We do not sell or permanently store personal photos.</li>
              <li><strong>Microphone &amp; Audio (Optional):</strong> Audio recordings of engine or exhaust sounds are processed solely to detect mechanical acoustic patterns.</li>
              <li><strong>Diagnostic Text &amp; OBD-II Codes:</strong> Symptom descriptions and OBD-II fault codes are processed ephemerally to generate localized repair estimates.</li>
              <li><strong>Payments &amp; Vouchers:</strong> Transactions are processed securely via authorized payment gateways (such as Razorpay) or lifetime voucher codes (such as AppSumo). We never store raw card details.</li>
            </ul>
            <p className="text-sm">
              <strong>Contact:</strong> For privacy inquiries or data requests, email{" "}
              <a href="mailto:kk0555265@gmail.com" className="text-cyan-400 underline">
                kk0555265@gmail.com
              </a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


