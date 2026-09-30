import React from "react";
import { ShieldCheck, Car, Bike, Sparkles, X, Clock, RefreshCw } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribeSuccess: (tier: "Bike" | "Car" | "AllAccess") => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubscribeSuccess,
}) => {
  if (!isOpen) return null;

  // 💳 SECURE EXPLICIT DISCRETE PRODUCTION DIRECT ROUTING ENGINE
  const handlePassPurchaseRedirect = (tier: "Bike" | "Car" | "AllAccess") => {
    // Lock the targeted clearance tier parameter into context memory maps
    localStorage.setItem("auto_forensic_pending_tier", tier);
    
    let targetCheckoutUrl = "";
    
    switch (tier) {
      case "Bike":
        targetCheckoutUrl = "https://rzp.io";
        break;
      case "Car":
        targetCheckoutUrl = "https://rzp.io";
        break;
      case "AllAccess":
        targetCheckoutUrl = "https://rzp.io";
        break;
      default:
        targetCheckoutUrl = "https://rzp.io";
    }

    // Force seamless web view redirection out to Razorpay high-speed cloud clusters
    window.location.href = targetCheckoutUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0a0c10] border border-cyan-500/30 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative flex flex-col md:flex-row gap-6 sm:gap-8 overflow-hidden">
        
        {/* DECORATION LAYER */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* VALUE PROPOSITION PROMPT */}
        <div className="flex-1 space-y-4 md:border-r md:border-white/5 md:pr-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-black uppercase tracking-widest w-fit">
            <Sparkles className="w-3.5 h-3.5" /> PRISTINE BUSINESS LEDGER ROUTING
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white font-mono leading-none">
            ACTIVATE YOUR <span className="text-cyan-400">FAIR SHIELD</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            To ensure complete garage transparency, our individual vehicle tokens grant you a flexible safety net. Run up to <strong className="text-white font-mono">3 comprehensive diagnostic attempts</strong> across a generous <strong className="text-cyan-400 font-mono">6-Hour active window</strong>. Re-scan components or verify new repair costs as they develop live.
          </p>
          <div className="space-y-2 pt-2 border-t border-white/5 hidden sm:block">
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> 6-Hour Incident Expiry Buffer
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" /> 3 Audit Attempts Included
            </div>
          </div>
        </div>

                        {/* PRICING GRID LAYOUT CARDS */}
        <div className="flex-[1.5] grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* TIER 1: BIKE PASS */}
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between space-y-4 text-center">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono flex items-center justify-center gap-1">
                <Bike className="w-4 h-4 text-cyan-400" /> BIKE PASS
              </h3>
              <div className="mt-2">
                <span className="text-xl font-black text-white font-mono">₹100</span>
                <span className="text-[9px] text-slate-500 font-mono block">/ 6H Active Pass</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans mt-2">Up to 3 multi-modal evaluation scans for a single motorcycle or scooter service event.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.href = "https://rzp.io";
              }}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-[10px] uppercase border border-white/10 transition-all cursor-pointer"
            >
              Get Bike Pass
            </button>
          </div>

          {/* TIER 2: CAR PASS */}
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between space-y-4 text-center">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono flex items-center justify-center gap-1">
                <Car className="w-4 h-4 text-emerald-400" /> CAR PASS
              </h3>
              <div className="mt-2">
                <span className="text-xl font-black text-white font-mono">₹200</span>
                <span className="text-[9px] text-slate-500 font-mono block">/ 6H Active Pass</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans mt-2">Up to 3 comprehensive component photography audits and garage invoice validations.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.href = "https://rzp.io";
              }}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-[10px] uppercase border border-white/10 transition-all cursor-pointer"
            >
              Get Car Pass
            </button>
          </div>

          {/* TIER 3: HEAVY PASS (HERO CARD) */}
          <div className="p-4 bg-cyan-950/20 border border-cyan-500/40 rounded-2xl flex flex-col justify-between space-y-4 text-center relative shadow-lg">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[7px] font-mono font-black uppercase tracking-widest">
              BEST VALUE
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 font-mono flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> 24H PASS
              </h3>
              <div className="mt-2">
                <span className="text-xl font-black text-cyan-300 font-mono">₹500</span>
                <span className="text-[9px] text-slate-600 font-mono block">/ Unlimited Day</span>
              </div>
              <p className="text-[10px] text-slate-300 font-sans mt-2">Completely unlimited diagnostic scans and attempts across all vehicles for 24 full hours.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.href = "https://rzp.io";
              }}
              className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-black text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Unlock 24H Pass
            </button>
          </div>

        </div>



      </div>
    </div>
  );
};
