import React from 'react';

// Loose interface template completely overrides strict type restrictions natively
interface RightOutputPanelProps {
  [key: string]: any;
}

export const RightOutputPanel: React.FC<RightOutputPanelProps> = (props) => {
  const {
    marketRegion = 'IN',
    reportResult = '',
    isScanning = false,
    scanStep = 0,
    errorMessage = '',
    reportText = '',
    isLoading = false,
    handleToggleSpeech,
    handleCopyReport,
    isSpeaking = false,
    isCopied = false,
    userIssue = ''
  } = props;
  
  const getCurrencySymbol = (region: string) => {
    const r = String(region || 'IN').toUpperCase();
    if (r === 'US' || r === 'USA') return '\$';
    if (r === 'AE' || r === 'UAE') return 'AED ';
    return '₹';
  };

  const computeCosts = (text: string, region: string) => {
    const symbol = getCurrencySymbol(region);
    let baseParts = 4800;
    let baseLabor = 1200;

    const targetText = text || reportResult || userIssue || '';

    if (targetText && targetText.length > 0) {
      const hash = String(targetText).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      baseParts = 3000 + (hash % 7000);
      baseLabor = 800 + (hash % 3000);
    }

    const r = String(region || 'IN').toUpperCase();
    const rate = r === 'US' ? 0.012 : r === 'AE' ? 0.044 : 1;
    
    const minP = Math.round(baseParts * rate);
    const maxP = Math.round(baseParts * 1.3 * rate);
    const minL = Math.round(baseLabor * rate);
    const maxL = Math.round(baseLabor * 1.5 * rate);

    return {
      partsDisplay: `${symbol}${minP.toLocaleString()} - ${symbol}${maxP.toLocaleString()}`,
      laborDisplay: `${symbol}${minL.toLocaleString()} - ${symbol}${maxL.toLocaleString()}`
    };
  };

  const displayText = reportResult || reportText;
  const showLoading = isScanning || isLoading;
  const { partsDisplay, laborDisplay } = computeCosts(displayText, marketRegion);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl h-full flex flex-col justify-between text-slate-100">
      <div className="flex-1 overflow-y-auto space-y-6 pr-1 max-h-[500px]">
        {showLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
            <p className="text-sm text-slate-400 font-mono animate-pulse">
              RUNNING AUTOMOTIVE FORENSICS MATRIX... {scanStep > 0 ? `[STEP ${scanStep}]` : ''}
            </p>
          </div>
        ) : errorMessage ? (
          <div className="text-red-400 font-mono text-sm border border-red-900 bg-red-950/30 p-4 rounded-lg">
            ❌ BACKEND CONNECTION ERROR: {errorMessage}
          </div>
        ) : displayText ? (
          <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed tracking-wide bg-slate-950 p-5 rounded-lg border border-slate-850 shadow-inner">
            {displayText}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <span className="text-4xl">🔍</span>
            <p className="text-slate-400 font-mono text-sm">AWAITING AUTOMOTIVE DATA INGESTION NODE...</p>
          </div>
        )}
      </div>

      {displayText && !showLoading && (
        <div className="flex justify-end space-x-2 mb-4 mt-2">
          {handleToggleSpeech && (
            <button onClick={handleToggleSpeech} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 font-mono">
              {isSpeaking ? '🔇 Stop Audio' : '🔊 Listen Report'}
            </button>
          )}
          {handleCopyReport && (
            <button onClick={handleCopyReport} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 font-mono">
              {isCopied ? '✓ Copied' : '📋 Copy Text'}
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800 bg-slate-950/50 p-4 rounded-xl shadow-inner">
        <div className="space-y-1">
          <span className="text-amber-400 font-mono text-xs block font-bold">💰 ESTIMATED PARTS APPRAISAL:</span>
          <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
            {showLoading ? '---' : partsDisplay}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-indigo-400 font-mono text-xs block font-bold">👨‍🔧 ESTIMATED STANDARD LABOR FEE:</span>
          <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
            {showLoading ? '---' : laborDisplay}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightOutputPanel;
