export interface GlobalLanguage {
  code: string;
  label: string;
}

export interface MarketRegion {
  code: string;
  label: string;
  currency: string;
}

export const GLOBAL_LANGUAGES: GlobalLanguage[] = [
  { code: "en", label: "English (Global)" },
  { code: "hi", label: "Hindi (इंडिया)" },
  { code: "es", label: "Español (ES)" },
  { code: "zh", label: "Chinese (中文)" }
];

export const MARKET_REGIONS: MarketRegion[] = [
  { code: "na", label: "North America (USD $)", currency: "$" },
  { code: "eu", label: "Europe (EUR €)", currency: "€" },
  { code: "uk", label: "United Kingdom (GBP £)", currency: "£" },
  { code: "in", label: "India / APAC (INR ₹)", currency: "₹" },
  { code: "au", label: "Australia / NZ (AUD $)", currency: "$" }
];

export interface SubscriptionTier {
  id: "bike_tier" | "car_tier" | "truck_tier";
  label: string;
  priceINR: number;
  priceUSD: number;
  allowedVehicles: Array<"Car" | "Bike" | "Truck">;
}

export const SUBSCRIPTION_TIERS: Record<string, SubscriptionTier> = {
  bike_tier: {
    id: "bike_tier",
    label: "Two-Wheeler Forensic Node",
    priceINR: 99,
    priceUSD: 1.99,
    allowedVehicles: ["Bike"]
  },
  car_tier: {
    id: "car_tier",
    label: "Standard Auto Diagnostic Node",
    priceINR: 200,
    priceUSD: 2.49,
    allowedVehicles: ["Bike", "Car"]
  },
  truck_tier: {
    id: "truck_tier",
    label: "Commercial Fleet Heavy Master",
    priceINR: 500,
    priceUSD: 5.99,
    allowedVehicles: ["Bike", "Car", "Truck"]
  }
};

export const PRESETS = {
  Car: [
    { id: "c1", title: "Engine Valve Tick", text: "Isolate ticking sound near top cylinder valve cover area" },
    { id: "c2", title: "OBD2 Misfire Check", text: "Scan cylinder misfire tracking logs on powertrain control unit" }
  ],
  Bike: [
    { id: "b1", title: "E20 Stalling", text: "Analyze fuel stall symptoms and verify moisture separator filter" },
    { id: "b2", title: "Chain Slap Guard", text: "Evaluate drive chain link tension margins for sprocket safety" }
  ],
  Truck: [
    { id: "t1", title: "Invoice Audit", text: "Perform line-item structural audit against standard flat-rate workshop fees" },
    { id: "t2", title: "DPF Telemetry", text: "Evaluate diesel particulate filter regeneration backpressure logs" }
  ]
};

// 🌐 AUTOMATIC GEO-IP TIMEZONE REGION MAPPING MATRIX FOR USEAUTOLOCATION HANDSHAKES
export const TIMEZONE_REGION_MAP: Record<string, string> = {
  "Asia/Calcutta": "in",
  "Asia/Kolkata": "in",
  "America/New_York": "na",
  "America/Chicago": "na",
  "America/Denver": "na",
  "America/Los_Angeles": "na",
  "Europe/London": "uk",
  "Europe/Paris": "eu",
  "Europe/Berlin": "eu",
  "Australia/Sydney": "au",
  "Australia/Melbourne": "au",
  "Pacific/Auckland": "au"
};
