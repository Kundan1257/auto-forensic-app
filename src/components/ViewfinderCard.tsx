import React, { RefObject, DragEvent } from "react";
import { Camera, Upload, X, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

interface ViewfinderCardProps {
  image: string | null;
  isCameraActive: boolean;
  isCameraLoading: boolean;
  cameraError: string | null;
  videoRef: RefObject<HTMLVideoElement | null>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  startCamera: () => void;
  stopCamera: () => void;
  captureSnapshot: () => void;
  clearCapturedImage: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
}

export const ViewfinderCard: React.FC<ViewfinderCardProps> = ({
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
  handleDrop,
}) => {
  return (
    <div className="bg-[#0a0c10] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 text-left animate-fade-in relative z-50 my-4">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-black uppercase tracking-widest text-cyan-400 font-mono">
            Optical Multi-Modal Vision & File Scanner
          </h3>
        </div>
        <button 
          onClick={stopCamera}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ERROR BANNER IF ANY */}
      {cameraError && (
        <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-xl flex items-center gap-2.5 text-red-400 text-xs font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* CAPTURED OR UPLOADED IMAGE PREVIEW */}
      {image ? (
        <div className="space-y-3">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-emerald-500/30 bg-black/60">
            <img src={image} alt="Captured specimen" className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> SPECIMEN LOCKED
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={clearCapturedImage}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retake / Upload New
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* OPTION 1: LIVE HARDWARE CAMERA STREAM */}
          <div className="p-4 bg-black/40 border border-white/5 rounded-xl flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden group">
            {isCameraActive ? (
              <div className="w-full space-y-3">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-cyan-500/30">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={captureSnapshot}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                  >
                    Capture Frame
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-3 py-2 rounded-xl bg-white/10 text-slate-300 font-mono text-xs uppercase hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onClick={startCamera}
                className="w-full h-full py-6 flex flex-col items-center justify-center space-y-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 flex items-center justify-center border border-cyan-500/20 transition-all">
                  <Camera className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                    {isCameraLoading ? "Initializing Lens..." : "Live Camera Viewport"}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Click to activate hardware camera lens.</p>
                </div>
              </div>
            )}
          </div>

          {/* OPTION 2: DIRECT GALLERY / DESKTOP PHOTO UPLOAD */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="p-4 bg-cyan-950/20 border border-dashed border-cyan-500/30 hover:border-cyan-400 rounded-xl flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all group shadow-inner"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 transition-all">
              <Upload className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">Upload Part Photo</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Click or drag & drop image file from gallery.</p>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};
