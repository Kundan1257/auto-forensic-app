import React from 'react';

interface RightOutputPanelProps {
  [key: string]: any;
}

export const RightOutputPanel: React.FC<RightOutputPanelProps> = (props) => {
  const {
    reportResult = null,
    isScanning = false,
    isLoading = false,
    scanStep = "",
    errorMessage = ''
  } = props;

  const showLoading = isScanning || isLoading;

  // 📡 PURE DIRECT BINDING EXTRACTOR MATRIX: Zero local math calculations or fallback logic gates!
  let partsDisplayText = "";
  let laborDisplayText = "";
  let rawChatNarrative = "";

  if (reportResult && typeof reportResult === "object") {
    partsDisplayText = reportResult.parts_appraisal || "";
    laborDisplayText = reportResult.labor_fee || "";
    rawChatNarrative = reportResult.result || reportResult.response || "";
  } else if (reportResult) {
    // If the server delivers an unstructured text string parameter payload, preserve it raw
    rawChatNarrative = String(reportResult);
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl h-full flex flex-col justify-between text-slate-100">
      <div className="flex-1 overflow-y-auto space-y-6 pr-1 max-h-[500px]">
        {showLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
            <p className="text-sm text-slate-400 font-mono animate-pulse">
              RUNNING AUTOMOTIVE FORENSICS MATRIX... {scanStep ? `[${scanStep}]` : ''}
            </p>
          </div>
        ) : errorMessage ? (
          <div className="text-red-400 font-mono text-sm border border-red-900 bg-red-950/30 p-4 rounded-lg">
            ❌ BACKEND CONNECTION ERROR: {errorMessage}
          </div>
        ) : reportResult ? (
          <div className="space-y-4">
            {/* 💎 Dynamic Unfiltered AI Response Narrative Display Slot */}
            {rawChatNarrative && (
              <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-lg text-sm leading-relaxed whitespace-pre-wrap font-sans text-slate-200">
                {rawChatNarrative}
              </div>
            )}

            {/* 💰 Autonomous Pricing Telemetry Grids Grid */}
            {(partsDisplayText || laborDisplayText) && (
              <div className="grid grid-cols-2 gap-4 pt-2">
                {partsDisplayText && (
                  <div className="p-3 bg-slate-950/60 border border-white/5 rounded-lg">
                    <span className="text-[10px] font-mono text-slate-500 block mb-0.5 uppercase tracking-wider">Estimated Parts Cost</span>
                    <span className="text-sm font-black font-mono text-emerald-400">{partsDisplayText}</span>
                  </div>
                )}
                {laborDisplayText && (
                  <div className="p-3 bg-slate-950/60 border border-white/5 rounded-lg">
                    <span className="text-[10px] font-mono text-slate-500 block mb-0.5 uppercase tracking-wider">Estimated Labor Fee</span>
                    <span className="text-sm font-black font-mono text-emerald-400">{laborDisplayText}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <span className="text-4xl">🔍</span>
            <p className="text-slate-400 font-mono text-sm">AWAITING AUTOMOTIVE DATA INGESTION NODE...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightOutputPanel;
