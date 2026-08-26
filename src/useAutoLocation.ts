import { useState } from "react";
import { TIMEZONE_REGION_MAP } from "./presetData";

export function useAutoLocation() {
  const [marketRegion, setMarketRegion] = useState(() => {
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTimeZone.includes("Kolkata") || userTimeZone.includes("Calcutta") || userTimeZone.includes("Asia")) {
        return "India / APAC (INR ₹)";
      }
      return TIMEZONE_REGION_MAP[userTimeZone] || "North America";
    } catch (e) {
      return "North America";
    }
  });

  return [marketRegion, setMarketRegion] as const;
}
