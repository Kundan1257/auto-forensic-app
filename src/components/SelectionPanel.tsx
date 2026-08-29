import React from "react";

interface SelectionPanelProps {
  vehicleType: string;
  setVehicleType: (val: string) => void;
  appSection: string;
  setAppSection: (val: any) => void;
}

export function SelectionPanel({ vehicleType, setVehicleType, appSection, setAppSection }: SelectionPanelProps) {
  return (
    <div className="w-full space-y-6">
      
      {/* 01_ASSET VEHICLE SELECTION PILLS ROW */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full px-2 py-0.5">01_ASSET</span>
          <h3 className="text-base font-black font-mono text-slate-400 uppercase tracking-wider">Select Vehicle Classification</h3>
        </div>
        <div className="grid grid-cols-3 gap-3 bg-black/40 border border-white/10 rounded-2xl p-2">
          {[ "Car", "Bike", "Truck" ].map((type) => {
            const isActive = vehicleType === type;
            return (
              <button
                key={type}
                onClick={() => setVehicleType(type)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isActive 
                    ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                    : "bg-transparent text-slate-400 hover:text-white"
                }`}
              >
                <span>{type === "Car" ? "🚗" : type === "Bike" ? "🏍️" : "🚛"}</span> {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECT INSPECTION MODE CARDS (UPGRADED READABILITY TO TEXT-SM) */}
      <div className="space-y-3">
        <h3 className="text-xs font-black font-mono text-slate-500 uppercase tracking-wider">Select Inspection Mode</h3>
        <div className="space-y-3">
          
          {/* CARD 01: DIAGNOSE ACTIVE SYMPTOMS */}
          <div 
            onClick={() => setAppSection("Common Symptoms")}
            className={`bg-[#0d1117]/80 border ${appSection === "Common Symptoms" ? "border-cyan-500" : "border-white/5"} rounded-xl p-5 transition-all cursor-pointer flex items-start gap-4`}
          >
            <div className="mt-1 relative flex h-3 w-3 items-center justify-center">
              <div className="w-full h-full rounded-full bg-cyan-400 animate-ping absolute opacity-75" />
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 relative" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white tracking-tight">Diagnose Active Symptoms</h4>
              <p className="text-sm font-semibold text-zinc-200 leading-relaxed">
                Check engine lights, jerking, leaks, or E20 compatibility issues.
              </p>
            </div>
          </div>

          {/* CARD 02: VERIFY WORKSHOP INVOICE */}
          <div 
            onClick={() => setAppSection("Invoice Audit")}
            className={`bg-[#0d1117]/80 border ${appSection === "Invoice Audit" ? "border-cyan-500" : "border-white/5"} rounded-xl p-5 transition-all cursor-pointer flex items-start gap-4`}
          >
            <div className="mt-1 w-2.5 h-2.5 rounded-full bg-slate-600" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white tracking-tight">Verify Workshop Invoice</h4>
              <p className="text-sm font-semibold text-zinc-200 leading-relaxed">
                Audit garage quotes to detect overcharging & fraud items.
              </p>
            </div>
          </div>

          {/* CARD 03: USED CAR EVALUATOR GUIDE */}
          <div 
            onClick={() => setAppSection("PDI Checklist")}
            className={`bg-[#0d1117]/80 border ${appSection === "PDI Checklist" ? "border-cyan-500" : "border-white/5"} rounded-xl p-5 transition-all cursor-pointer flex items-start gap-4`}
          >
            <div className="mt-1 w-2.5 h-2.5 rounded-full bg-slate-600" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white tracking-tight">Used Car Evaluator Guide</h4>
              <p className="text-sm font-semibold text-zinc-200 leading-relaxed">
                Visual panel checkbook before buying a second-hand vehicle.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
