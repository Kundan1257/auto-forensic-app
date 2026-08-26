import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Activity, ShieldCheck, Sparkles, User, Bot } from "lucide-react";

interface InputPanelProps {
  vehicleType: "Car" | "Bike" | "Truck";
  appSection: "Invoice Audit" | "Common Symptoms" | "PDI Checklist";
  userIssue: string;
  isScanning: boolean;
  setUserIssue: (val: string) => void;
  runForensicAnalysis: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

interface Message {
  sender: "user" | "ai";
  text: string;
}


export const InputPanel: React.FC<InputPanelProps> = ({
  vehicleType,
  appSection,
  userIssue,
  isScanning,
  setUserIssue,
  runForensicAnalysis,
  messages,
  setMessages
}: InputPanelProps) => {
  // Initialize chat history with a welcoming, context-aware mechanical prompt
  // Messages passed down via props from master app configuration chassis
  /*
    {
      sender: "ai" as const,
      text: `Hello! I am your Global AI Forensic Assistant. Describe the noises, smells, or symptoms your ${vehicleType.toLowerCase()} is experiencing, and I will help isolate the mechanical fault.`
    }
  ]); */
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to keep the latest diagnostic messages visible
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle local AI follow-up simulations to guide the user into a comprehensive scan
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessages = [...messages, { sender: "user" as const, text: chatInput }];
    setMessages(newMessages);
    
    // Sync the running chat state back to the master app context log
    setUserIssue(chatInput);
    const cachedInput = chatInput;
    setChatInput("");

    // Simulate smart mechanical follow-up responses
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

  return (
    <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-5 shadow-2xl space-y-4 flex flex-col justify-between h-[450px]">
      
      {/* PANEL HEADER STATUS */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded-full font-mono">03_DIAGNOSTIC_CHAT</span>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive AI Triage Box</span>
          </h3>
        </div>
        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" /> Live Analysis Mode
        </span>
      </div>

      {/* 💬 LIVE CHAT FEED DISPLAY AREA */}
      <div className="flex-grow overflow-y-auto p-2 space-y-3 bg-black/40 border border-white/5 rounded-xl scrollbar-thin scrollbar-thumb-white/5 max-h-[260px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 max-w-[85%] ${
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            <div className={`p-1.5 rounded-lg flex-shrink-0 ${
              msg.sender === "user" ? "bg-cyan-500 text-black" : "bg-white/5 border border-white/10 text-cyan-400"
            }`}>
              {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div className={`p-3 rounded-xl text-xs leading-relaxed font-medium shadow-md ${
              msg.sender === "user"
                ? "bg-cyan-600/20 border border-cyan-500/30 text-slate-100 rounded-tr-none"
                : "bg-slate-900/60 border border-white/[0.03] text-slate-300 rounded-tl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* CHAT ENTRY TRANSMISSION BAR */}
      <form onSubmit={handleSendMessage} className="flex gap-2 flex-shrink-0">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          disabled={isScanning}
          placeholder={`Type custom ${vehicleType.toLowerCase()} symptoms...`}
          className="flex-grow bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/30 font-medium"
        />
        <button
          type="submit"
          disabled={isScanning || !chatInput.trim()}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* 🚀 ULTIMATE DIAGNOSTIC COMPUTE APPRAISAL BUTTON TRIGGER */}
      <div className="space-y-2 flex-shrink-0 pt-1">
        <button
          type="button"
          onClick={runForensicAnalysis}
          disabled={isScanning || !userIssue.trim()}
          className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-500 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed select-none active:scale-[0.99]"
        >
          {isScanning ? (
            <span>Processing Mechanical Telemetry...</span>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Run Auto Forensic Appraisal</span>
            </>
          )}
        </button>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 px-1">


          <span>Target Payload: <strong className="text-slate-400 font-sans">{userIssue ? "Active Log Locked" : "Awaiting Input"}</strong></span>
          <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-emerald-500 animate-pulse" /> Telemetry Loop Ready</span>
        </div>
      </div>

    </div>
  );
};
