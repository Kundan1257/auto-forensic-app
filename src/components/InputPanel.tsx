import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, ShieldCheck, Sparkles, User, Bot, Camera, VideoOff, Loader2 } from "lucide-react";
import { MARKET_REGIONS } from "../presetData";

interface InputPanelProps {
  vehicleType?: any;
  appSection?: any;
  userIssue?: any;
  isScanning?: any;
  setUserIssue?: (val: string) => void;
  runForensicAnalysis?: (textOverrideParam?: string) => void;
  messages?: Message[];
  setMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
  reportResult?: any;
  marketRegion?: string;
  handleToggleSpeech?: () => void;
  isRecording?: boolean;
  handleCopyReport?: () => void;
  isSpeaking?: boolean;
  isCopied?: boolean;
}

interface Message {
  sender: "user" | "ai";
  text: string;
  image?: string;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  vehicleType,
  userIssue,
  isScanning,
  setUserIssue = () => {},
  runForensicAnalysis = (textOverrideParam?: string) => {},
  messages = [],
  setMessages = () => {},
  reportResult = "",
  marketRegion = "IN",
  handleToggleSpeech,
  isRecording = false,
  handleCopyReport,
  isSpeaking = false,
  isCopied = false
}) => {
  const [chatInput, setChatInput] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => { stopCamera(); };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (err) {
      setCameraError("Camera permission blocked or unavailable.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      
      const imageMessage: Message = {
        sender: "user",
        text: `📸 Attached component frame for mechanical forensic appraisal analysis.`,
        image: dataUrl
      };
      setMessages([...messages, imageMessage]);
      setUserIssue(`[Image Captured] Inspecting component assets.`);
      if (runForensicAnalysis) runForensicAnalysis();
      stopCamera();
    }
  };
        // 🟢 DEADBAND-FREE DISPATCH KERNEL: Guarantees 100% single visual bubble mapping!
  const handleSendMessage = async (e: React.FormEvent) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    
    const textTelemetryInputBuffer = (chatInput || "").trim();
    if (!textTelemetryInputBuffer || isScanning) return;

    setChatInput("");

    // 📡 Step 1: Functional State Updater Pattern — Bypasses array caching loops completely!
    if (typeof setMessages === "function") {
      setMessages(prev => [...prev, { sender: "user", text: textTelemetryInputBuffer }]);
    }

        // 📡 Step 2: Synchronously update the parent full-stack data ingestion tracker node variable
    if (typeof setUserIssue === "function") {
      setUserIssue(textTelemetryInputBuffer);
    }

    // 🚀 Step 3: Direct microtask execution loop to trigger Gemini's cloud network instantly
    // 🟢 PASS THE RAW SNAPSHOT BUFFER VARIABLE DIRECTLY TO CLEAR THE ₹0 LATENCY LOOP!
    if (typeof runForensicAnalysis === "function") {
      runForensicAnalysis(textTelemetryInputBuffer);
    }
  };





  const getCurrencySymbol = (region: string) => {
    const r = String(region || "in").toLowerCase();
    const currentRegionData = MARKET_REGIONS.find(item => item.code === r);
    return currentRegionData?.currency || "₹";
  };

  const computeCosts = (text: string, region: string) => {
    const symbol = getCurrencySymbol(region);
    const incomingPayloadString = String(text || reportResult || userIssue || "");
    const isEngineMechanicallyOptimal = 
      incomingPayloadString.includes("🟢") || 
      incomingPayloadString.includes("Optimal") || 
      incomingPayloadString.includes("Healthy") || 
      incomingPayloadString.includes("safe");

    if (isEngineMechanicallyOptimal) {
      return { partsDisplay: "₹0", laborDisplay: "₹0" };
    }

    let dynamicPartsText = "";
    let dynamicLaborText = "";

    if (reportResult && typeof reportResult === "object") {
      dynamicPartsText = reportResult.parts_appraisal || "";
      dynamicLaborText = reportResult.labor_fee || "";
    } else if (reportResult) {
      dynamicPartsText = String(reportResult);
      dynamicLaborText = String(reportResult);
    }

    return {
      partsDisplay: dynamicPartsText || "₹0",
      laborDisplay: dynamicLaborText || "₹0"
    };
  };

  const { partsDisplay, laborDisplay } = computeCosts(reportResult || userIssue || "", marketRegion);

  const finalizedPartsText = reportResult && typeof reportResult === "object" ? (reportResult.parts_appraisal || "₹0") : "₹0";
  const finalizedLaborText = reportResult && typeof reportResult === "object" ? (reportResult.labor_fee || "₹0") : "₹0";

    return (
    // 🟢 CRISP HIGH-CONTRAST LIGHT MODE WRAPPER CONTAINER
    <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 flex flex-col justify-between h-[520px] overflow-hidden w-full shadow-xl">
      
      {/* PANEL CONTROL SYSTEM ROW */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-slate-100 text-slate-800 font-mono px-3 py-1.5 rounded-lg border border-slate-200 tracking-wider font-black uppercase">
            Interactive AI Triage Box
          </span>
        </div>
        <button 
          type="button" 
          onClick={isCameraActive ? stopCamera : startCamera}
          className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center shadow-sm"
          title={isCameraActive ? "Deactivate Camera Viewfinder" : "Activate Component Camera Snapshot"}
        >
          {isCameraActive ? <VideoOff className="w-5 h-5 text-red-500" /> : <Camera className="w-5 h-5 text-slate-700" />}
        </button>
      </div>

      {/* VIEWPORT STREAM FRAME */}
      {isCameraActive && (
        <div className="flex-grow w-full relative bg-black rounded-2xl overflow-hidden my-3 min-h-0 border border-slate-200 flex flex-col shadow-inner">
          <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="relative mt-auto w-full p-3 bg-gradient-to-t from-black via-black/40 to-transparent flex items-center justify-between gap-2 z-10">
            <button type="button" onClick={stopCamera} className="text-[10px] bg-white/20 text-white font-mono px-3 py-1.5 rounded-lg hover:bg-white/30 border border-white/20 uppercase cursor-pointer">Cancel</button>
            <button type="button" onClick={capturePhoto} className="text-[10px] bg-cyan-500 text-slate-950 font-mono font-bold px-4 py-1.5 rounded-lg hover:bg-cyan-400 uppercase tracking-wide cursor-pointer">Capture Snapshot</button>
          </div>
        </div>
      )}

      {/* 💬 ACTIVE SCROLL VIEW CONSOLE MAIN SCREEN AREA PANEL */}
      {!isCameraActive && (
        <div className="flex-grow overflow-y-auto p-3 space-y-4 bg-slate-50 border border-slate-100 rounded-2xl mb-3 my-3 min-h-0 shadow-inner">
          {messages.map((msg: any, index: number) => (
            <div key={index} className={`flex items-start gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 rounded-2xl text-[12px] max-w-[85%] leading-relaxed shadow-sm font-medium ${msg.sender === "user" ? "bg-cyan-600 text-white border border-cyan-700 font-sans" : "bg-white border border-slate-200 text-slate-800 font-mono"}`}>
                {msg.image && <img src={msg.image} alt="Component preview" className="w-full max-w-[200px] h-auto rounded-xl mb-2 object-contain border border-slate-200 shadow-md" />}
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}

          {/* 🧠 DYNAMIC RADAR TRIAGE MOVING BUBBLE COMPONENT INDICATION PIN */}
          {isScanning && (
            <div className="flex items-start gap-2 justify-start animate-pulse my-2">
              <div className="p-3 rounded-2xl text-[11px] max-w-[85%] leading-relaxed bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono shadow-sm flex items-center gap-2 font-bold">
                <Loader2 className="w-4 h-4 text-cyan-600 animate-spin flex-shrink-0" />
                <span className="tracking-wide uppercase font-bold text-[9px] tracking-widest block">
                  AI Analyzing Telemetry Layer...
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* FOOTER TRIAGE FORM INPUT BLOCK - 🟢 PURE HIGH-CONTRAST LIGHT THEME */}
      <div className="flex-shrink-0 border-t border-slate-100 pt-3">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(e);
          }} 
          className="flex items-center gap-3 w-full h-14"
        >
          <button
            type="button"
            onClick={handleToggleSpeech}
            className={`w-12 h-12 bg-slate-100 border-2 border-slate-200 rounded-2xl transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-sm hover:border-slate-400 hover:bg-slate-200 ${isRecording ? "bg-red-100 border-red-400 text-red-600 animate-pulse" : "text-slate-700"}`}
            title="Ingest Engine Sound File"
          >
            <span className="text-xl shrink-0">🎙️</span>
          </button>

          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={isScanning || isCameraActive}
            placeholder={`Type custom ${vehicleType.toLowerCase()} symptoms...`}
            className="flex-grow h-12 bg-white border-2 border-slate-300 focus:border-cyan-500 rounded-2xl px-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-semibold transition-all shadow-sm"
          />

          <button
            type="submit"
            disabled={isScanning || !chatInput.trim() || isCameraActive}
            className="w-12 h-12 rounded-2xl bg-cyan-600 border-2 border-cyan-700 text-white hover:bg-cyan-500 transition-all cursor-pointer disabled:opacity-20 disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400 shrink-0 shadow-md flex items-center justify-center"
          >
            <Send className="w-5 h-5 text-white stroke-[2.5px]" />
          </button>
        </form>
      




                    {/* PRICE SUMMARY CARD FOOTER MATRIX BLOCKS - 🟢 CASE-INSENSITIVE MULTI-MARKET SYSTEM */}
        {(reportResult || userIssue) && (
          <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100 flex-shrink-0 bg-slate-50/50 p-2.5 rounded-xl">
            <div className="space-y-0.5">
              <span className="text-slate-500 font-mono text-[9px] block font-extrabold uppercase tracking-wider">Parts Appraisal:</span>
              <div className="text-base font-black text-emerald-600 font-mono tracking-tight flex items-center">
                {/* 🟢 TO LOWERCASE: Converts uppercase regions like "CN" or "JP" safely to match your symbols! */}
                {marketRegion?.toLowerCase() === "us" ? "$" : marketRegion?.toLowerCase() === "ae" ? "AED " : marketRegion?.toLowerCase() === "kr" ? "₩" : marketRegion?.toLowerCase() === "cn" ? "¥" : marketRegion?.toLowerCase() === "jp" ? "¥" : "₹"}
                {String(finalizedPartsText || "")
                  .replace(/[¥₩$₹]|AED|약|約|Approx/gi, "")
                  .trim()}
              </div>
            </div>
            
            <div className="space-y-0.5 text-right">
              <span className="text-slate-500 font-mono text-[9px] block font-extrabold uppercase tracking-wider">Labor Fee:</span>
              <div className="text-base font-black text-emerald-600 font-mono tracking-tight flex items-center justify-end">
                {marketRegion?.toLowerCase() === "us" ? "$" : marketRegion?.toLowerCase() === "ae" ? "AED " : marketRegion?.toLowerCase() === "kr" ? "₩" : marketRegion?.toLowerCase() === "cn" ? "¥" : marketRegion?.toLowerCase() === "jp" ? "¥" : "₹"}
                {String(finalizedLaborText || "")
                  .replace(/[¥₩$₹]|AED|약|約|Approx/gi, "")
                  .trim()}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};



