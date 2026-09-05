import React from "react";
import { ShieldCheck, CheckCircle2, Zap, Car, Bike, Truck, Sparkles, X } from "lucide-react";

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
            <Sparkles className="w-3.5 h-3.5" /> INSTANT ANTI-FRAUD DEPLOYMENT
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white font-mono leading-none">
            ACTIVATE YOUR <span className="text-cyan-400">MICRO-SHIELD</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            Unlock professional laboratory diagnostics instantly. Choose an individual pay-per-use token for your exact vehicle node or access our comprehensive all-purpose shield to match fair replacement parts values instantly.
          </p>
        </div>

        {/* PRICING GRID LAYOUT CARDS */}
        <div className="flex-[1.5] grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* TIER 1: BIKE DISPATCH */}
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between space-y-4 text-center">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono flex items-center justify-center gap-1">
                <Bike className="w-4 h-4 text-cyan-400" /> BIKE PASS
              </h3>
              <div className="mt-2">
                <span className="text-xl font-black text-white font-mono">₹100</span>
                <span className="text-[9px] text-slate-500 font-mono block">/ Per Scan</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans mt-2">Single multi-modal scooter or motorcycle diagnostic evaluation query.</p>
            </div>
            <button
              onClick={() => onSubscribeSuccess("Bike")}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-[10px] uppercase border border-white/10 transition-all cursor-pointer"
            >
              Get Bike Token
            </button>
          </div>

          {/* TIER 2: CAR DISPATCH */}
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between space-y-4 text-center">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono flex items-center justify-center gap-1">
                <Car className="w-4 h-4 text-emerald-400" /> CAR PASS
              </h3>
              <div className="mt-2">
                <span className="text-xl font-black text-white font-mono">₹200</span>
                <span className="text-[9px] text-slate-500 font-mono block">/ Per Scan</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans mt-2">Single comprehensive four-wheeler, sedan, or SUV appraisal matrix dispatch.</p>
            </div>
            <button
              onClick={() => onSubscribeSuccess("Car")}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-[10px] uppercase border border-white/10 transition-all cursor-pointer"
            >
              Get Car Token
            </button>
          </div>

          {/* TIER 3: ALL PURPOSE SYSTEM SHIELD (HERO CARD) */}
          <div className="p-4 bg-cyan-950/20 border border-cyan-500/40 rounded-2xl flex flex-col justify-between space-y-4 text-center relative shadow-lg">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[7px] font-mono font-black uppercase tracking-widest">
              BEST VALUE
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 font-mono flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> ALL ACCESS
              </h3>
              <div className="mt-2">
                <span className="text-xl font-black text-cyan-300 font-mono">₹500</span>
                <span className="text-[9px] text-slate-600 font-mono block">/ 24h Pass</span>
              </div>
              <p className="text-[10px] text-slate-300 font-sans mt-2">Unlimited execution across heavy trucks, **`⚡ EV`** nodes, and paper invoice audits.</p>
            </div>
            <button
              onClick={() => onSubscribeSuccess("AllAccess")}
              className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-black text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Unlock All Nodes
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
