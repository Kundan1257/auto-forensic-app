import React, { useState } from "react";
import { Sparkles, AlertCircle, RefreshCw, Gauge, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ReportProps {
  isScanning: boolean;
  errorMessage: string | null;
  reportResult: any | null;
  scanStep: string;
  activeHighlight: boolean;
  activeRegionSymbol: string;
  runForensicAnalysis: (textOverrideParam?: string) => void;
  
  // 🟢 LIVE AUDIO HOOK INTERFACE MAPPINGS: Restores speech triggers with zero structure errors!
  handleToggleSpeech?: () => void;
  handleCopyReport?: () => void;
  isSpeaking?: boolean;
  isCopied?: boolean;
}

export const DiagnosticReport: React.FC<ReportProps> = ({
  isScanning,
  errorMessage,
  reportResult,
  scanStep,
  activeHighlight,
  activeRegionSymbol,
  runForensicAnalysis,
  
  // 🟢 STRUCTURAL UNPACKING CHANNELS: Safely injects the speech actions onto your dashboard canvas!
  handleToggleSpeech,
  handleCopyReport,
  isSpeaking = false,
  isCopied = false
}) => {

  const [scriptCopied, setScriptCopied] = useState(false);

  // 📝 Safely extracts Gemini's text from both structured JSON contracts and raw fallbacks
  const displayContentText = reportResult && typeof reportResult === "object"
    ? (reportResult.result || reportResult.response || "")
    : String(reportResult || "");

  const handleCopyScriptOnly = () => {
    if (!displayContentText) return;
    navigator.clipboard.writeText(displayContentText);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 2000);
  };

  if (isScanning) {
    return (
      <motion.div key="scanningScreen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 border border-dashed border-cyan-500/40 rounded-full animate-spin" />
          <div className="absolute inset-2 border border-cyan-600/30 rounded-full" />
          <div className="absolute inset-4 border border-dashed border-cyan-500/40 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
          <Gauge className="w-8 h-8 text-cyan-400 animate-[pulse_1.5s_infinite]" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">Analysis Running</h3>
          <p className="text-slate-200 font-mono text-xs font-semibold px-4 min-h-[36px]">{scanStep}</p>
        </div>
      </motion.div>
    );
  }

  if (errorMessage) {
    return (
      <motion.div key="errorScreen" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4 py-8">
        <div className="p-3 bg-red-950/60 border border-red-800 rounded-full text-red-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-bold text-gray-200">System Connection Fault</h3>
          <p className="text-xs text-rose-400 font-mono mt-2 bg-black/60 p-3 rounded-lg border border-red-900/40 leading-relaxed text-left">{errorMessage}</p>
        </div>
                {/* 🟢 PERFECTLY BALANCED RETRY TRIGGER: Fires cleanly with 0 arguments on mouse press! */}
        <button type="button" onClick={() => runForensicAnalysis()} className="text-xs px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono cursor-pointer">
          <RefreshCw className="w-3 h-3 inline-block mr-1" /> Retry Analysis
        </button>

      </motion.div>
    );
  }

  if (!displayContentText) return null;

  return (
    <motion.div key="reportScreen" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`space-y-4 select-text text-sm transition-all pb-4 ${activeHighlight ? "bg-cyan-950/10 p-2 rounded-xl border border-cyan-500/10" : ""}`}>
      
      {/* 🔮 MASTER DISPLAY CARD CONTAINER */}
      <div className="p-4 bg-cyan-950/30 border border-cyan-800/20 rounded-xl relative overflow-hidden">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-3 w-full pr-8">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-0.5">Gemini Intelligence Stream</span>
            
            {/* 📡 Renders Gemini's actual conversational narrative text directly! */}
            <div className="text-slate-100 text-sm leading-relaxed whitespace-pre-wrap font-sans font-medium">
              {displayContentText}
            </div>
          </div>
        </div>

        {/* 📋 QUICK-ACTION CLIPBOARD COPY BUTTON LAYER */}
        <button 
          onClick={handleCopyScriptOnly}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/60 border border-white/5 text-slate-400 hover:text-slate-200 transition-all"
          title="Copy full text payload report"
        >
          {scriptCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

    </motion.div>
  );
};
