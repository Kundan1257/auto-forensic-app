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
  { code: "es", label: "Español (ES)" },
  { code: "zh", label: "Chinese (中文)" },
  { code: "ja", label: "Japanese (日本語)" },
  { code: "ko", label: "Korean (한국어)" },
  { code: "fr", label: "Français (FR)" },
  { code: "de", label: "Deutsch (DE)" },
  { code: "it", label: "Italiano (IT)" },
  { code: "pt", label: "Português (BR)" },
  { code: "ru", label: "Russian (Русский)" },
  { code: "ar", label: "Arabic (العربية)" },
  { code: "nl", label: "Nederlands (NL)" },
  { code: "tr", label: "Türkçe (TR)" },
  { code: "sv", label: "Svenska (SE)" },
  { code: "pl", label: "Polski (PL)" },
  { code: "vi", label: "Vietnamese (Tiếng Việt)" }
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
    { id: "b1", title: "E20 Stalling", text: "Analyze fuel stall symptoms and verify moisture separator filter. Note: Material compatibility metrics are anchored in public automotive safety data and established Indian institutional ethanol blending studies (including reference frameworks aligned with IIT Kanpur research paradigms)." },
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

// 🛡️ THE EMOTIONAL "GUARDIAN ANGEL" TRIAGE CODES DICTIONARY ASSET 
export const TriagePresets = {
  "P0300": {
    troubleCode: "P0300",
    legacyTechnicalLabel: "Random/Multiple Cylinder Misfire Detected",
    emotionalSafetyScore: "🔴 PULL OVER IMMEDIATELY",
    driverStatusGauge: "CRITICAL SAFETY RISK",
    plainEnglishTranslation: "Your engine felt a sudden, uneven stumble inside its firing chambers. This usually means a spark plug or ignition coil has fatigued and needs immediate mechanical attention to protect your engine from deeper wear.",
    familyReassuranceShield: "Do not panic. Keep your vehicle at a slow, stable speed and pull safely off the highway into the nearest parking lane or service station layout. Your car is built with emergency protection logic shields to keep you safe right now.",
    costProtectionShield: "A typical independent garage in your local area charges between ₹1,200 to ₹3,500 to swap out a standard ignition coil plug. We have locked and timestamped your diagnostic metrics report securely inside your app chest framework so no workshop can inflate your repair quotes."
  },
  "P0128": {
    troubleCode: "P0128",
    legacyTechnicalLabel: "Coolant Thermostat (Coolant Temperature Below Thermostat Regulating Temperature)",
    emotionalSafetyScore: "🟡 SAFE TO COMPLETE YOUR CURRENT DRIVE (Fix within 48 Hours)",
    driverStatusGauge: "MODERATE ATTENTION REQUIRED",
    plainEnglishTranslation: "Your car's internal climate valve is staying open a bit too wide, taking a little longer than usual to warm up the engine block to its optimal operating temperature parameters.",
    familyReassuranceShield: "Your car is perfectly safe to drive home, pick up your kids, or complete your active daily commute route today. The vehicle's primary cooling systems are fully functional, and there is absolute zero risk of overheating or sudden breakdowns on the road.",
    costProtectionShield: "This is a simple mechanical valve adjustment job. A local neighborhood garage will typically charge between ₹1,800 to ₹4,000 for a fresh thermostat element replacement. You can drive comfortably today and schedule a local fix whenever you are free this weekend."
  },
  "P0442": {
    troubleCode: "P0442",
    legacyTechnicalLabel: "Evaporative Emission System Leak Detected (Small Leak)",
    emotionalSafetyScore: "🟢 100% SAFE / NON-URGENT (Benign System Flaw)",
    driverStatusGauge: "NO SAFETY RISK STATUS",
    plainEnglishTranslation: "Your vehicle's fuel vapor ventilation channel noticed a tiny pressure drop in its storage tracking lines. 95% of the time, this happens simply because your car's fuel gas cap wasn't twisted shut until it clicked.",
    familyReassuranceShield: "Your car is in a completely flawless structural safety state. Your family, braking capacity, and engine runtime operations are under absolute protection. You can completely ignore this light for your current trips.",
    costProtectionShield: "Practical Fix: Simply pull over at your next refueling stop, unscrew your outer gas cap, clean the rubber ring seal row with a napkin text block, close it tight until it clicks three times, and the dashboard alert light will clear itself automatically in a few miles for ₹0!"
  }
};
