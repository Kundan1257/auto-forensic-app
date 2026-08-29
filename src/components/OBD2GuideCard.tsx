import React from "react";
import { Car, Bike, Truck } from "lucide-react";

export function OBD2GuideCard() {
  const guideItems = [
    {
      type: "Car",
      icon: <Car className="w-4 h-4 text-cyan-400" />,
      title: "CARS & SEDANS",
      description: "Look under the steering column. Plug your hardware scanner straight upwards into the 16-pin connector.",
      shape: (
        <svg viewBox="0 0 100 50" className="w-16 h-8 text-slate-500">
          <circle cx="40" cy="25" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x="58" y="17" width="12" height="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      )
    },
    {
      type: "Bike",
      icon: <Bike className="w-4 h-4 text-cyan-400" />,
      title: "BIKES & SCOOTERS",
      description: "Unlock and lift your rider seat cushion. Locate the diagnostic cable port right next to the battery.",
      shape: (
        <svg viewBox="0 0 100 50" className="w-16 h-8 text-slate-500">
          <path d="M30 35 L50 15 L70 35" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x="44" y="25" width="12" height="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      )
    }
  ];

  const truckItem = {
    type: "Truck",
    icon: <Truck className="w-4 h-4 text-cyan-400" />,
    title: "HEAVY TRUCKS",
    description: "Unclip the fuse wrapper shield under the passenger glovebox. Locate the heavy duty round connection port.",
    shape: (
      <svg viewBox="0 0 100 50" className="w-16 h-8 text-slate-500">
        <rect x="30" y="15" width="40" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="50" cy="25" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    )
  };

  const allItems = [...guideItems, truckItem];

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-xs font-black font-mono text-slate-500 uppercase tracking-wider">OBD2 Visual Connection Blueprint</h3>
      <div className="space-y-4">
        {allItems.map((item, idx) => (
          <div 
            key={idx}
            className="bg-[#0d1117]/80 border border-white/5 rounded-xl p-5 flex flex-col items-center text-center space-y-3 backdrop-blur-md"
          >
            <div className="h-8 flex items-center justify-center">
              {item.shape}
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono font-black text-white uppercase tracking-wider">
              {item.icon} {item.title}
            </div>
            <p className="text-sm font-semibold text-zinc-200 leading-relaxed max-w-md">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
