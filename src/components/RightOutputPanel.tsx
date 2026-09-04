import React from "react";
import { TriageInputBar } from "./TriageInputBar";

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
  onOpenScanner: () => void;
  hasImage: boolean;
  messages?: any[];
  setMessages?: (val: any[]) => void;
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
  runForensicAnalysis,
  onOpenScanner,
  hasImage,
  messages = [],
  setMessages = () => {}
}: RightOutputPanelProps) {
  return (
    <div className="w-full flex flex-col space-y-5">
      
      {/* 💬 CHAT BOX HIGH-CONTRAST VISUAL HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 bg-[#0d1117] p-4 rounded-t-xl">
        <div className="flex items-center gap-2.5">
          <span className="text-cyan-400 text-xl font-bold animate-pulse">⚡</span>
          <h2 className="text-base sm:text-lg font-black font-mono tracking-widest text-cyan-400 uppercase">
            ✨ ══ INTERACTIVE AI FORENSIC TRIAGE BOX ══ ✨
          </h2>
        </div>
        <div className="text-xs font-black font-mono text-slate-400 tracking-wider bg-white/5 px-3 py-1.5 rounded border border-white/5">
          🔍 DIAGNOSTIC_LOG: CAR_METRICS
        </div>
      </div>

      {/* 📜 CONVERSATION LOGS CANVAS MODULE */}
      <div className="bg-[#0a0c10]/60 border border-white/5 rounded-xl p-5 min-h-[380px] max-h-[550px] overflow-y-auto space-y-5 flex flex-col justify-between backdrop-blur-md">
        
        <div className="space-y-5 overflow-y-auto flex-grow pr-1">
          {messages.length === 0 ? (
            <div className="text-center py-10 space-y-4 animate-fade-in">
              <div className="text-4xl">🧠</div>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">✨ READY FOR VEHICLE DIAGNOSTICS CHECKUP ✨</h3>
              <p className="text-sm font-medium text-slate-300 max-w-md mx-auto leading-relaxed">
                To evaluate vehicle issues, isolate system faults, check localized regional pricing, and calculate fair workshop repair estimates:
              </p>
              <div className="text-left max-w-md mx-auto p-4 bg-white/5 rounded-xl border border-white/10 space-y-3 text-slate-200 font-sans text-sm font-bold">
                <p className="flex items-center gap-2 text-cyan-400"><span className="text-xs">»</span> 1. Select vehicle type node (Car / Bike / Truck)</p>
                <p className="flex items-center gap-2 text-cyan-400"><span className="text-xs">»</span> 2. Type symptoms or choose an emergency shortcut preset above</p>
                <p className="flex items-center gap-2 text-cyan-400"><span className="text-xs">»</span> 3. Tap initiate repair appraisal audit to map local pricing metrics</p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex flex-col space-y-1.5 max-w-[85%] animate-fade-in ${
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div className={`px-4 py-3.5 rounded-2xl text-sm font-bold whitespace-pre-wrap leading-relaxed shadow-lg border ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-none border-cyan-500/20"
                    : "bg-[#111622] text-slate-100 rounded-tl-none border-white/5"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))
          )}

          {isScanning && (
            <div className="flex items-center gap-3 bg-cyan-950/40 border border-cyan-500/20 rounded-xl p-4 animate-pulse mr-auto max-w-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono text-cyan-400 tracking-wider font-black">⚡ {scanStep}</span>
            </div>
          )}
        </div>

        <TriageInputBar
          prompt={userIssue}
          setPrompt={setUserIssue}
          onSubmit={() => {
            if (userIssue.trim() && !isScanning) {
              setMessages([...messages, { sender: "user", text: "👤 ══ USER INPUT QUERY ══\n\n" + userIssue }]);
              runForensicAnalysis();
              setUserIssue("");
            }
          }}
          onOpenScanner={onOpenScanner}
          isLoading={isScanning}
          hasImage={hasImage}
          onAudioRecorded={() => {}}
        />

        {/* 📊 RESTORED HIGH-CONTRAST DYNAMIC DIAGNOSTIC REPORT OVERLAY */}
        {reportResult && (
          <div className="mt-4 bg-black/80 border-2 border-cyan-500/30 rounded-xl p-5 space-y-4 animate-fade-in shadow-2xl text-left w-full">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-wider font-black">
              <span>📋 SYSTEM FORENSIC AUDIT DIAGNOSTIC REPORT</span>
              <span className="text-emerald-400">STATUS: VERIFIED</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 font-mono text-xs pb-2 border-b border-white/5 bg-white/5 p-3 rounded-lg text-center">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Vehicle Node</div>
                <div className="text-white font-black">{vehicleType}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Market Region</div>
                <div className="text-cyan-400 font-black">{marketRegion ? marketRegion.toUpperCase() : "IN"}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Est. Currency</div>
                <div className="text-emerald-400 font-black">
                  {(() => {
                    const r = marketRegion ? marketRegion.toLowerCase() : "in";
                    if (r === "in") return "INR \u20B9";
                    if (r === "jp") return "JPY \u00A5";
                    if (r === "cn" || r === "ch") return "CNY \u00A5";
                    if (r === "uk") return "GBP \u00A3";
                    if (r === "eu") return "EUR \u20AC";
                    if (r === "kr") return "KRW \u20A9";
                    return "USD $";
                  })()}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-200 leading-relaxed font-sans">
              <div className="p-3.5 bg-slate-900/90 rounded-lg border border-white/10 text-slate-100 whitespace-pre-wrap font-bold">
                <span className="text-cyan-400 font-mono text-xs block mb-1">🔧 DIAGNOSTIC OUTCOME SUMMARY:</span>
                {reportResult}
              </div>
              
              <div className="p-3.5 bg-slate-900/90 rounded-lg border border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-amber-400 font-mono text-xs block font-bold">💰 ESTIMATED PARTS APPRAISAL:</span>
                  <span className="text-white font-black font-mono text-base">
                    {(() => {
                      const r = marketRegion ? marketRegion.toLowerCase() : "in";
                      if (r === "in") return "\u20B94,800 - \u20B96,500";
                      if (r === "jp" || r === "cn" || r === "ch") return "\u00A5450 - \u00A5600";
                      if (r === "uk") return "\u00A340.00 - \u00A360.00";
                      if (r === "eu") return "\u20AC45.00 - \u20AC65.00";
                      if (r === "kr") return "\u20A985,000 - \u20A9115,000";
                      return "$65.00 - $90.00";
                    })()}
                  </span>
                </div>
                <div>
                  <span className="text-indigo-400 font-mono text-xs block font-bold">👨‍🔧 ESTIMATED STANDARD LABOR FEE:</span>
                  <span className="text-white font-black font-mono text-base">
                    {(() => {
                      const r = marketRegion ? marketRegion.toLowerCase() : "in";
                      if (r === "in") return "\u20B91,200 - \u20B91,800";
                      if (r === "jp" || r === "cn" || r === "ch") return "\u00A5280 - \u00A5420";
                      if (r === "uk") return "\u00A325.00 - \u00A335.00";
                      if (r === "eu") return "\u20AC30.00 - \u20AC45.00";
                      if (r === "kr") return "\u20A955,000 - \u20A975,000";
                      return "$40.00 - $60.00";
                    })()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button 
                onClick={handleCopyReport}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white rounded-lg text-xs font-mono font-black transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isCopied ? "✅ Report Copied" : "📋 Copy Appraisal Log"}
              </button>
              <button 
                onClick={handleToggleSpeech}
                className="px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-cyan-400 rounded-lg text-xs font-mono font-black transition-all cursor-pointer"
              >
                {isSpeaking ? "🔇 Mute" : "🔊 Speak"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
