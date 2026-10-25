import React, { useState, useRef, useEffect } from "react";
import { Send, Camera, VideoOff, Loader2 } from "lucide-react";
import { MARKET_REGIONS } from "../presetData";

interface Message { sender: "user" | "ai"; text: string; image?: string; }

interface InputPanelProps {
  vehicleType?: any; appSection?: any; userIssue?: any; isScanning?: any;
  setUserIssue?: (val: string) => void;
  runForensicAnalysis?: (textOverrideParam?: string, audioOverrideParam?: string) => void;
  messages?: Message[]; setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
  reportResult?: any; marketRegion?: string; appLanguage?: string;
  handleToggleSpeech?: () => void; isRecording?: boolean;
  isPremium?: boolean; onPremiumRequired?: () => void;
  handleCopyReport?: () => void; isSpeaking?: boolean; isCopied?: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  vehicleType = "Car", appSection = "Common Symptoms", userIssue = "", isScanning = false,
  setUserIssue = () => {}, runForensicAnalysis = () => {}, messages = [], setMessages = () => {},
  reportResult = "", marketRegion = "IN", appLanguage = "en", handleToggleSpeech,
  isRecording = false, isPremium = false, onPremiumRequired, handleCopyReport, isSpeaking = false, isCopied = false
}) => {
  const [chatInput, setChatInput] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { return () => { if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop()); }; }, []);

  const startCamera = async () => {
    if (!isPremium) {
      onPremiumRequired?.();
      return;
    }
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      streamRef.current = stream; if (videoRef.current) videoRef.current.srcObject = stream; setIsCameraActive(true);
    } catch { setCameraError("Camera blocked."); }
  };

  const stopCamera = () => { if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; } setIsCameraActive(false); };

  const capturePhoto = () => {
    if (!isPremium) {
      stopCamera();
      onPremiumRequired?.();
      return;
    }
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas"); canvas.width = 640; canvas.height = 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, 640, 480); const dataUrl = canvas.toDataURL("image/jpeg"); stopCamera();
      const snapshotIssueText = "📸 [Camera Snapshot Captured Natively]";
      if (setUserIssue) setUserIssue(snapshotIssueText);
      if (setMessages) setMessages(prev => [...prev, { sender: "user", text: snapshotIssueText, image: dataUrl }]);
      runForensicAnalysis(snapshotIssueText, "");
    }
  };

  const computeCosts = (text: string, region: string) => {
    const r = String(region || "in").toLowerCase().trim();
    const currentRegionData = MARKET_REGIONS.find(item => item.code === r)
      ?? (r === "cn" ? MARKET_REGIONS.find(item => item.code === "ch") : undefined);
    const symbol = currentRegionData?.currency || "₹";
    const incoming = String(text || (reportResult && typeof reportResult === "object" ? JSON.stringify(reportResult) : reportResult) || userIssue || "");

    if (incoming.includes("🟢") || incoming.includes("Optimal") || incoming.includes("Healthy") || incoming.includes("safe") || incoming.includes("正常") || incoming.includes("良好")) {
      return { partsDisplay: `${symbol}0`, laborDisplay: `${symbol}0` };
    }

    const formatNumericValue = (value: string | number | undefined) => {
      if (value === undefined || value === null) return "0";
      const cleaned = String(value)
        .replace(/(₹|¥|\$|₩|AED|USD|INR|JPY|KRW)/gi, "")
        .replace(/[^\d.,\-\s]/g, "")
        .trim();
      return cleaned || "0";
    };

    let p = "";
    let l = "";
    if (reportResult && typeof reportResult === "object") {
      p = reportResult.parts_appraisal || "";
      l = reportResult.labor_fee || "";
    } else if (reportResult) {
      p = String(reportResult);
      l = String(reportResult);
    }

    const cleanP = formatNumericValue(p);
    const cleanL = formatNumericValue(l);

    return {
      partsDisplay: `${symbol}${cleanP}`,
      laborDisplay: `${symbol}${cleanL}`,
    };
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); if (!chatInput.trim()) return; const txt = chatInput.trim();
    if (setUserIssue) setUserIssue(txt); if (setMessages) setMessages(prev => [...prev, { sender: "user", text: txt }]);
    setChatInput(""); runForensicAnalysis(txt, "");
  };

    const { partsDisplay, laborDisplay } = computeCosts(reportResult && typeof reportResult === "object" ? JSON.stringify(reportResult) : String(reportResult || ""), marketRegion);
  
  // 🟢 FOOLPROOF DATA RESILIENCE BRIDGE: Checks region, with a dynamic language fallback fallback indicator
  let curReg = String(marketRegion || "").toLowerCase().trim();
  
  // If region is completely dropped or unassigned, auto-bind it based on selected app language parameters
  if (!curReg || curReg === "undefined" || curReg === "null" || curReg === "") {
    const rawLang = String(appLanguage || "").toLowerCase().trim();
    if (rawLang === "zh" || rawLang === "cn") curReg = "cn";
    else if (rawLang === "ja" || rawLang === "jp") curReg = "jp";
    else if (rawLang === "ko" || rawLang === "kr") curReg = "kr";
    else curReg = "in";
  }

  const uiRegionData = MARKET_REGIONS.find(item => item.code === curReg)
    ?? (curReg === "cn" ? MARKET_REGIONS.find(item => item.code === "ch") : undefined);
  const uiSymbol = uiRegionData?.currency || "₹";
  
  return (
    <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 flex flex-col justify-between h-[520px] overflow-hidden w-full shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
        <span className="text-[11px] bg-slate-100 text-slate-800 font-mono px-3 py-1.5 rounded-lg border border-slate-200 font-black uppercase tracking-wider">Interactive AI Triage Box</span>
        <button type="button" onClick={isCameraActive ? stopCamera : startCamera} className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 shadow-sm transition-all cursor-pointer">{isCameraActive ? <VideoOff className="w-5 h-5 text-red-500" /> : <Camera className="w-5 h-5 text-slate-700" />}</button>
      </div>


      {isCameraActive ? (
        <div className="flex-grow w-full relative bg-black rounded-2xl overflow-hidden my-3 min-h-0 border border-slate-200 flex flex-col shadow-inner">
          <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="relative mt-auto w-full p-3 bg-gradient-to-t from-black via-black/40 to-transparent flex items-center justify-between gap-2 z-10">
            <button type="button" onClick={stopCamera} className="text-[10px] bg-white/20 text-white font-mono px-3 py-1.5 rounded-lg hover:bg-white/30 border border-white/20 uppercase cursor-pointer">Cancel</button>
            <button type="button" onClick={capturePhoto} className="text-[10px] bg-cyan-500 text-slate-950 font-mono font-bold px-4 py-1.5 rounded-lg hover:bg-cyan-400 uppercase tracking-wide cursor-pointer">Capture Snapshot</button>
          </div>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto p-3 space-y-4 bg-slate-50 border border-slate-100 rounded-2xl mb-3 my-3 min-h-0 shadow-inner">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 rounded-2xl text-[12px] max-w-[85%] leading-relaxed shadow-sm font-medium ${msg.sender === "user" ? "bg-cyan-600 text-white border border-cyan-700" : "bg-white border border-slate-200 text-slate-800 font-mono"}`}>
                {msg.image && <img src={msg.image} alt="Preview" className="w-full max-w-[200px] h-auto rounded-xl mb-2 object-contain border border-slate-200 shadow-md" />}
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}
          {isScanning && (
            <div className="flex items-start gap-2 justify-start animate-pulse my-2">
              <div className="p-3 rounded-2xl text-[11px] max-w-[85%] leading-relaxed bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono shadow-sm flex items-center gap-2 font-bold">
                <Loader2 className="w-4 h-4 text-cyan-600 animate-spin flex-shrink-0" />
                <span className="tracking-wide uppercase font-bold text-[9px] tracking-widest block">AI Analyzing Telemetry Layer...</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex-shrink-0 border-t border-slate-100 pt-3">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3 w-full h-14">
          <button type="button" onClick={handleToggleSpeech} className={`w-12 h-12 border-2 rounded-2xl transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-lg ${isRecording ? "bg-red-500 border-red-600 text-white animate-pulse" : "bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-400"}`}>
            {isRecording ? <div className="w-3.5 h-3.5 bg-white rounded-sm shrink-0" /> : <span className="text-xl shrink-0">🎙️</span>}
          </button>
          <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} disabled={isScanning || isCameraActive} placeholder={`Type custom ${vehicleType.toLowerCase()} symptoms...`} className="flex-grow h-12 bg-white border-2 border-slate-300 focus:border-cyan-500 rounded-2xl px-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-semibold transition-all shadow-sm" />
          <button type="submit" disabled={isScanning || !chatInput.trim() || isCameraActive} className="w-12 h-12 rounded-2xl bg-cyan-600 border-2 border-cyan-700 text-white hover:bg-cyan-500 transition-all cursor-pointer disabled:opacity-20 shrink-0 shadow-md flex items-center justify-center"><Send className="w-5 h-5 text-white stroke-[2.5px]" /></button>
        </form>

        {(reportResult || userIssue) && (
          <>
            {reportResult && (
              <div className="text-slate-900 text-sm bg-slate-50 border border-slate-200 p-4 rounded-xl font-medium leading-relaxed font-sans mb-3 max-h-60 overflow-y-auto select-text">
                {typeof reportResult === 'object' ? (reportResult.result || '') : String(reportResult)}
              </div>
            )}
            <button onClick={() => window.location.reload()} className="w-full my-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-4 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all">Clear & Reset Diagnostics</button>
            <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100 flex-shrink-0 bg-slate-50/50 p-2.5 rounded-xl">
              <div className="space-y-0.5">
                <span className="text-slate-500 font-mono text-[9px] block font-extrabold uppercase tracking-wider">Parts Appraisal:</span>
                <div className="text-base font-black text-emerald-600 font-mono tracking-tight flex items-center">{uiSymbol}{partsDisplay.replace(/[¥₩\$₹]|AED/gi, "").trim()}</div>
              </div>
              <div className="space-y-0.5 text-right">
                <span className="text-slate-500 font-mono text-[9px] block font-extrabold uppercase tracking-wider">Labor Fee:</span>
                <div className="text-base font-black text-emerald-600 font-mono tracking-tight flex items-center justify-end">{uiSymbol}{laborDisplay.replace(/[¥₩\$₹]|AED/gi, "").trim()}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
