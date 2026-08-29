import { useState } from "react";
import { TIMEZONE_REGION_MAP } from "./presetData";

export function useAutoLocation() {
  const [marketRegion, setMarketRegion] = useState(() => {
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Map user timezones strictly down to short ISO code strings matching presetData models
      if (userTimeZone.includes("Kolkata") || userTimeZone.includes("Calcutta")) {
        return "in";
      }
      
      return TIMEZONE_REGION_MAP[userTimeZone] || "na";
    } catch (e) {
      return "na";
    }
  });

  return [marketRegion, setMarketRegion] as const;
}
