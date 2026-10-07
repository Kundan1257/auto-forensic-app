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
  handleCopyReport,
  isSpeaking = false,
  isCopied = false
}) => {
  const [chatInput, setChatInput] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  
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
    <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-[480px] overflow-hidden w-full shadow-2xl">
      
      {/* PANEL CONTROL SYSTEM ROW */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-cyan-950/60 text-cyan-400 font-mono px-2 py-1 rounded border border-cyan-500/10 uppercase tracking-wider font-bold">
            Interactive AI Triage Box
          </span>
        </div>
        <button 
          type="button" 
          onClick={isCameraActive ? stopCamera : startCamera}
          className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          {isCameraActive ? <VideoOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
        </button>
      </div>

      {/* VIEWPORT STREAM FRAME */}
      {isCameraActive && (
        <div className="flex-grow w-full relative bg-black rounded-xl overflow-hidden my-2 min-h-0 border border-white/5 flex flex-col">
          <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-70" />
          <div className="relative mt-auto w-full p-3 bg-gradient-to-t from-black via-black/40 to-transparent flex items-center justify-between gap-2 z-10">
            <button type="button" onClick={stopCamera} className="text-[10px] bg-white/5 text-slate-300 font-mono px-3 py-1.5 rounded-lg hover:bg-white/10 border border-white/10 uppercase cursor-pointer">Cancel</button>
            <button type="button" onClick={capturePhoto} className="text-[10px] bg-cyan-500 text-slate-950 font-mono font-bold px-4 py-1.5 rounded-lg hover:bg-cyan-400 uppercase tracking-wide cursor-pointer">Capture Snapshot</button>
          </div>
        </div>
      )}

      {/* 💬 ACTIVE SCROLL VIEW CONSOLE MAIN SCREEN AREA PANEL */}
      {!isCameraActive && (
        <div className="flex-grow overflow-y-auto p-2 space-y-3 bg-black/40 border border-white/5 rounded-xl scrollbar-thin scrollbar-thumb-cyan-500/40 scrollbar-track-black/20 mb-3 my-2 min-h-0">
          {messages.map((msg: any, index: number) => (
            <div key={index} className={`flex items-start gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-2.5 rounded-xl text-[11px] max-w-[85%] leading-relaxed ${msg.sender === "user" ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-200" : "bg-white/5 border border-white/10 text-slate-200 font-mono"}`}>
                {msg.image && <img src={msg.image} alt="Component preview" className="w-full max-w-[180px] h-auto rounded-lg mb-2 object-contain border border-white/10 shadow-md" />}
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}
            


          {/* 🧠 DYNAMIC RADAR TRIAGE MOVING BUBBLE COMPONENT INDICATION PIN */}
          {isScanning && (
            <div className="flex items-start gap-2 justify-start animate-pulse my-1">
              <div className="p-2.5 rounded-xl text-[11px] max-w-[85%] leading-relaxed bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono shadow-md flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin flex-shrink-0" />
                <span className="tracking-wide uppercase font-bold text-[9px] tracking-widest block">
                  AI Analyzing Telemetry Layer...
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      )}

                        {/* FOOTER TRIAGE FORM INPUT BLOCK - 🟢 SOLID LAUNCH HIGH-VISIBILITY SUITE */}
      <div className="flex-shrink-0 border-t border-white/10 pt-3">
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
            className={`w-12 h-12 bg-slate-900 border-2 border-white/20 rounded-2xl transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-lg hover:border-cyan-400 hover:bg-cyan-500/10 ${isRecording ? "bg-red-500/20 border-red-500/40 text-red-400 animate-pulse" : "text-slate-100"}`}
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
            className="flex-grow h-12 bg-black/80 border-2 border-cyan-500/40 focus:border-cyan-400 rounded-2xl px-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 font-bold transition-all shadow-xl"
          />

          <button
            type="submit"
            disabled={isScanning || !chatInput.trim() || isCameraActive}
            className="w-12 h-12 rounded-2xl bg-cyan-500 border-2 border-cyan-400 text-slate-950 hover:bg-cyan-400 hover:text-black transition-all cursor-pointer disabled:opacity-20 disabled:bg-white/5 disabled:border-white/10 disabled:text-slate-500 shrink-0 shadow-lg flex items-center justify-center"
          >
            <Send className="w-5 h-5 font-black" />
          </button>
        </form>



        {/* PRICE SUMMARY CARD FOOTER MATRIX BLOCKS */}
        {(reportResult || userIssue) && (
          <div className="grid grid-cols-2 gap-3 mt-2 pt-2 border-t border-white/5 flex-shrink-0">
            <div className="space-y-0.5">
              <span className="text-amber-400 font-mono text-[9px] block font-bold uppercase tracking-wider">Parts Appraisal:</span>
              <div className="text-xl font-black text-emerald-400 font-mono tracking-tight">{finalizedPartsText}</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-indigo-400 font-mono text-[9px] block font-bold uppercase tracking-wider">Labor Fee:</span>
              <div className="text-xl font-black text-emerald-400 font-mono tracking-tight">{finalizedLaborText}</div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
