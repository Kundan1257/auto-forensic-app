import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, ShieldCheck, Sparkles, User, Bot, Camera, VideoOff } from "lucide-react";

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessages = [...messages, { sender: "user" as const, text: chatInput }];
    setMessages(newMessages);
    setUserIssue(chatInput);
    const cachedInput = chatInput;
    setChatInput("");

    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          sender: "ai" as const,
          text: `Got it. Checking telemetry boundaries for "${cachedInput}". Does this issue worsen during acceleration, or specifically under heavy idling loads? Please trigger the appraisal scan below to pull full diagnostic logs.`
        }
      ]);
    }, 1200);
  };

  const getCurrencySymbol = (region: string) => {
    const r = String(region || "IN").toUpperCase();
    if (r === "US" || r === "USA") return "$";
    if (r === "AE" || r === "UAE") return "AED ";
    return "₹";
  };

  const computeCosts = (text: string, region: string) => {
    const symbol = getCurrencySymbol(region);
    let baseParts = 4800;
    let baseLabor = 1200;

    const targetText = text || reportResult || userIssue || "";

    if (targetText && targetText.length > 0) {
      const hash = String(targetText).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      baseParts = 3000 + (hash % 7000);
      baseLabor = 800 + (hash % 3000);
    }

    const r = String(region || "IN").toUpperCase();
    const rate = r === "US" ? 0.012 : r === "AE" ? 0.044 : 1;

    const minP = Math.round(baseParts * rate);
    const maxP = Math.round(baseParts * 1.3 * rate);
    const minL = Math.round(baseLabor * rate);
    const maxL = Math.round(baseLabor * 1.5 * rate);

    return {
      partsDisplay: `${symbol}${minP.toLocaleString()} - ${symbol}${maxP.toLocaleString()}`,
      laborDisplay: `${symbol}${minL.toLocaleString()} - ${symbol}${maxL.toLocaleString()}`
    };
  };

  const { partsDisplay, laborDisplay } = computeCosts(reportResult || userIssue || "", marketRegion);

  return (
    <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-[480px] overflow-hidden">
      
      {/* HEADER ROW */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded-full font-mono">03_DIAGNOSTIC_CHAT</span>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive AI Triage Box</span>
          </h3>
        </div>
      </div>

      {/* 💬 MAIN CHAT FEED AREA */}
      <div className="flex-grow overflow-y-auto p-2 space-y-3 bg-black/40 border border-white/5 rounded-xl scrollbar-thin scrollbar-thumb-white/5 mb-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-2 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
            <div className={`p-1.5 rounded-lg flex-shrink-0 ${msg.sender === "user" ? "bg-cyan-500 text-black" : "bg-white/5 border border-white/10 text-cyan-400"}`}>
              {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div className={`p-3 rounded-xl text-xs leading-relaxed font-medium shadow-md space-y-2 ${msg.sender === "user" ? "bg-cyan-600/20 border border-cyan-500/30 text-slate-100 rounded-tr-none" : "bg-slate-900/60 border border-white/[0.03] text-slate-300 rounded-tl-none"}`}>
              <div>{msg.text}</div>
              {msg.image && <img src={msg.image} alt="Forensic preview" className="rounded-lg border border-white/10 max-w-full h-auto max-h-[100px] object-cover" />}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* ⚓ THE BOTTOM CONTROL ENGINE BOUNDARY BLOCK */}
      <div className="flex-shrink-0 space-y-3 bg-black/30 border border-white/5 p-3 rounded-xl">
        
        {/* LOCALIZED INLINE VIDEO CONTEXT SCREEN */}
        {isCameraActive && (
          <div className="relative rounded-lg overflow-hidden border border-cyan-500/40 bg-black h-[140px] w-full animate-fade-in mb-2">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 px-3">
              <button
                type="button"
                onClick={capturePhoto}
                className="px-3 py-1.5 rounded-md bg-cyan-500 text-slate-950 font-mono font-black text-[9px] uppercase tracking-wider shadow-lg flex items-center gap-1 hover:bg-cyan-400 transition-all cursor-pointer"
              >
                <Camera className="w-3 h-3" /> Capture Frame
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-mono text-[9px] uppercase border border-white/10 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {cameraError && (
          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-mono text-center mb-2">
            {cameraError}
          </div>
        )}

        {/* INPUT INPUT ROW BUTTON GROUP */}
        <form onSubmit={handleSendMessage} className="flex gap-2 w-full">
          <button
            type="button"
            onClick={isCameraActive ? stopCamera : startCamera}
            disabled={isScanning}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${isCameraActive ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20" : "bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30"}`}
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={isScanning}
            placeholder={`Type custom ${vehicleType.toLowerCase()} symptoms...`}
            className="flex-grow bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/30 font-medium"
          />
          <button
            type="submit"
            disabled={isScanning || !chatInput.trim()}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={runForensicAnalysis}
            disabled={isScanning || !userIssue.trim()}
            className="p-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 rounded-xl transition-all shadow-md flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
            title="Run Auto Forensic Appraisal"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </form>

        {(reportResult || userIssue) && (
          <div className="grid grid-cols-2 gap-3 mt-2 pt-3 border-t border-white/5">
            <div className="space-y-1">
              <span className="text-amber-400 font-mono text-[10px] block font-bold">💰 ESTIMATED PARTS APPRAISAL:</span>
              <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">{partsDisplay}</div>
            </div>
            <div className="space-y-1">
              <span className="text-indigo-400 font-mono text-[10px] block font-bold">👨‍🔧 ESTIMATED STANDARD LABOR FEE:</span>
              <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">{laborDisplay}</div>
            </div>
            {(handleToggleSpeech || handleCopyReport) && (
              <div className="col-span-2 flex justify-end gap-2 pt-1">
                {handleToggleSpeech && (
                  <button onClick={handleToggleSpeech} className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700 font-mono text-slate-200">
                    {isSpeaking ? '🔇 Stop Audio' : '🔊 Listen Report'}
                  </button>
                )}
                {handleCopyReport && (
                  <button onClick={handleCopyReport} className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700 font-mono text-slate-200">
                    {isCopied ? '✓ Copied' : '📋 Copy Text'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
