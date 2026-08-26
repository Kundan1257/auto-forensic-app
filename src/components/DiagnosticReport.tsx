import React, { useState } from "react";
import { Sparkles, Activity, ShieldAlert, AlertCircle, Sparkle, FileCheck, RefreshCw, Gauge, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ReportProps {
  isScanning: boolean;
  errorMessage: string | null;
  reportResult: any | null;
  scanStep: string;
  activeHighlight: boolean;
  activeRegionSymbol: string;
  runForensicAnalysis: () => void;
}

export const DiagnosticReport: React.FC<ReportProps> = ({
  isScanning,
  errorMessage,
  reportResult,
  scanStep,
  activeHighlight,
  activeRegionSymbol,
  runForensicAnalysis
}) => {
  // Local state to manage the talking script copy confirmation checkmark animation
  const [scriptCopied, setScriptCopied] = useState(false);

  const handleCopyScriptOnly = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
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
          <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">Diagnostics Active</h3>
          <p className="text-slate-200 font-mono text-xs font-semibold px-4 min-h-[36px]">{scanStep}</p>
          <div className="w-48 h-1 bg-black/40 rounded-full mx-auto overflow-hidden border border-white/5 relative">
            <div className="h-full bg-cyan-500 rounded-full animate-[shimmer_1.5s_infinite] w-full absolute -left-full" />
          </div>
        </div>
      </motion.div>
    );
  }

  if (errorMessage) {
    return (
      <motion.div key="errorScreen" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4 py-8">
        <div className="p-3 bg-red-950/60 border border-red-800 rounded-full text-red-400 animate-bounce">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-bold text-gray-200">Diagnostics Analysis Fault</h3>
          <p className="text-xs text-rose-400 font-mono mt-2 bg-black/60 p-3 rounded-lg border border-red-900/40 leading-relaxed text-left">{errorMessage}</p>
        </div>
        <button type="button" onClick={runForensicAnalysis} className="text-xs px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-md cursor-pointer font-mono">
          <RefreshCw className="w-3 px-0.5 h-3 inline-block mr-1" /> Retry Analysis
        </button>
      </motion.div>
    );
  }

  if (reportResult) {
    return (
      <motion.div key="reportScreen" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`space-y-6 select-text text-sm transition-all pb-4 ${activeHighlight ? "bg-cyan-950/10 p-2 rounded-xl border border-cyan-500/10" : ""}`}>
        {activeHighlight && (
          <div className="bg-cyan-950/40 border border-cyan-800/40 p-2.5 rounded-lg text-xs text-cyan-300 font-mono flex items-center gap-2">
            <Sparkle className="w-4 h-4 text-cyan-400 animate-pulse flex-shrink-0" />
            <span>Visual emphasis layout is active. Critical indicators and negotiation values are highlighted below.</span>
          </div>
        )}

        <div className="p-4 bg-cyan-950/30 border border-cyan-800/20 rounded-xl">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-0.5">Primary Scan Discovery</span>
              <h1 className="text-base font-black text-slate-100 tracking-tight leading-snug">{reportResult?.appSummaryCoreIssue || reportResult?.coreIssue || reportResult?.CORE_ISSUE}</h1>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-slate-500" />
            <span>Diagnostic Breakdown</span>
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">{reportResult?.diagnosticBreakdown}</p>
        </div>

        <div className="p-4 bg-slate-950/60 border border-white/5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded border ${reportResult?.severityClassification === 'CRITICAL' ? 'bg-red-500/10 border-red-500/20 text-red-400' : reportResult?.severityClassification === 'MONITOR' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block leading-none mb-0.5">SAFETY STATUS</span>
              <span className={`text-xs font-black uppercase tracking-widest ${reportResult?.severityClassification === 'CRITICAL' ? 'text-red-400' : reportResult?.severityClassification === 'MONITOR' ? 'text-amber-400' : 'text-emerald-400'}`}>{reportResult?.severityClassification}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 italic sm:text-right max-w-sm">{reportResult?.severityExplanation || reportResult?.safetyExplanation}</p>
        </div>

        {reportResult?.e20EthanolCompatibilityAlert?.isAtRiskFromEthanol && (
          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl relative overflow-hidden">
            <span className="absolute top-0 right-0 px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold uppercase tracking-wider rounded-bl border-l border-b border-white/5">E20 Fuel Warning</span>
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Ethanol Compatibility Degradation Report</span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed mb-2.5">{reportResult?.e20EthanolCompatibilityAlert?.componentRiskAnalysis}</p>
            <div className="pt-2 border-t border-amber-500/10 text-xs text-amber-300 font-medium">
              <strong>Remit Guide:</strong> {reportResult?.e20EthanolCompatibilityAlert?.preventativeActionTip || reportResult?.e20EthanolCompatibilityAlert?.preventativeActionTip}
            </div>
          </div>
        )}

        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">Estimated Expenses Range</span>
            <div className="text-2xl font-black text-emerald-400 tracking-tight">
              {reportResult?.estimatedExpenses?.currencySymbol || reportResult?.estimatedExpenses?.currencyCode || activeRegionSymbol}
              {reportResult?.estimatedExpenses?.partsLowerEstimate || reportResult?.estimatedExpenses?.partsLowerRange || 0}
              <span className="text-slate-500 mx-2 text-sm font-normal">to</span>
              {reportResult?.estimatedExpenses?.currencySymbol || reportResult?.estimatedExpenses?.currencyCode || activeRegionSymbol}
              {reportResult?.estimatedExpenses?.partsUpperEstimate || reportResult?.estimatedExpenses?.partsUpperRange || 0}
            </div>
          </div>
          <div className="bg-black/40 px-3 py-2 rounded border border-white/5 sm:max-w-xs w-full">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Labor Benchmark Matrix</span>
            <p className="text-slate-300 text-xs">{reportResult?.estimatedExpenses?.laborFeesCalculation || reportResult?.estimatedExpenses?.laborEstimatedRange}</p>
          </div>
        </div>

        {reportResult?.workshopFraudIndicators && (
          <div className="p-3.5 bg-slate-950/40 border border-white/5 rounded-xl space-y-1">
            <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>Workshop Fraud Indicators</span>
            </h5>
            <p className="text-slate-400 text-xs leading-relaxed">{reportResult?.workshopFraudIndicators}</p>
          </div>
        )}

        {/* 7. NEW INTERACTIVE TAP-TO-COPY MECHANIC TALKING SCRIPT CARD */}
        <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-xl space-y-3 relative group">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Mechanic Negotiation Script</span>
            </h5>
            <button
              type="button"
                            onClick={() => handleCopyScriptOnly(reportResult?.mechanicNegotiationScript || "")}
              className="text-[10px] px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800/60 hover:bg-blue-500 hover:text-black transition-all cursor-pointer font-mono font-medium flex items-center gap-1 shadow-sm"
              title="Copy negotiation script text to clipboard"
            >
              {scriptCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Script</span>
                </>
              )}
            </button>
          </div>
          <blockquote className="text-slate-200 text-xs sm:text-sm font-medium italic border-l-2 border-blue-500/30 pl-2.5 py-0.5 leading-relaxed">
            "{reportResult?.mechanicNegotiationScript}"
          </blockquote>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div key="idlePlaceholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6 py-12">
      <div className="w-16 h-16 border border-white/5 rounded-full flex items-center justify-center text-cyan-400 bg-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-full animate-pulse" />
        <Gauge className="w-6 h-6 text-cyan-400" />
      </div>
      <div className="space-y-2 max-w-sm">
        <h3 className="text-sm font-bold text-cyan-400">Ready for Vehicle Diagnostics Checkup</h3>
        <p className="text-xs text-slate-400 leading-relaxed">To evaluate vehicle issues, isolate faults, check local pricing, and calculate fair workshop repair estimates:</p>
        <div className="inline-grid grid-cols-1 gap-1.5 text-left text-xs text-slate-400 font-mono mt-4 mx-auto pt-4 border-t border-white/5 w-full">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-white/5 border border-white/10 text-[9px] font-mono flex items-center justify-center rounded text-cyan-400 font-semibold">1</span>
            <span>Specify vehicle category filters above.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-white/5 border border-white/10 text-[9px] font-mono flex items-center justify-center rounded text-cyan-400 font-semibold">2</span>
            <span>Optional: Capture component photo evidence via camera.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-white/5 border border-white/10 text-[9px] font-mono flex items-center justify-center rounded text-cyan-400 font-semibold">3</span>
            <span>Detail symptoms or choose a template preset, then scan.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

