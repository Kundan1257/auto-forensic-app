import React from "react";
import { BookOpen, ShieldCheck, Car, Bike, Truck, ArrowRight, Camera, FileText } from "lucide-react";

export const UserManual: React.FC = () => {
  return (
    <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8 mt-6 animate-fade-in text-left">
      {/* 📱 1. MASTER HEADER LAYER */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <BookOpen className="w-6 h-6 text-cyan-400" />
        <h2 className="text-base sm:text-lg font-black uppercase tracking-widest text-cyan-400 font-mono">
          Appliance Operational Manual • Quick Start
        </h2>
      </div>

      {/* 🔧 FLOW 1: ENGINE PART COMPONENT SCAN */}
      <div className="p-5 bg-white/5 border border-white/5 rounded-xl space-y-3.5">
        <h3 className="text-sm font-black text-cyan-400 uppercase tracking-wide font-mono flex items-center gap-2">
          <Camera className="w-5 h-5" /> FLOW 1: ENGINE PART COMPONENT SCAN
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          <strong>Visual Inputs Mode:</strong> Use this to pinpoint cracks, fluid leaks, or thermal component degradation under your vehicle's hood.
        </p>
        <div className="p-4 bg-black/40 border border-white/5 rounded-lg space-y-2 text-sm font-sans text-slate-300 leading-relaxed">
          <p>• <strong>Action:</strong> Open your car engine bay hood assembly.</p>
          <p>• <strong>Capture:</strong> Aim your smartphone camera lens directly at any leaking pipes, worn fluid reservoirs, or frayed belts and take a sharp snapshot frame.</p>
          <p>• <strong>Result:</strong> The AI system automatically scans the raw spatial image pixels to visually isolate mechanical wear patterns instantly.</p>
        </div>
      </div>

      {/* 🔌 FLOW 2: HARDWARE ON-BOARD SYSTEM TELEMETRY INTEGRATION WITH DIAGRAMS */}
      <div className="p-5 bg-white/5 border border-white/5 rounded-xl space-y-4">
        <h3 className="text-sm font-black text-cyan-400 uppercase tracking-wide font-mono flex items-center gap-2">
          <Car className="w-5 h-5" /> FLOW 2: OBD2 COMPUTER TELEMETRY LINK
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          <strong>Hardware Inputs Mode:</strong> Direct sensor logs from your automobile's onboard system computer networks.
        </p>

        {/* 🗺️ THE CORE VEHICLE DIAGRAM JUNCTION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 text-xs font-sans text-slate-400">
          <div className="p-3.5 bg-black/60 border border-blue-900/30 rounded-xl space-y-2">
            <span className="font-bold text-white uppercase flex items-center gap-1"><Car className="w-3.5 h-3.5 text-blue-400" /> Cars & Sedans</span>
            <p className="leading-relaxed">Look directly beneath your driver-side steering column dashboard panel. Plug your scanner upwards into the exposed 16-pin connector block.</p>
          </div>
          <div className="p-3.5 bg-black/60 border border-emerald-900/30 rounded-xl space-y-2">
            <span className="font-bold text-emerald-400 uppercase flex items-center gap-1">⚡ Electric Vehicles (EV)</span>
            <p className="leading-relaxed">Access the standard port below your center media screen panel row, or hook directly to the terminal bulkhead link block inside your front frunk chassis.</p>
          </div>
          <div className="p-3.5 bg-black/60 border border-cyan-900/30 rounded-xl space-y-2">
            <span className="font-bold text-white uppercase flex items-center gap-1"><Bike className="w-3.5 h-3.5 text-cyan-400" /> Bikes & Scooters</span>
            <p className="leading-relaxed">Unlock your main mechanical lock and lift your rider seat cushion. Locate the diagnostic data port tether right next to the battery core.</p>
          </div>
          <div className="p-3.5 bg-black/60 border border-white/5 rounded-xl space-y-2">
            <span className="font-bold text-white uppercase flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-slate-400" /> Heavy Trucks</span>
            <p className="leading-relaxed">Unclip the plastic fuse wrapper shield layout beneath your passenger glovebox to mount the heavy duty round diagnostic pin connector.</p>
          </div>
        </div>

        <div className="p-4 bg-black/40 border border-white/5 rounded-lg space-y-2 text-sm font-sans text-slate-300 leading-relaxed">
          <p>• <strong>Connect:</strong> Link your standard manual OBD2 scanner tool layout into the diagnostic port interface position mapped above.</p>
          <p>• <strong>Extract:</strong> Note the active alphanumeric error fault code indicators (e.g., <code className="text-cyan-400 font-mono bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-500/20">P0300</code>, <code className="text-cyan-400 font-mono bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-500/20">P0118</code>) flashing on your hardware screen.</p>
          <p>• <strong>Input:</strong> Type or paste these specific error codes straight inside the high-visibility entry box bar row right next to your component photos.</p>
        </div>
      </div>

      {/* 📋 FLOW 3: TRIGGERING THE DIAGNOSTIC APPRAISAL REPORT */}
      <div className="p-5 bg-cyan-950/10 border border-cyan-500/20 rounded-xl space-y-4">
        <h3 className="text-sm font-black text-blue-400 uppercase tracking-wide font-mono flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" /> GENERATING THE DIAGNOSTIC APPRAISAL
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          Once your engine component photos and OBD2 fault code sequences are loaded into the client data state arrays, follow these steps to trigger your anti-fraud analysis:
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-around gap-2 p-3 bg-black/40 border border-white/5 rounded-xl text-xs font-mono text-slate-300 tracking-wider font-black uppercase">
          <span>1. Setup Component Data</span>
          <ArrowRight className="w-4 h-4 text-cyan-400 hidden sm:block" />
          <span>2. Click Submit [{"?"}]</span>
          <ArrowRight className="w-4 h-4 text-cyan-400 hidden sm:block" />
          <span>3. Fetch Real-Time Report</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-sans pt-1">
          Click the search dispatch arrow button (<code className="text-cyan-400 font-mono bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-500/20">&gt;</code>). The server connects to your live Gemini 2.5 Flash node, generating a complete diagnostic audit sheet translated natively into your dropdown language selection, split into <strong>Fair Replacement Parts Values</strong> and <strong>Standard Local Labor Fee Brackets</strong> to shield you from repair garage exploitation.
        </p>
      </div>

      {/* 📝 FLOW 4: FLAT-DOCUMENT WORKSHOP INVOICE AUDITING */}
      <div className="p-5 bg-white/5 border border-white/5 rounded-xl space-y-3.5">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-wide font-mono flex items-center gap-2">
          <FileText className="w-5 h-5" /> FLOW 4: WORKSHOP INVOICE AUDITING
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          <strong>Post-Repair Invoice Audit Mode:</strong> Secondary financial shield designed to catch bloated mechanical estimates, parts inflation, and padded garage labor line items.
        </p>
        <div className="p-4 bg-black/40 border border-white/5 rounded-lg space-y-2 text-sm font-sans text-slate-300 leading-relaxed">
          <p>• <strong>Action:</strong> Lay any mechanics written quote or paper invoice slip completely flat on a table substrate under clear daylight conditions.</p>
          <p>• <strong>Scan:</strong> Take a flat, straight top-down photo using your Document Scanner camera viewport options.</p>
          <p>• <strong>Result:</strong> The server automatically indexes listed parts itemization numbers, running price cross-checks against regional marketplace databases to instantly flag fraud items before you pay your bill.</p>
        </div>
      </div>
    </div>
  );
};
