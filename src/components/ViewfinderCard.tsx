import React from "react";
import { Camera, RefreshCw, FileCheck } from "lucide-react";

interface ViewfinderProps {
  isCameraActive?: boolean;
  isCameraLoading?: boolean;
  cameraError?: string;
  image?: string | null;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  stopCamera?: () => void;
  captureSnapshot?: () => void;
  startCamera?: () => void;
  clearCapturedImage?: () => void;
  handleFileUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver?: (e: React.DragEvent) => void;
  handleDrop?: (e: React.DragEvent) => void;
}

export const ViewfinderCard: React.FC<ViewfinderProps> = ({
  isCameraActive = false,
  isCameraLoading = false,
  cameraError = "",
  image = null,
  videoRef,
  fileInputRef,
  stopCamera = () => {},
  captureSnapshot = () => {},
  startCamera = () => {},
  clearCapturedImage = () => {},
  handleFileUpload = () => {},
  handleDragOver = () => {},
  handleDrop = () => {}
}: ViewfinderProps) => {
  return (
    <div className="bg-[#0a0c10]/60 border border-white/5 rounded-xl p-4 shadow-xl backdrop-blur-md w-full">
      {/* CARD HEADER ROW */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wider">Mobile Camera Scan Viewfinder</h3>
        </div>
        {isCameraActive && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        )}
      </div>

      {/* VIEWPORT BOX CHASSIS */}
      <div 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative aspect-video w-full rounded-lg bg-black/40 border border-white/5 overflow-hidden flex flex-col items-center justify-center p-4 text-center group transition-all hover:border-cyan-500/10"
      >
        {/* CONDITION A: SHOW CAPTURED PREVIEW IMAGE IMAGE */}
        {image ? (
          <div className="absolute inset-0 w-full h-full z-10 animate-fade-in">
            <img src={image} alt="Captured forensic component" className="w-full h-full object-cover" />
            <button 
              onClick={clearCapturedImage}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 border border-white/10 text-slate-300 hover:text-white rounded-lg p-1.5 text-[10px] font-mono transition-all z-20 cursor-pointer flex items-center gap-1"
            >
              <span>🔄</span> Clear Scan
            </button>
          </div>
        ) : isCameraActive ? (
          /* CONDITION B: SHOW LIVE WEBCAM VIDEO STREAM FEED */
          <div className="absolute inset-0 w-full h-full bg-black">
            <video 
              ref={videoRef as any} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover mirror"
            />
            {isCameraLoading && (
              <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 z-10">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" /> Connecting Lens Array...
              </div>
            )}
          </div>
        ) : (
          /* CONDITION C: SHOW BASELINE DRAG AND DROP FILE PICKER PROMPT */
          <div 
            onClick={() => fileInputRef?.current?.click()}
            className="space-y-2 cursor-pointer select-none py-6 w-full"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mx-auto group-hover:border-cyan-500/20 group-hover:bg-cyan-500/5 transition-all">
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            <p className="text-[11px] font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
              Capture visual component evidence or upload document logs
            </p>
            <p className="text-[10px] text-slate-600 font-mono">PNG, JPG up to 10MB</p>
          </div>
        )}

        {/* COMPONENT STREAM EXCEPTION ALERTS */}
        {cameraError && (
          <div className="absolute inset-x-0 bottom-2 mx-4 bg-rose-950/80 border border-rose-500/20 text-rose-300 p-2 rounded-lg text-[10px] font-mono z-20">
            ⚠️ {cameraError}
          </div>
        )}
      </div>

      {/* CORE CONTROL ACTION BUTTON TOOLBARS */}
      <div className="mt-3 flex items-center gap-2">
        {isCameraActive ? (
          <>
            <button
              onClick={captureSnapshot}
              disabled={isCameraLoading}
              className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-40 text-black font-mono text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>📸</span> Capture Snapshot
            </button>
            <button
              onClick={stopCamera}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white font-mono text-xs rounded-lg transition-all cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          !image && (
            <button
              onClick={startCamera}
              className="w-full py-2 bg-black/40 hover:bg-black/60 border border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>📷</span> Open Live Device Camera
            </button>
          )
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef as any} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/*" 
      />
    </div>
  );
};
