import React from "react";

interface ViewfinderCardProps {
  image: any;
  isCameraActive: boolean;
  isCameraLoading: boolean;
  cameraError: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  startCamera: () => void;
  stopCamera: () => void;
  captureSnapshot: () => void;
  clearCapturedImage: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  clearScan?: () => void;
}

export function ViewfinderCard({
  image,
  isCameraActive,
  isCameraLoading,
  cameraError,
  videoRef,
  fileInputRef,
  startCamera,
  stopCamera,
  captureSnapshot,
  clearCapturedImage,
  handleFileUpload,
  handleDragOver,
  handleDrop
}: ViewfinderCardProps) {
  return (
    <div className="bg-[#0d1117]/80 border border-white/5 rounded-2xl shadow-xl max-w-4xl mx-auto">
      
      {/* 📸 LENS CARD HEADER ROW WITH HIGH-CONTRAST VISUAL ANCHORS */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 bg-[#0d1117] p-4 rounded-t-2xl">
        <div className="flex items-center gap-2.5">
          <span className="text-cyan-400 text-lg sm:text-xl">📸</span>
          <h3 className="text-xs sm:text-sm font-black font-mono text-cyan-400 uppercase tracking-widest">
            🛑 ══ MOBILE CAMERA SCAN VIEWFINDER ══ 🛑
          </h3>
        </div>
        {isCameraActive && (
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        )}
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div className="relative aspect-video bg-black/90 rounded-xl border border-white/5 flex flex-col items-center justify-center overflow-hidden">
          {isCameraActive ? (
            <div className="w-full h-full relative flex items-center justify-center bg-black">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
              <button 
                onClick={captureSnapshot}
                className="absolute bottom-4 px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-black uppercase tracking-widest rounded-xl shadow-2xl border border-white/20 cursor-pointer animate-pulse z-20"
              >
                📸 ⚡ SNAPSHOT NOW ⚡ 📸
              </button>
              <button 
                onClick={stopCamera}
                className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-400 hover:text-red-400 font-mono text-[10px] uppercase rounded-lg cursor-pointer z-20"
              >
                🛑 CLOSE
              </button>
            </div>
          ) : image ? (
            <img src={image} alt="Captured evidence" className="w-full h-full object-contain animate-fade-in" />
          ) : (
            <div className="text-center space-y-3 p-4" onDragOver={handleDragOver} onDrop={handleDrop}>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-slate-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0110 3h4a2.31 2.31 0 013.173 3.175m-6.346 0A2.31 2.31 0 0010 6h4a2.31 2.31 0 003.173-2.825M6 9h12a3 3 0 013 3v6a3 3 0 01-3 3H6a3 3 0 01-3-3v-6a3 3 0 013-3z" />
                </svg>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider">Capture visual component evidence or upload document logs</h3>
              <p className="text-[11px] font-mono text-slate-500">PNG, JPG up to 10MB</p>
            </div>
          )}
        </div>

        {/* 📸 HIGH-CONTRAST OPEN LIVE DEVICE CAMERA LENS BUTTON */}
        {!isCameraActive && !image && (
          <button
            onClick={startCamera}
            className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs sm:text-sm font-black uppercase tracking-widest rounded-xl shadow-2xl transition-all duration-200 transform hover:scale-[1.01] flex items-center justify-center gap-2.5 border-2 border-cyan-300/40 cursor-pointer"
          >
            📸 🟢 CLICK TO ACTIVATE LIVE DEVICE CAMERA LENS LOOP 🟢 📸
          </button>
        )}

        {image && (
          <button
            onClick={clearCapturedImage}
            className="w-full py-3 bg-rose-950/40 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-black font-mono text-xs font-black uppercase tracking-widest rounded-xl cursor-pointer transition-all"
          >
            ❌ CLEAR CAPTURED LENS SCAN
          </button>
        )}

      </div>
    </div>
  );
}
