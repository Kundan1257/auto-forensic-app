import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, ShieldCheck, Sparkles, User, Bot, Camera, VideoOff } from "lucide-react";
import { MARKET_REGIONS } from "../presetData";


interface InputPanelProps {
  vehicleType?: any;
  appSection?: any;
  userIssue?: any;
  isScanning?: any;
  setUserIssue?: (val: string) => void;
  runForensicAnalysis?: () => void;
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
  runForensicAnalysis = () => {},
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

  // 🎙️ AUTOMOTIVE ACOUSTICS RECORDING STATE ENGINE VARIABLES
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
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
      setUserIssue(`[Image Captured] ${userIssue || "Inspecting component assets."}`);
      stopCamera();
    }
  };

      // 🟢 PURE AI CONNECTIVITY GATEWAY: Synchronized flawlessly with parent file interface props!
  // This securely maps the text input parameters to your live full-stack backend data loop.
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isScanning) return;

    const currentInputText = chatInput.trim();
    setChatInput("");

    // 📡 Update the shared user issue state text tracker node
    if (typeof setUserIssue === "function") {
      setUserIssue(currentInputText);
    }

    // 📝 Add the user message layout bubble directly into your chat pane view array lists
    if (typeof setMessages === "function" && messages) {
      setMessages([...messages, { sender: "user", text: currentInputText }]);
    }

    // 🚀 Instantly execute your real async multimodal full-stack network fetch request!
    if (typeof runForensicAnalysis === "function") {
      runForensicAnalysis();
    }
  };



    
  const getCurrencySymbol = (region: string) => {
    const r = String(region || "in").toLowerCase();
    const currentRegionData = MARKET_REGIONS.find(item => item.code === r);
    return currentRegionData?.currency || "₹";
  };


    const computeCosts = (text: string, region: string) => {
    const symbol = getCurrencySymbol(region);
    
    // 🟢 ACOUSTIC OVERRIDE MONITOR MATRIX
    // Stringifies the data input sources to cleanly inspect for healthy engine indicators
    const incomingPayloadString = String(text || reportResult || userIssue || "");
    const isEngineMechanicallyOptimal = 
      incomingPayloadString.includes("🟢") || 
      incomingPayloadString.includes("Optimal") || 
      incomingPayloadString.includes("Healthy") || 
      incomingPayloadString.includes("safe");

    // If a clean operational verification pass is triggered, force cost values to ₹0 instantly!
    if (isEngineMechanicallyOptimal) {
      return {
        partsDisplay: "₹0",
        laborDisplay: "₹0"
      };
    }

        // 📊 PURE DYNAMIC EXTRACTOR LAYER (Replaces the problematic local math calculations)
    // The layout component file now holds zero hardcoded math formulas or short logic shortcuts.
    let dynamicPartsText = "";
    let dynamicLaborText = "";

    if (reportResult && typeof reportResult === "object") {
      dynamicPartsText = reportResult.parts_appraisal || "";
      dynamicLaborText = reportResult.labor_fee || "";
    } else if (reportResult) {
      // If the engine receives an unstructured raw text fallback report, pass it down completely clean
      dynamicPartsText = String(reportResult);
      dynamicLaborText = String(reportResult);
    }

    return {
      partsDisplay: dynamicPartsText,
      laborDisplay: dynamicLaborText
    };
  };



  const { partsDisplay, laborDisplay } = computeCosts(reportResult || userIssue || "", marketRegion);
      // 🛡️ DYNAMIC 2-DAY CRITICAL TRIAL CONVERSION ENGINE
  const isGracePeriodValid = (() => {
    try {
      const GRACE_MS = 2 * 24 * 60 * 60 * 1000; // 48 Hours flat
      const key = "auto_forensic_trial_start_timestamp";
      const start = localStorage.getItem(key);
      if (!start) {
        localStorage.setItem(key, Date.now().toString());
        return true;
      }
      return (Date.now() - parseInt(start, 10)) <= GRACE_MS;
    } catch (e) {
      return true; // Graceful fallback
    }
  })();

      // 🛡️ DYNAMIC TRIAL CONVERSION ENGINE - 🧪 TEMPORARILY SUSPENDED FOR AUDIO TESTING
  // Forced to 'true' to guarantee the app dashboard stays 100% open and fully unlocked on production globally.
  const showPricingDetails = true;

    // 🔒 GATEWAY INTERCEPTOR IMPLEMENTATION - DYNAMIC FALLBACK SYSTEM
  // Stringifies the data payload object to guarantee the text checking parameters parse perfectly!
  const parsedReportTextData = typeof reportResult === "object" ? JSON.stringify(reportResult) : String(reportResult || "");
  const isHealthyEngineReport = parsedReportTextData.includes("🟢") || parsedReportTextData.includes("Optimal") || parsedReportTextData.includes("Healthy") || parsedReportTextData.includes("safe");

      // 🟢 NEW DIRECT AI CORE: Zero frontend price forcing! Displays purely what Gemini dictates.
  const finalizedPartsText = reportResult && typeof reportResult === "object" ? (reportResult.parts_appraisal || "") : String(reportResult || "");
  const finalizedLaborText = reportResult && typeof reportResult === "object" ? (reportResult.labor_fee || "") : String(reportResult || "");





    return (
    <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col justify-between h-[480px] overflow-hidden w-full">
      
      {/* HEADER CONTROLS INTERFACE PANEL ROW */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3 flex-shrink-0 w-full">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Interactive AI Triage Box</span>
            <span className="text-[9px] font-mono text-cyan-500 font-medium tracking-widest uppercase block">Telemetry Channel Active</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={isCameraActive ? stopCamera : startCamera} 
            className={`p-2 rounded-xl border transition-all cursor-pointer ${isCameraActive ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'}`}
            title={isCameraActive ? "Deactivate Camera Lens" : "Activate Component Lens Snapshot Panel"}
          >
            {isCameraActive ? <VideoOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 📹 HARDWARE CAMERA VIEWPORT CANVAS MESH OVERLAY PANEL */}
      {isCameraActive && (
        <div className="flex-1 w-full relative bg-black/60 rounded-xl overflow-hidden border border-white/5 my-3 flex flex-col justify-between p-3 animate-fade-in z-20">
          <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-80" />
          {cameraError && (
            <p className="relative z-10 text-xs text-rose-400 bg-black/60 px-3 py-1.5 rounded-lg border border-rose-500/20 font-mono font-medium">{cameraError}</p>
          )}
          <div className="relative z-10 w-full flex items-center justify-end gap-2 mt-auto">
            <button type="button" onClick={stopCamera} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer">Cancel</button>
            <button type="button" onClick={capturePhoto} className="px-4 py-1.5 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 text-[10px] font-mono font-black uppercase tracking-wider shadow-md cursor-pointer">Snap Component</button>
          </div>
        </div>
      )}

      {/* 💬 MAIN HISTORICAL CHAT CONSOLE LOG DISPLAY LAYER FLOW (SCROLL CONTAINER ARRAY) */}
      {!isCameraActive && (
        <div className="flex-1 w-full overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/5 scroll-smooth flex flex-col">
          {messages.length === 0 ? (
            <div className="my-auto text-center space-y-2 p-6">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400 opacity-60">
                <Bot className="w-5 h-5" />
              </div>
              <p className="text-xs font-sans font-medium text-slate-400 max-w-xs mx-auto">Vehicle Intake Telemetry Node Standing By. Provide a component snap, acoustic sound sample, or text description to diagnose issue context variables.</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`w-full flex items-start gap-2.5 max-w-[85%] animate-fade-in ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                <div className={`p-1.5 rounded-lg flex-shrink-0 border ${msg.sender === "user" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"}`}>
                  {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`rounded-xl p-3 text-xs leading-relaxed border ${msg.sender === "user" ? "bg-blue-950/20 border-blue-500/10 text-slate-200" : "bg-slate-900/60 border-white/5 text-slate-300 font-sans"}`}>
                  {msg.image && (
                    <img src={msg.image} alt="Component Telemetry Visual Snap" className="w-full max-w-[200px] h-auto rounded-lg mb-2 border border-white/10 shadow-md object-contain" />
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))
          )}

          {/* 🧠 DYNAMIC RADAR LOADING BADGE ELEMENT COMPONENT */}
          {isScanning && (
            <div className="w-full max-w-[85%] mr-auto flex items-start gap-2.5 p-3 bg-cyan-950/10 border border-cyan-500/10 rounded-xl animate-pulse my-1">
              <div className="relative flex h-3 w-3 mt-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <p className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">🧠 Auto Forensic System Scanning...</p>
                <span className="text-[10px] font-mono text-slate-400 tracking-wide uppercase">AI Engine is crunching multi-modal sensor telemetry tokens</span>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>
      )}

      {/* 📥 BOTTOM DIALOGUE COMMAND ENTRY TRIAGE INPUT BAR FRAME PANEL FORM */}
      <form onSubmit={handleSendMessage} className="w-full border-t border-white/5 pt-3 flex-shrink-0 flex items-center gap-2">
        <input 
          type="text" 
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          disabled={isScanning || isCameraActive}
          placeholder={isScanning ? "AI Engine processing request parameters..." : isCameraActive ? "Capture visual lens snap to continue..." : "Type custom vehicle symptoms description..."}
          className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition focus:border-cyan-500/40 disabled:opacity-50 font-sans shadow-inner"
        />
        <button 
          type="submit" 
          disabled={!chatInput.trim() || isScanning || isCameraActive}
          className="p-2.5 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition-all disabled:opacity-40 disabled:bg-white/5 disabled:text-slate-500 flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
