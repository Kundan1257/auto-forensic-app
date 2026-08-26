import React from "react";
import { Car, Bike, Truck } from "lucide-react";

interface SelectionProps {
  vehicleType: "Car" | "Bike" | "Truck";
  appSection: "Invoice Audit" | "Common Symptoms" | "PDI Checklist";
  setVehicleType: (type: "Car" | "Bike" | "Truck") => void;
  setAppSection: (section: "Invoice Audit" | "Common Symptoms" | "PDI Checklist") => void;
}

export const SelectionPanel: React.FC<SelectionProps> = ({
  vehicleType,
  appSection,
  setVehicleType,
  setAppSection
}) => {
  return (
    <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-5 shadow-2xl relative overflow-hidden" id="card-vehicle-selector">
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded-full font-mono">01_ASSET</span>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Select Vehicle Classification</h2>
      </div>

      <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-full border border-white/10 mb-5">
        <button type="button" onClick={() => setVehicleType("Car")} className={`py-2 rounded-full text-xs font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${vehicleType === "Car" ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold" : "text-slate-400 hover:text-white"}`}>
          <Car className="w-3.5 h-3.5" />
          <span>Car</span>
        </button>
        <button type="button" onClick={() => setVehicleType("Bike")} className={`py-2 rounded-full text-xs font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${vehicleType === "Bike" ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold" : "text-slate-400 hover:text-white"}`}>
          <Bike className="w-3.5 h-3.5" />
          <span>Bike</span>
        </button>
        <button type="button" onClick={() => setVehicleType("Truck")} className={`py-2 rounded-full text-xs font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${vehicleType === "Truck" ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold" : "text-slate-400 hover:text-white"}`}>
          <Truck className="w-3.5 h-3.5" />
          <span>Truck</span>
        </button>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Select Inspection Mode</span>
        <div className="flex flex-col gap-1 p-1 bg-black/20 rounded-xl border border-white/5">
          <button type="button" onClick={() => setAppSection("Common Symptoms")} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${appSection === "Common Symptoms" ? "bg-white/5 border border-white/10 text-white font-medium" : "text-slate-400 hover:bg-white/5"}`}>
            <div className={`w-2 h-2 rounded-full ${appSection === "Common Symptoms" ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-slate-600"}`} />
            <div>
              <span className="text-sm block">Diagnose Active Symptoms</span>
              <span className="text-[10px] text-slate-500 block font-normal">Check engine lights, jerking, leaks, or E20 compatibility issues</span>
            </div>
          </button>
          <button type="button" onClick={() => setAppSection("Invoice Audit")} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${appSection === "Invoice Audit" ? "bg-white/5 border border-white/10 text-white font-semibold" : "text-slate-400 hover:bg-white/5"}`}>
            <div className={`w-2 h-2 rounded-full ${appSection === "Invoice Audit" ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-slate-600"}`} />
            <div>
              <span className="text-sm block">Verify Workshop Invoice</span>
              <span className="text-[10px] text-slate-500 block font-normal">Audit garage quotes to detect overcharging & fraud items</span>
            </div>
          </button>
          <button type="button" onClick={() => setAppSection("PDI Checklist")} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${appSection === "PDI Checklist" ? "bg-white/5 border border-white/10 text-white font-semibold" : "text-slate-400 hover:bg-white/5"}`}>
            <div className={`w-2 h-2 rounded-full ${appSection === "PDI Checklist" ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-slate-600"}`} />
            <div>
              <span className="text-sm block">Used Car Evaluator Guide</span>
              <span className="text-[10px] text-slate-500 block font-normal">Visual panel checkbook before buying a second-hand vehicle</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
