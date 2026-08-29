import React from "react";
import { Globe } from "lucide-react";
import { MARKET_REGIONS } from "../presetData";

interface GlobalNodePickerProps {
  marketRegion: string;
  setMarketRegion: (val: string) => void;
}

export function GlobalNodePicker({ marketRegion, setMarketRegion }: GlobalNodePickerProps) {
  return (
    <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-full px-4 py-1.5 shadow-md hover:border-cyan-500/20 transition-all">
      <Globe className="w-3.5 h-3.5 text-cyan-400" />
      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1">Global Node:</label>
      <select 
        value={marketRegion} 
        onChange={(e) => setMarketRegion(e.target.value)} 
        className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer pr-1"
      >
        {MARKET_REGIONS && MARKET_REGIONS.map((r) => (
          <option key={r.code} value={r.code} className="bg-gray-950 text-white text-xs">
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
}
