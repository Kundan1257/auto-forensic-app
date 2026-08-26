import React from "react";

interface RightOutputPanelProps {
  vehicleType: string;
  userIssue: string;
  setUserIssue: (val: string) => void;
  appLanguage: string;
  marketRegion: string;
  reportResult: any;
  isScanning: boolean;
  errorMessage: string | null;
  scanStep: string;
  activeHighlight: boolean;
  isSpeaking: boolean;
  isCopied: boolean;
  setActiveHighlight: (val: boolean) => void;
  handleToggleSpeech: () => void;
  handleCopyReport: () => void;
  runForensicAnalysis: () => void;
}

export function RightOutputPanel({
  vehicleType,
  userIssue,
  setUserIssue,
  appLanguage,
  marketRegion,
  reportResult,
  isScanning,
  errorMessage,
  scanStep,
  activeHighlight,
  isSpeaking,
  isCopied,
  setActiveHighlight,
  handleToggleSpeech,
  handleCopyReport,
  runForensicAnalysis
}: RightOutputPanelProps) {
  return (
    <div className="w-full">
      
      {/* 🧠 THE INTERACTIVE AI TRIAGE TYPING CHATBOX (MOUNTED PERFECTLY AT THE TOP) */}
      <div className="bg-[#0a0c10]/85 border border-white/5 rounded-xl p-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[10px] font-mono text-slate-500 px-1 border-b border-white/5 pb-2 mb-3">
          <span className="text-cyan-400 font-bold uppercase tracking-wider">⚡ Interactive AI Triage Box</span>
          <div className="flex items-center gap-3">
            <span>DIAGNOSTIC_LOG:{vehicleType.toUpperCase()}_METRICS</span>
            <span className="text-emerald-400">LOCALE: {marketRegion.toUpperCase()}</span>
          </div>
        </div>

        <h2 className="text-sm font-bold text-white mb-1">Ready for Vehicle Diagnostics Checkup</h2>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          To evaluate vehicle issues, isolate faults, check local pricing, and calculate fair workshop repair estimates:
        </p>

        {/* INTERACTIVE CHAT CONTENT LOGS */}
        <div className="space-y-3 bg-black/40 border border-white/5 rounded-lg p-3 min-h-[140px] mb-4 flex flex-col justify-end">
          {reportResult ? (
            <div className="text-xs font-sans text-slate-200 leading-relaxed max-h-[250px] overflow-y-auto pr-1">
              {reportResult}
            </div>
          ) : (
            <div className="text-xs font-mono text-slate-500 space-y-1">
              <p>1. Specify vehicle category filters above.</p>
              <p>2. Optional: Capture component photo evidence via camera.</p>
              <p>3. Detail symptoms or choose a template preset, then scan.</p>
            </div>
          )}
          {isScanning && (
            <div className="text-xs font-mono text-cyan-400 animate-pulse flex items-center gap-2 mt-2">
              <span>🚀</span> <span>{scanStep || "Analyzing pipeline telemetry data..."}</span>
            </div>
          )}
          {errorMessage && (
            <div className="text-xs font-mono text-rose-400 mt-2">
              ⚠️ {errorMessage}
            </div>
          )}
        </div>

        {/* TYPING INPUT CHASSIS ROW */}
        <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-lg px-3 py-2 focus-within:border-cyan-500/30 transition-all">
          <input
            type="text"
            value={userIssue}
            onChange={(e) => setUserIssue(e.target.value)}
            placeholder={`Describe ${vehicleType.toLowerCase()} symptoms or choose a preset question above...`}
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            disabled={isScanning}
          />
          <button
            onClick={runForensicAnalysis}
            disabled={isScanning || !userIssue.trim()}
            className="p-1.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:opacity-40 text-black rounded-md transition-all cursor-pointer flex items-center justify-center flex-shrink-0"
          >
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
