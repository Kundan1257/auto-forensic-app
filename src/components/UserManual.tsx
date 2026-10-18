import React, { useState } from "react";
import { BookOpen, ShieldCheck, Car, Bike, Truck, ArrowRight, Camera, FileText, ChevronLeft, ChevronRight, Activity } from "lucide-react";

type InspectionMode =
  | "📡 Physical Bluetooth ELM327 Link"
  | "🌐 Local Wi-Fi Hardware Port"
  | "🧪 Manual Engine Code Emulation Mode";

interface UserManualProps {
  showInspectionMenu: boolean;
  setShowInspectionMenu: React.Dispatch<React.SetStateAction<boolean>>;
  selectedInspectionMode: InspectionMode | null;
  setSelectedInspectionMode: React.Dispatch<React.SetStateAction<InspectionMode | null>>;
}

export const UserManual: React.FC<UserManualProps> = ({
  showInspectionMenu,
  setShowInspectionMenu,
  selectedInspectionMode,
  setSelectedInspectionMode,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const inspectionModes: InspectionMode[] = [
    "📡 Physical Bluetooth ELM327 Link",
    "🌐 Local Wi-Fi Hardware Port",
    "🧪 Manual Engine Code Emulation Mode",
  ];

  const slides = [
    {
      step: "01",
      title: "Select Your Asset Node",
      desc: "Tap Car, Bike, Truck, or ⚡ EV at the top. The AI instantly configures its diagnostic rules specifically for that vehicle type.",
      icon: <Car className="w-8 h-8 text-cyan-400" />,
      badge: "Step 1 of 3"
    },
    {
      step: "02",
      title: "Capture Photo or Type OBD2 Code",
      desc: "Snap a photo of the leaking part or frayed belt under the hood, or simply type the code flashing on your scanner (e.g., P0300).",
      icon: <Camera className="w-8 h-8 text-emerald-400" />,
      badge: "Step 2 of 3"
    },
    {
      step: "03",
      title: "Get Your Anti-Fraud Shield",
      desc: "Hit send to generate a localized, translated breakdown of exact parts prices and fair labor costs before talking to a mechanic.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
      badge: "Step 3 of 3"
    }
  ];

  return (
    <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8 mt-6 text-left">
      {/* 📱 1. MASTER HEADER LAYER */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <BookOpen className="w-6 h-6 text-cyan-400" />
        <h2 className="text-base sm:text-lg font-black uppercase tracking-widest text-cyan-400 font-mono">
          Appliance Operational Manual • Quick Start
        </h2>
      </div>

      {/* 🎬 2. SECURE INTERACTIVE VISUAL SLIDESHOW (FOR NON-TECH USERS WORLDWIDE) */}
      <div className="p-6 bg-gradient-to-br from-cyan-950/30 to-slate-950 border border-cyan-500/30 rounded-2xl space-y-6 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-black tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full">
            VISUAL USER GUIDE • {slides[activeSlide].badge}
          </span>
          <div className="flex gap-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === activeSlide ? "w-6 bg-cyan-400" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[110px] flex items-start gap-4 py-2">
          <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl shrink-0 shadow-inner">
            {slides[activeSlide].icon}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400">[{slides[activeSlide].step}]</span>
              <h4 className="text-base font-bold text-white tracking-wide">{slides[activeSlide].title}</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {slides[activeSlide].desc}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <button
            onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Prev Step
          </button>

          <span className="text-[11px] font-mono text-slate-500">Tap cards or arrows to navigate</span>

          <button
            onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
            className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        </div>
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

      {/* 🚀 AUTOMATED TELEMETRY HARDWARE SCAN TRIGGER CONTAINER */}
      <div className="mt-4 p-4 bg-slate-900/40 border border-white/5 rounded-lg flex flex-col items-center justify-center space-y-2">
        <button
          type="button"
          onClick={() => setShowInspectionMenu(true)}
          className="w-full max-w-md py-3 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-blue-600 text-white font-black text-sm rounded-lg shadow-lg shadow-blue-500/10 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 tracking-wider uppercase font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          ⚡ Launch Automated OBD-II Smart Scan
        </button>
        {showInspectionMenu && (
          <div
            role="dialog"
            aria-label="Select inspection mode"
            className="w-full max-w-md rounded-xl border border-cyan-400/30 bg-slate-950 p-4 shadow-xl shadow-cyan-950/30 space-y-2"
          >
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              Choose your inspection mode
            </p>
            {inspectionModes.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setSelectedInspectionMode(mode);
                  setShowInspectionMenu(false);
                }}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10"
              >
                {mode}
              </button>
            ))}
          </div>
        )}
        {selectedInspectionMode && (
          <span
            role="status"
            className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300"
          >
            Inspection mode selected: {selectedInspectionMode}
          </span>
        )}
        <span className="text-[11px] font-sans text-slate-400 tracking-wide text-center">
          Wireless radio bands will automatically pair with your physical ELM327 hardware device.
        </span>
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
          <span>2. Click Submit [?]</span>
          <ArrowRight className="w-4 h-4 text-cyan-400 hidden sm:block" />
          <span>3. Fetch Real-Time Report</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-sans pt-1">
          Click the search dispatch arrow button (<code className="text-cyan-400 font-mono bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-500/20">&gt;</code>). The server connects to your live Auto Forensic Telemetry Core, generating a complete diagnostic audit sheet translated natively into your dropdown language selection, split into <strong>Fair Replacement Parts Values</strong> and <strong>Standard Local Labor Fee Brackets</strong> to shield you from repair garage exploitation.
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
