import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { 
  Car, 
  Bike, 
  Truck, 
  FileText, 
  Activity, 
  CheckSquare, 
  Camera, 
  Upload, 
  ShieldAlert, 
  Globe, 
  RefreshCw, 
  Play, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  RotateCcw, 
  FileCheck, 
  Gauge, 
  Sparkles, 
  AlertCircle, 
  DollarSign,
  Maximize2,
  Minimize2,
  Sparkle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Presets data model for different combination matrices
const PRESETS = {
  Car: {
    "Common Symptoms": {
      title: "Cold Start Rattling & Oil Leak",
      text: "Rattling/ticking noise in the engine compartment on cold starts lasting 3 to 5 seconds, after which it disappears completely. Also, minor oil residue discovered near the valve cover gasket. Dashboard checks show no active check engine lights.",
      logs: "1. Ticking sound recorded on phone during cold startup\n2. Light yellow-brown transparent drops on front garage floor"
    },
    "Invoice Audit": {
      title: "Unscheduled 80,000-Mile Service",
      text: "Workshop Invoice #88432 - Region: North America\n- Synthetic Oil Change: $95.00\n- Cabin Air Filter: $55.00\n- Cabin Air Filter Labor: $65.00\n- Engine Air Filter: $40.00\n- Engine Air Filter Labor: $50.00\n- Front Brake pads Replacement: $320.00\n- Front Brake rotors Replacement: $480.00\n- Front Brake Labor (Pads & Rotors): $380.00\n- Brake Caliper Cleaning (Duplicate item since brake service is done): $120.00\n- Workshop Environmental Supplies Fee: $45.00\nTotal quote: $1,650.00",
      logs: "1. Scanned invoice sheet attached\n2. Mechanics hourly rate is listed as $160/hr in local bay"
    },
    "PDI Checklist": {
      title: "Model Year Delivery Stockyard Inspection",
      text: "Dealer Stockyard Inspection: Brand new vehicle visual delivery report. Checking generic body panel alignments, paint depth consistency across doors, original alloy wheel pristine status, protective transport plastics checklist, and fluid dipsticks levels before legal ownership sign-off.",
      logs: "1. Brand new vehicle awaiting visual delivery\n2. Vin code matched with sticker layout"
    }
  },
  Bike: {
    "Common Symptoms": {
      title: "Squealing Brakes & Jerky Throttle",
      text: "Loud high-frequency squealing noise when applying the rear disc brake during low-speed stopping. Additionally, throttle responsiveness feels sluggish or jerky when rolling off neutral gear in wet track conditions.",
      logs: "1. Video evidence of squealing rear wheel pad rotation\n2. Low gear acceleration lag observed on warm-up"
    },
    "Invoice Audit": {
      title: "Annual Chain & Maintenance Invoice",
      text: "Service Workshop Invoice - United Kingdom Region\n- Spark Plug Replacement: £35.00\n- Spark Plug Installation Labor: £90.00\n- Chain Adjustment & Lube: £25.00\n- Chain Tensioning Labor: £50.00 (Flag this: chain adjustment and tensioning are identical jobs!)\n- Engine Diagnostic Scan (No fault codes found): £110.00\n- Workshop cleaning surcharge: £20.00\nTotal Quote: £330.00",
      logs: "1. Printout from diagnostic computer scanned\n2. Mechanic hours: 1.5 hrs logged"
    },
    "PDI Checklist": {
      title: "Pre-Delivery Bike Stockroom Audit",
      text: "Physical stockroom delivery inspection for lightweight race/street bike. Confirming front fork seals are free from dynamic oil weep, chain slack is within standard 25mm limit, tire pressure matches manufacturer specifications, and engine serial numbers are properly stamped.",
      logs: "1. Transport shipping crate just opened\n2. Keys and factory accessories package check"
    }
  },
  Truck: {
    "Common Symptoms": {
      title: "Black Smoke & Left Steering Drifting",
      text: "Heavy black smoke blowing from the exhaust tailpipe during hard payload acceleration. Dynamic highway driving at 65mph shows a strong continuous drift/pulling force towards the left lane, requiring active steering offset correction.",
      logs: "1. Highway drifting steering wheel video track\n2. Sooty residue deposits found around exhaust tip tailpipe"
    },
    "Invoice Audit": {
      title: "Heavy Duty Fleet Service Audit",
      text: "Workshop Invoice - United Kingdom Region\n- Diesel Exhaust Fluid (DEF) Top-up: £45.00\n- Turbocharger Gaskets Replacement: £280.00\n- Turbo Labor: £600.00\n- EGR Valve System Service: £550.00\n- EGR Service Labor (Clean and Re-install): £350.00\n- Mechanic Shop Diagnostics Flat-Rate: £180.00 (This is often duplicated with diagnostic labor)\nTotal Quote: £2,005.00",
      logs: "1. Printed workshop paper copy scanned\n2. Exhaust gas high temperatures recorded in fleet database"
    },
    "PDI Checklist": {
      title: "Stockyard Super Duty Delivery Checklist",
      text: "Delivery audit checklist for dual-rear-axle commercial utility truck. Inspecting dual wheel torque markers, leaf spring seating integrity, hydraulic trailer hitch brake output controller configurations, auxiliary power take-off (PTO) gear clearance, and fuel system particulate water separators.",
      logs: "1. Flatbed delivery drop-off visual inspection sheet\n2. Ground visual undercarriage check list"
    }
  }
};

const MARKET_REGIONS = [
  { code: "North America", label: "North America (USD $)", symbol: "$" },
  { code: "Europe", label: "Europe (EUR €)", symbol: "€" },
  { code: "United Kingdom", label: "United Kingdom (GBP £)", symbol: "£" },
  { code: "Asia / India", label: "India / APAC (INR ₹)", symbol: "₹" },
  { code: "Australia", label: "Australia / NZ (AUD A$)", symbol: "A$" }
];

export default function App() {
  // Core Forensics parameters state
  const [vehicleType, setVehicleType] = useState<"Car" | "Bike" | "Truck">("Car");
  const [appSection, setAppSection] = useState<"Invoice Audit" | "Common Symptoms" | "PDI Checklist">("Common Symptoms");
  const [marketRegion, setMarketRegion] = useState("North America");
  const [userIssue, setUserIssue] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // App UI auxiliary states
  const [isScanning, setIsScanning] = useState(false);
  const [reportResult, setReportResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scanStep, setScanStep] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(false);

  // Camera capture states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Set initial template on mount or whenever parameter combinations change
  useEffect(() => {
    // Fill the parameter from presets
    const activePreset = PRESETS[vehicleType][appSection];
    setUserIssue(activePreset.text);
  }, [vehicleType, appSection]);

  // Clean up streaming track on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Read region symbols
  const activeRegionSymbol = MARKET_REGIONS.find(r => r.code === marketRegion)?.symbol || "$";

  // HTML5 Live Viewfinder & Capture Functions
  const startCamera = async () => {
    setIsCameraLoading(true);
    setCameraError("");
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Wait for video meta load to guarantee play state
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(e => console.error("Video element play failed:", e));
        };
      }
      setIsCameraActive(true);
      setHasCameraPermission(true);
    } catch (err: any) {
      console.error("Camera access failed", err);
      setHasCameraPermission(false);
      setCameraError("Camera access was denied or is unsupported on this device environment.");
    } finally {
      setIsCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const captureSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Sync size exactly
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw the current camera frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Output compression ratio to minimize socket load
        const base64Data = canvas.toDataURL("image/jpeg", 0.75);
        setImage(base64Data);
        
        // Stop streaming to preserve container performance
        stopCamera();
        
        // Simple visual screen flash animation trigger
        const captureFlash = document.getElementById("viewfinder-container");
        if (captureFlash) {
          captureFlash.classList.add("ring-8", "ring-cyan-400");
          setTimeout(() => {
            captureFlash.classList.remove("ring-8", "ring-cyan-400");
          }, 400);
        }
      }
    }
  };

  // Image Drag-and-Drop and File manual uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === "string") {
        setImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const clearCapturedImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Preset Template Loader
  const forceLoadTemplate = () => {
    const activePreset = PRESETS[vehicleType][appSection];
    setUserIssue(activePreset.text);
    // Flash textarea border
    const txtBox = document.getElementById("evidence-textarea");
    if (txtBox) {
      txtBox.classList.add("border-orange-500", "scale-[1.01]");
      setTimeout(() => {
        txtBox.classList.remove("border-orange-500", "scale-[1.01]");
      }, 300);
    }
  };

  // Action Execution Trigger (Calling server.ts proxy route)
  const runForensicAnalysis = async () => {
    setIsScanning(true);
    setErrorMessage(null);
    setReportResult(null);
    
    // Stop speaking if any report was running
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    // Interactive step log simulation
    const steps = [
      "Accessing optical diagnostics engine...",
      "Analyzing forensic metadata lines...",
      `Cross-referencing standard industry quotes for region: ${marketRegion}...`,
      "Flagging redundant labor packages & workshop markup structures...",
      "Simulating PDI stockroom benchmarks parameters...",
      "Generating certified Auto Forensic Safety Audit Report..."
    ];

    let currentStepIndex = 0;
    setScanStep(steps[currentStepIndex]);

    const stepInterval = setInterval(() => {
      if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        setScanStep(steps[currentStepIndex]);
      }
    }, 1200);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          market_region: marketRegion,
          vehicle_type: vehicleType,
          app_section: appSection,
          user_issue: userIssue,
          image: image // base64 encoded
        })
      });

      const resData = await response.json();
      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error(resData?.error || `Failed server call with code ${response.status}`);
      }

      if (resData && resData.report) {
        setReportResult(resData.report);
      } else {
        throw new Error("Invalid output received from evaluation proxy.");
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error(err);
      setErrorMessage(err?.message || "Connection failure with Auto Forensic server.");
    } finally {
      setIsScanning(false);
    }
  };

  // Report Manipulation Utilities
  const handleCopyReport = () => {
    if (reportResult) {
      navigator.clipboard.writeText(reportResult);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Client-Side SpeechSynthesizer narration of critical mechanics scripts
  const handleToggleSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech option is not available in your web browser environment.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!reportResult) return;

    // Filter out clean summaries or scripts to speak so we don't dump 1000 lines of markdown to ears
    // Look for lines containing negotiation scripts, severity lines, or standard titles
    const docLines = reportResult.split("\n");
    let scriptBlock = "";
    
    // Attempt to locate standard bullet sections inside the output
    const negotiationScriptLine = docLines.find(line => 
      line.toLowerCase().includes("negotiat") || 
      line.toLowerCase().includes("script") ||
      line.toLowerCase().includes("scarcity")
    );

    if (negotiationScriptLine) {
      const index = docLines.indexOf(negotiationScriptLine);
      scriptBlock = docLines.slice(index, index + 4).join(" ");
    } else {
      // Fallback: pick up the first 3 lines of report
      scriptBlock = docLines.slice(0, 5).join(" ");
    }

    // Strip markdown formatting symbols
    const cleanSpeechString = scriptBlock
      .replace(/[\*#_`>]/g, "")
      .replace(/\[CRITICAL\]/g, "Warning: CRITICAL severity detected!")
      .replace(/\[MONITOR\]/g, "Attention: Monitor status logged.")
      .replace(/\[MINOR\]/g, "Status: Minor severity.");

    const utterMsg = new SpeechSynthesisUtterance(cleanSpeechString || "Forensics appraisal complete. Please read screen details.");
    utterMsg.rate = 1.0;
    utterMsg.pitch = 1.0;

    utterMsg.onend = () => {
      setIsSpeaking(false);
    };

    utterMsg.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterMsg);
  };

  return (
    <div className="w-full min-h-screen bg-[#050608] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black font-sans" id="main-frame-wrapper">
      
      {/* Top Professional Header Bar */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-white/5 bg-[#0a0c10]/80 backdrop-blur-md" id="applet-primary-header">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]" id="shield-indicator-icon">
              <ShieldAlert className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight uppercase italic text-white flex items-center gap-1" id="brand-heading">
                  Auto Forensic <span className="text-cyan-400 font-mono text-xs align-top ml-1">v4.2</span>
                </h1>
              </div>
              <p className="hidden md:block text-[10px] text-slate-500 font-medium">
                Protecting vehicle buyers and drivers from workshop overcharge schemes
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Global Market Region Selector */}
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-full px-4 py-1.5" id="market-dropdown-box">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <label htmlFor="market-region-selector" className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1">Region:</label>
              <select
                id="market-region-selector"
                value={marketRegion}
                onChange={(e) => setMarketRegion(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-1"
              >
                {MARKET_REGIONS.map((region) => (
                  <option key={region.code} value={region.code} className="bg-gray-950 text-white">
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest leading-none">Diagnostic User</p>
                <p className="text-xs font-mono text-cyan-400">kk0555265@gmail.com</p>
              </div>
              <div className="w-9 h-9 rounded-full border border-cyan-500/30 p-0.5 flex-shrink-0">
                <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold text-cyan-400">AF</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Sandbox Grid Gridpane */}
      <main className="max-w-7xl mx-auto w-full flex-grow p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8" id="forensic-grid">
        
        {/* LEFT COLUMN: Input/Controls Panel (5 cols) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between space-y-6" id="controls-panel-container">
          
          {/* Card 1: Parameters Segment Buttons & Selector tabs */}
          <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-5 shadow-2xl relative overflow-hidden" id="card-vehicle-selector">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded-full font-mono">01_ASSET</span>
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Select Vehicle Category</h2>
            </div>

            {/* Vehicle Type Switchers Segment Buttons */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-full border border-white/10 mb-5" id="vehicle-segment-row">
              <button
                type="button"
                id="btn-select-car"
                onClick={() => setVehicleType("Car")}
                className={`py-1.5 rounded-full text-xs font-semibold uppercase transition-all cursor-pointer ${
                  vehicleType === "Car" 
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Car
              </button>

              <button
                type="button"
                id="btn-select-bike"
                onClick={() => setVehicleType("Bike")}
                className={`py-1.5 rounded-full text-xs font-semibold uppercase transition-all cursor-pointer ${
                  vehicleType === "Bike" 
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Bike
              </button>

              <button
                type="button"
                id="btn-select-truck"
                onClick={() => setVehicleType("Truck")}
                className={`py-1.5 rounded-full text-xs font-semibold uppercase transition-all cursor-pointer ${
                  vehicleType === "Truck" 
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Truck
              </button>
            </div>

            {/* Section tab toggling segments */}
            <div className="space-y-1.5" id="feature-tabs-container">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">App Feature Section</span>
              <div className="flex flex-col gap-1 p-1 bg-black/20 rounded-xl border border-white/5" id="app-section-grid">
                <button
                  type="button"
                  id="tab-symptoms"
                  onClick={() => setAppSection("Common Symptoms")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer text-left ${
                    appSection === "Common Symptoms" 
                      ? "bg-white/5 border border-white/10 shadow-inner text-white font-medium" 
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    appSection === "Common Symptoms" 
                      ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
                      : "bg-slate-600"
                  }`} />
                  <span className="text-sm">Common Symptoms</span>
                </button>

                <button
                  type="button"
                  id="tab-audit"
                  onClick={() => setAppSection("Invoice Audit")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer text-left ${
                    appSection === "Invoice Audit" 
                      ? "bg-white/5 border border-white/10 shadow-inner text-white font-semibold" 
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    appSection === "Invoice Audit" 
                      ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
                      : "bg-slate-600"
                  }`} />
                  <span className="text-sm">Invoice Audit</span>
                </button>

                <button
                  type="button"
                  id="tab-pdi"
                  onClick={() => setAppSection("PDI Checklist")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer text-left ${
                    appSection === "PDI Checklist" 
                      ? "bg-white/5 border border-white/10 shadow-inner text-white font-semibold" 
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    appSection === "PDI Checklist" 
                      ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
                      : "bg-slate-600"
                  }`} />
                  <span className="text-sm">PDI Checklist</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: High-Performance HTML5 camera viewfinder layout frame & Upload dropzone */}
          <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-5 shadow-2xl space-y-4" id="viewfinder-drag-card">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded-full font-mono">02_MEDIA</span>
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Document / Image Scan</h2>
              </div>
              {image && (
                <button
                  type="button"
                  onClick={clearCapturedImage}
                  className="text-xs px-2.5 py-1 rounded bg-white/5 hover:bg-red-950 hover:text-red-400 transition-all cursor-pointer border border-white/10 text-slate-300 font-mono"
                  id="btn-clear-photo"
                >
                  Clear File
                </button>
              )}
            </div>

            {/* Simulated & Real optical capture screen layout */}
            <div 
              id="viewfinder-container" 
              className="relative w-full h-56 sm:h-64 bg-black rounded-2xl border border-white/5 shadow-inner overflow-hidden flex flex-col items-center justify-center transition-all group"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              
              <AnimatePresence mode="wait">
                {isCameraActive ? (
                  /* LIVE WEBCAM VIEWFINDER */
                  <motion.div 
                    key="cameraLive"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full flex flex-col"
                    id="live-camera-view"
                  >
                    <video 
                      ref={videoRef} 
                      className="w-full h-full object-cover filter brightness-[1.05]" 
                      playsInline
                      muted
                    />
                    
                    {/* Viewfinder target overlays */}
                    <div className="absolute inset-4 border border-dashed border-cyan-400/30 rounded-lg pointer-events-none flex items-center justify-center">
                      <div className="w-12 h-12 border-t-2 border-l-2 border-cyan-400/80 absolute top-0 left-0" />
                      <div className="w-12 h-12 border-t-2 border-r-2 border-cyan-400/80 absolute top-0 right-0" />
                      <div className="w-12 h-12 border-b-2 border-l-2 border-cyan-400/80 absolute bottom-0 left-0" />
                      <div className="w-12 h-12 border-b-2 border-r-2 border-cyan-400/80 absolute bottom-0 right-0" />
                      
                      {/* Scanning visual overlay bar */}
                      <div className="w-full h-[2px] bg-cyan-400/45 absolute animate-[bounce_3s_infinite]" />
                    </div>
                    
                    {/* Running status badge */}
                    <div className="absolute top-3 left-3 bg-[#0a0c10] border border-white/10 text-cyan-400 px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                      LIVE FEED
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between gap-2">
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="flex-1 text-xs py-2 rounded-lg bg-black/80 hover:bg-black text-white font-medium border border-white/10 backdrop-blur-sm cursor-pointer font-mono"
                        id="btn-close-cam"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={captureSnapshot}
                        className="flex-1 text-xs py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold border border-cyan-300 backdrop-blur-sm shadow-md cursor-pointer flex items-center justify-center gap-1.5 font-mono"
                        id="btn-capture-cam"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        Snap Document
                      </button>
                    </div>
                  </motion.div>
                ) : image ? (
                  /* IMAGE CAPTURE PREVIEW */
                  <motion.div 
                    key="imagePreview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black"
                    id="captured-image-preview"
                  >
                    <img 
                      src={image} 
                      alt="Captured forensic proof document" 
                      className="max-w-full max-h-full object-contain filter"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur border border-white/10 px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 text-cyan-400 font-mono">
                      <FileCheck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      Evidence Armed
                    </div>
                  </motion.div>
                ) : (
                  /* AMBIENT DROPZONE & CAMERA INITIATOR */
                  <motion.div 
                    key="idleState"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center p-6 space-y-4 cursor-pointer w-full h-full hover:bg-cyan-500/[0.02] transition-colors relative"
                    onClick={() => fileInputRef.current?.click()}
                    id="camera-upload-trigger-area"
                  >
                    {/* Concentric alignment lines */}
                    <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none opacity-20">
                      <div className="w-56 h-56 border border-cyan-500/20 rounded-full flex items-center justify-center">
                        <div className="w-40 h-40 border border-cyan-500/10 rounded-full" />
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 rounded-full text-slate-400 group-hover:scale-110 group-hover:text-cyan-400 transition-all border border-white/5 relative z-10">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                        Drag & Drop document or <span className="text-cyan-400 underline">browse</span>
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">
                        Accepts JPG, PNG images representing invoices, symptoms or visual records
                      </p>
                    </div>

                    {/* Camera Trigger Buttons */}
                    <div className="pt-2 flex justify-center w-full relative z-10" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        id="btn-trigger-camera"
                        onClick={startCamera}
                        disabled={isCameraLoading}
                        className="text-xs px-4 py-2 rounded-full bg-white/5 hover:bg-cyan-500 text-slate-200 hover:text-black font-semibold border border-white/10 hover:border-cyan-400 transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer font-mono"
                      >
                        {isCameraLoading ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                        ) : (
                          <Camera className="w-3.5 h-3.5" />
                        )}
                        Use Diagnostics Live Camera
                      </button>
                    </div>

                    {cameraError && (
                      <p className="text-[10px] text-rose-400 font-mono px-3 mt-1 text-center relative z-10">
                        {cameraError}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Secret canvas for dynamic drawing snapshots */}
              <canvas ref={canvasRef} className="hidden" />
              {/* Trigger hidden file selector */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload}
                accept="image/*"
                            id="hidden-evidence-file"
              />
            </div>
          </div>

          {/* Card 3: Context Inputs & execution matrix parameters */}
          <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-5 shadow-2xl relative" id="card-context-parameters">
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded-full font-mono">03_INPUT</span>
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Detail Context logs</h2>
              </div>
              <button
                type="button"
                id="btn-load-preset-template"
                onClick={forceLoadTemplate}
                className="text-xs px-2.5 py-1 text-cyan-400 bg-cyan-950/40 border border-cyan-900/40 hover:bg-cyan-500 hover:text-black rounded-full transition-all flex items-center gap-1 cursor-pointer font-mono font-medium"
                title="Automatically load real world diagnostic case preset matching selected filters"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Fill Preset
              </button>
            </div>
 
             <div className="space-y-3" id="textarea-payload-box">
               <textarea
                 id="evidence-textarea"
                 rows={4}
                 value={userIssue}
                 onChange={(e) => setUserIssue(e.target.value)}
                 placeholder={
                   appSection === "Invoice Audit" 
                     ? "Example: Oil change: $95.00, Cabin air filter cost: $55.00..." 
                     : appSection === "Common Symptoms"
                     ? "Example: Metal engine rattle or knocking sound when accelerating..."
                     : "Inspect stockyard details or new vehicle parameters..."
                 }
                 className="w-full text-xs sm:text-sm bg-black/40 border border-white/10 rounded-xl p-3 text-cyan-50 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-mono leading-relaxed resize-none"
               />
               
               <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono" id="character-counter-row">
                 <span>Text-Length: <strong className="text-slate-300">{userIssue.length}</strong> chars</span>
                 <span className="flex items-center gap-1 text-slate-400">
                   <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                   Proxy Engine Online
                 </span>
               </div>
             </div>
 
             {/* Run Auto Forensic Appraisal Button */}
             <div className="mt-5" id="execution-button-box">
               <button
                 type="button"
                 id="btn-execute-appraisal"
                 disabled={isScanning}
                 onClick={runForensicAnalysis}
                 className="w-full relative overflow-hidden py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-transform bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer group disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed font-mono"
               >
                 {isScanning ? (
                   <>
                     <RefreshCw className="w-4 h-4 animate-spin text-black" />
                     Scanning Diagnostic Lines...
                   </>
                 ) : (
                   <>
                     <Gauge className="w-4 h-4 text-black group-hover:rotate-45 transition-transform" />
                     Run Auto Forensic Appraisal
                   </>
                 )}
               </button>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Terminal Result Display (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]" id="result-terminal-column">
          <div className="bg-[#0a0c10] border border-white/5 rounded-2xl shadow-2xl flex-grow flex flex-col justify-between overflow-hidden relative" id="terminal-glass-pane">
            
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-[#0a0c10] border-b border-white/5 flex items-center justify-between" id="terminal-header-metadata">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1.5" id="macbook-circles">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 pl-2 border-l border-white/5 tracking-wider font-semibold">
                  REPORT_BUFFER:{vehicleType.toUpperCase()}_{appSection.replace(" ", "_").toUpperCase()}_LOG
                </span>
              </div>

              {/* Status and interactive controller options */}
              <div className="flex items-center gap-2" id="report-quick-tool-icons">
                {reportResult && (
                  <>
                    {/* Visual Critical Highlight toggle */}
                    <button
                      type="button"
                      id="btn-toggle-critical-highlight"
                      onClick={() => setActiveHighlight(!activeHighlight)}
                      className={`text-[10px] px-2.5 py-1 rounded font-mono border transition-all cursor-pointer flex items-center gap-1 ${
                        activeHighlight 
                          ? "bg-cyan-950 border-cyan-800 text-cyan-400" 
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200"
                      }`}
                      title="Toggle highlight visual style for alert flags inside report"
                    >
                      <Sparkle className={`w-3 h-3 ${activeHighlight ? "text-cyan-400 animate-spin" : "text-slate-500"}`} />
                      Highlight Flags
                    </button>

                    {/* Client-Side Audio narration player */}
                    <button
                      type="button"
                      id="btn-speak-report"
                      onClick={handleToggleSpeech}
                      className={`text-xs p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                        isSpeaking 
                          ? "bg-cyan-950 border-cyan-850 text-cyan-400 animate-pulse" 
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20"
                      }`}
                      title={isSpeaking ? "Mute mechanic negotiation script speaker" : "Narration: Speak negotiation instruction or summary"}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    {/* Copy Markdown response raw output */}
                    <button
                      type="button"
                      id="btn-copy-clipboard"
                      onClick={handleCopyReport}
                      className="text-xs p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/15 text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center"
                      title="Copy complete markdown layout text"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </>
                )}
                
                <span className="text-[11px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded font-mono border border-cyan-800/20" id="region-token">
                  LOCALE: {marketRegion.toUpperCase()} ({activeRegionSymbol})
                </span>
              </div>
            </div>

            {/* Terminal Screen Body Area (Scrollable space) */}
            <div className="flex-grow p-5 sm:p-6 overflow-y-auto font-sans leading-relaxed text-sm scrollbar-thin scrollbar-thumb-white/10" id="terminal-diagnostics-display">
              <AnimatePresence mode="wait">
                {isScanning ? (
                  /* DYNAMIC CYBERPUNK SCANNING SCREEN */
                  <motion.div
                    key="scanningScreen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                    id="scanning-screen-state"
                  >
                    {/* Glowing radar visual */}
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <div className="absolute inset-0 border border-dashed border-cyan-500/40 rounded-full animate-spin" />
                      <div className="absolute inset-2 border border-cyan-600/30 rounded-full" />
                      <div className="absolute inset-4 border border-dashed border-cyan-500/40 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
                      <Gauge className="w-8 h-8 text-cyan-400 animate-[pulse_1.5s_infinite]" />
                    </div>

                    <div className="space-y-2 max-w-sm">
                      <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">Forensics Scanner Active</h3>
                      
                      {/* Active step readout text */}
                      <p className="text-slate-200 font-mono text-xs font-semibold px-4 min-h-[36px]">
                        {scanStep}
                      </p>
                      
                      <div className="w-48 h-1 bg-black/40 rounded-full mx-auto overflow-hidden border border-white/5 relative">
                        <div className="h-full bg-cyan-500 rounded-full animate-[shimmer_1.5s_infinite] w-full absolute -left-full" />
                      </div>
                    </div>
                  </motion.div>
                ) : errorMessage ? (
                  /* RED ERROR CONTAINER BANNER */
                  <motion.div
                    key="errorScreen"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4 py-8"
                    id="error-screen-state"
                  >
                    <div className="p-3 bg-red-950/60 border border-red-800 rounded-full text-red-400 animate-bounce">
                      <AlertCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-200">Diagnostics Analysis Fault</h3>
                      <p className="text-xs text-rose-400 font-mono mt-2 bg-black/60 p-3 rounded-lg border border-red-900/40 leading-relaxed text-left">
                        {errorMessage}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={runForensicAnalysis}
                      className="text-xs px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-md cursor-pointer font-mono"
                      id="btn-retry-analysis"
                    >
                      <RefreshCw className="w-3 px-0.5 h-3 inline-block mr-1" />
                      Retry Analysis
                    </button>
                  </motion.div>
                ) : reportResult ? (
                  /* COMPILED FINAL FORENSICS EVALUATION REPORT (rendered inline Markdown) */
                  <motion.div
                    key="reportScreen"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`markdown-body selection:bg-cyan-500/30 selection:text-white transition-all ${
                      activeHighlight ? "markup-indicators-highlighted" : ""
                    }`}
                    id="report-screen-markdown-output"
                  >
                    {/* Visual notice if highlighting is armed */}
                    {activeHighlight && (
                      <div className="mb-4 bg-cyan-950/40 border border-cyan-800/40 p-2.5 rounded-lg text-xs leading-relaxed text-cyan-300 font-mono flex items-center gap-2">
                        <Sparkle className="w-4 h-4 text-cyan-400 animate-pulse flex-shrink-0" />
                        <span>Markup analysis visual emphasis is ARMED. Spot indicators flagged below representing critical/minor warnings and scripts.</span>
                      </div>
                    )}

                    <ReactMarkdown>{reportResult}</ReactMarkdown>
                  </motion.div>
                ) : (
                  /* AMBIENT TERMINAL PLACEHOLDER STALKER */
                  <motion.div
                    key="idlePlaceholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6 py-12"
                    id="ambient-placeholder-state"
                  >
                    <div className="w-16 h-16 border border-white/5 rounded-full flex items-center justify-center text-cyan-400 bg-white/5 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-full animate-pulse" />
                      <Gauge className="w-6 h-6 text-cyan-400" />
                    </div>

                    <div className="space-y-2 max-w-sm">
                      <h3 className="text-sm font-bold text-cyan-400">Ready for Forensic Appraisal</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        To evaluate vehicle details, formulate standard checklists, or audit mechanics itemized bills:
                      </p>
                      <div className="inline-grid grid-cols-1 gap-1.5 text-left text-xs text-slate-400 font-mono mt-4 mx-auto pt-4 border-t border-white/5 w-full" id="flow-infobox">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 bg-white/5 border border-white/10 text-[9px] font-mono flex items-center justify-center rounded text-cyan-400 font-semibold uppercase">1</span>
                          <span>Specify vehicle class filters above.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 bg-white/5 border border-white/10 text-[9px] font-mono flex items-center justify-center rounded text-cyan-400 font-semibold uppercase">2</span>
                          <span>Upload scanned receipts/logs or capture raw snapshot.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 bg-white/5 border border-white/10 text-[9px] font-mono flex items-center justify-center rounded text-cyan-400 font-semibold uppercase">3</span>
                          <span>Write parameters or click "Fill Preset Template".</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Terminal Frame Footer Summary banner */}
            <div className="px-4 py-2.5 bg-[#0a0c10] border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-500 font-mono gap-1.5" id="terminal-footer">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Forensic Engine Operational: READY</span>
              </span>
              <span>Model Reference Target: <strong>gemini-2.5-flash</strong></span>
            </div>

          </div>
        </div>

      </main>

      {/* Styled Footer containing security tips and guidelines */}
      <footer className="border-t border-white/5 bg-[#07090d] px-4 py-4 sm:px-6 text-center text-xs text-slate-500 space-y-1.5" id="applet-primary-footer">
        <p className="max-w-2xl mx-auto">
          <strong>Auto Forensic</strong> operates as an informational assistant to flag workshop pricing discrepancies. In any dispute, refer to certified mechanic manuals and regional automobile manufacturer billing guidelines.
        </p>
        <p className="font-mono text-[10px] text-slate-600">
          Powered securely behind server proxies. Gemini API Token remain hidden. Auto Forensic | Copyright &copy; 2026.
        </p>
      </footer>
    </div>
  );
}
