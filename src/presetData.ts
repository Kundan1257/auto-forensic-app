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
  { code: "hi", label: "Hindi (हिंदी)" },
  { code: "es", label: "Espa\u00F1ol (ES)" },
  { code: "zh", label: "Chinese (\\u4E2D\\u6585)" },
  { code: "ja", label: "Japanese (\\u65E5\\u672C\\u8A9E)" },
  { code: "ko", label: "Korean (\\uD55C\\uAD6D\\uC5B4)" },
  { code: "fr", label: "Fran\\u00E7ais (FR)" },
  { code: "de", label: "Deutsch (DE)" },
  { code: "it", label: "Italiano (IT)" },
  { code: "pt", label: "Portugu\\u00EAt (BR)" },
  { code: "ru", label: "Russian (\\u0420\\u0443\\u0441\\u0441\\u043A\\u0438\\u0439)" },
  { code: "ar", label: "Arabic (\\u0627\\u0644\\u0639\\u0631\\u0628\\u064A\\u0629)" },
  { code: "nl", label: "Nederlands (NL)" },
  { code: "tr", label: "T\\u00FCrk\\u00E7e (TR)" },
  { code: "sv", label: "Svenska (SE)" },
  { code: "pl", label: "Polski (PL)" },
  { code: "vi", label: "Vietnamese (\\u0056\\u0069\\u1EC7\\u0074\\u004E\\u0061\\u006D)" }
];

export const MARKET_REGIONS: MarketRegion[] = [
  { code: "na", label: "North America (USD $)", currency: "$" },
  { code: "eu", label: "Europe (EUR \u20AC)", currency: "\u20AC" },
  { code: "uk", label: "United Kingdom (GBP \u00A3)", currency: "\u00A3" },
  { code: "in", label: "India / APAC (INR \u20B9)", currency: "\u20B9" },
  { code: "au", label: "Australia / NZ (AUD $)", currency: "$" },
  { code: "ca", label: "Canada (CAD $)", currency: "$" },
  { code: "jp", label: "Japan (JPY \u00A5)", currency: "\u00A5" },
  { code: "kr", label: "South Korea (KRW \u20A9)", currency: "\u20A9" },
  { code: "ch", label: "China (CNY \u00A5)", currency: "\u00A5" },
  { code: "sg", label: "Singapore (SGD $)", currency: "$" },
  { code: "hk", label: "Hong Kong (HKD $)", currency: "$" },
  { code: "nz", label: "New Zealand (NZD $)", currency: "$" },
  { code: "br", label: "Brazil (BRL R$)", currency: "R$" },
  { code: "mx", label: "Mexico (MXN $)", currency: "$" },
  { code: "za", label: "South Africa (ZAR R)", currency: "R" },
  { code: "sa", label: "Saudi Arabia (SAR \uFEEB)", currency: "\uFEEB" },
  { code: "ae", label: "UAE (AED \u062F.\u0625)", currency: "\u062F.\u0625" },
  { code: "ph", label: "Philippines (PHP \u20B1)", currency: "\u20B1" },
  { code: "my", label: "Malaysia (MYR RM)", currency: "RM" },
  { code: "id", label: "Indonesia (IDR Rp)", currency: "Rp" },
  { code: "th", label: "Thailand (THB \u0E3F)", currency: "\u0E3F" },
  { code: "vi", label: "Vietnam (VND \u20AB)", currency: "\u20AB" },
  { code: "tw", label: "Taiwan (TWD $)", currency: "$" }
];

export interface SubscriptionTier {
  id: "bike_tier" | "car_tier" | "truck_tier";
  label: string;
  priceINR: number;
  priceUSD: number;
  allowedVehicles: Array<"Car" | "Bike" | "Truck">;
}

export const SUBSCRIPTION_TIERS: Record<string, SubscriptionTier> = {
  bike_tier: { id: "bike_tier", label: "Two-Wheeler Forensic Node", priceINR: 99, priceUSD: 1.99, allowedVehicles: ["Bike"] },
  car_tier: { id: "car_tier", label: "Standard Auto Diagnostic Node", priceINR: 200, priceUSD: 2.49, allowedVehicles: ["Bike", "Car"] },
  truck_tier: { id: "truck_tier", label: "Commercial Fleet Heavy Master", priceINR: 500, priceUSD: 5.99, allowedVehicles: ["Bike", "Car", "Truck"] }
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

export const TIMEZONE_REGION_MAP: Record<string, string> = {
  "Asia/Calcutta": "in", "Asia/Kolkata": "in", "America/New_York": "na", "America/Chicago": "na",
  "America/Denver": "na", "America/Los_Angeles": "na", "Europe/London": "uk", "Europe/Paris": "eu",
  "Europe/Berlin": "eu", "Australia/Sydney": "au", "Australia/Melbourne": "au", "Pacific/Auckland": "au"
};
