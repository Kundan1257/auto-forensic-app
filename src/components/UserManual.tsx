import React from "react";
import { BookOpen, HardDrive, Car, Bike, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";

export const UserManual: React.FC = () => {
  return (
    <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-6 shadow-2xl space-y-6 mt-6">
      {/* 1. HEADER SECTION */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <BookOpen className="w-5 h-5 text-cyan-400" />
        <h2 className="text-base font-bold uppercase tracking-widest text-cyan-400">
          Driver Handbook & Diagnostic Field Manual
        </h2>
      </div>

      {/* 2. PRODUCT ACCURACY TIERS */}
      <div className="p-5 bg-cyan-950/20 border border-cyan-800/30 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Verified Product Performance & Accuracy Matrix</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          To maintain driver trust, this platform operates with strict transparency. Diagnosis and pricing accuracy percentages are determined directly by your data path:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-4 bg-black/40 border border-blue-900/30 rounded-lg text-center">
            <span className="text-xl font-black text-blue-400 font-mono block">95% - 98%</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider block mt-1">OBD2 Scanner Link</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Direct hardware data logs</span>
          </div>
          <div className="p-4 bg-black/40 border border-cyan-900/30 rounded-lg text-center">
            <span className="text-xl font-black text-cyan-400 font-mono block">90% - 92%</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider block mt-1">Mobile Camera Scan</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Visual paper invoice audit</span>
          </div>
          <div className="p-4 bg-black/40 border border-white/5 rounded-lg text-center">
            <span className="text-xl font-black text-slate-400 font-mono block">75% - 80%</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider block mt-1">Manual Symptom Text</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Vague sounds, smells, or text logs</span>
          </div>
        </div>
      </div>

      {/* 3. COMPACT VISUAL MANUAL BLUEPRINTS */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
          Visual Connection Blueprint (How to link your scanner)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CAR ENGINE CARD */}
          <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex flex-col items-center space-y-3">
            <div className="w-full h-24 bg-slate-900/50 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
              <svg viewBox="0 0 200 100" className="w-full h-full text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="100" cy="50" r="22" className="text-slate-500" strokeWidth="4" />
                <line x1="100" y1="50" x2="100" y2="72" className="text-slate-500" />
                <rect x="130" y="65" width="24" height="14" rx="2" className="fill-blue-950 text-blue-400 animate-pulse" />
                <path d="M142 110 L142 84" className="text-cyan-400 animate-bounce" strokeWidth="3" />
              </svg>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-white text-xs uppercase flex items-center justify-center gap-1"><Car className="w-3.5 h-3.5 text-cyan-400" /> Cars & Sedans</h4>
              <p className="text-xs text-slate-400 mt-1">Look under the steering column. Plug your hardware scanner straight upwards into the 16-pin connector [INDEX].</p>
            </div>
          </div>

          {/* BIKE SEAT CARD */}
          <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex flex-col items-center space-y-3">
            <div className="w-full h-24 bg-slate-900/50 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
              <svg viewBox="0 0 200 100" className="w-full h-full text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M95 45 L 150 15" className="text-slate-500" strokeWidth="4" />
                <rect x="100" y="55" width="35" height="25" rx="3" className="fill-slate-950 text-slate-700" />
                <rect x="110" y="62" width="16" height="10" rx="1" className="fill-blue-950 text-blue-400 animate-pulse" />
              </svg>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-white text-xs uppercase flex items-center justify-center gap-1"><Bike className="w-3.5 h-3.5 text-cyan-400" /> Bikes & Scooters</h4>
              <p className="text-xs text-slate-400 mt-1">Unlock and lift your rider seat cushion. Locate the diagnostic cable port right next to the battery [INDEX].</p>
            </div>
          </div>

          {/* TRUCK CAB CARD */}
          <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex flex-col items-center space-y-3">
            <div className="w-full h-24 bg-slate-900/50 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
              <svg viewBox="0 0 200 100" className="w-full h-full text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="30" y="10" width="140" height="75" rx="8" className="fill-slate-950 text-slate-800" />
                <circle cx="130" cy="45" r="9" className="fill-blue-950 text-blue-400 animate-pulse" />
              </svg>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-white text-xs uppercase flex items-center justify-center gap-1"><Truck className="w-3.5 h-3.5 text-cyan-400" /> Heavy Trucks</h4>
              <p className="text-xs text-slate-400 mt-1">Unclip the fuse wrapper shield under the passenger glovebox. Locate the heavy duty round connection port [INDEX].</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. REAL PROBLEMS & SOLUTIONS MATRIX */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-slate-500" />
          <span>Real Problems & Solutions Matrix By Vehicle Class</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
            <h4 className="font-bold text-cyan-400 flex items-center gap-1.5"><Car className="w-4 h-4" /> Cars & Sedans</h4>
            <p className="text-sm text-slate-400"><strong>The Problem:</strong> Mechanics upselling full engine rebuilds for a minor valve tick [INDEX].</p>
            <p className="text-sm text-slate-300"><strong>The Solution:</strong> Switch to Car mode, use the text generator, and copy the shield talking script [INDEX].</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
            <h4 className="font-bold text-cyan-400 flex items-center gap-1.5"><Bike className="w-4 h-4" /> Bikes & Scooters</h4>
            <p className="text-sm text-slate-400"><strong>The Problem:</strong> Fuel stalling right after refilling at cheap fuel stations [INDEX].</p>
            <p className="text-sm text-slate-300"><strong>The Solution:</strong> Run the India locale scan to cross-check active E20 moisture separation [INDEX].</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
            <h4 className="font-bold text-cyan-400 flex items-center gap-1.5"><Truck className="w-4 h-4" /> Heavy Trucks</h4>
            <p className="text-sm text-slate-400"><strong>The Problem:</strong> Fleet workshops inflating flat-rate fees on invoices [INDEX].</p>
            <p className="text-sm text-slate-300"><strong>The Solution:</strong> Use Invoice mode to read and audit stacked mechanical line items [INDEX].</p>
          </div>
        </div>
      </div>
    </div>
  );
};
