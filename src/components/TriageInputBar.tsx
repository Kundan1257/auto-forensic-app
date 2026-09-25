import React, { useState, useRef, useEffect } from "react";
import { Camera, Mic, Square, Send, Image as ImageIcon, Volume2 } from "lucide-react";

interface TriageInputBarProps {
  prompt: string;
  setPrompt: (val: string) => void;
  onSubmit: () => void;
  onOpenScanner: () => void;
  isLoading: boolean;
  hasImage: boolean;
  onAudioRecorded: (base64Audio: string | null) => void;
}

export const TriageInputBar: React.FC<TriageInputBarProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  onOpenScanner,
  isLoading,
  hasImage,
  onAudioRecorded,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [isInlineCameraActive, setIsInlineCameraActive] = useState(false);
  const [inlineCameraError, setInlineCameraError] = useState<string | null>(null);
  const [capturedImageLocal, setCapturedImageLocal] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => { stopInlineCamera(); };
  }, []);

  const startInlineCamera = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setInlineCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      streamRef.current = stream;
      setIsInlineCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }, 80);
    } catch (err) {
      setInlineCameraError("Camera access denied or unavailable.");
    }
  };

  const stopInlineCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsInlineCameraActive(false);
  };

  const captureInlinePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setCapturedImageLocal(dataUrl);
      localStorage.setItem("auto_forensic_appraisal_snapshot", dataUrl);
      onOpenScanner(); 
      stopInlineCamera();
    }
  };

  const startEngineAudioCapture = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            onAudioRecorded(reader.result);
            setAudioBlobUrl(URL.createObjectURL(audioBlob));
            
            // 📡 AUTO-FILL PROMPT TO UNLOCK APPRASIAL ENGINE IMMEDIATELY AFTER SPEAKING
            setPrompt("[Acoustic Audio Diagnostic Telemetry Attached]");
          }
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.start();
      setIsRecording(true);
      
      // ⏳ EXTENDED: Changed from 6 seconds to 25 seconds to support complete voice over prompts!
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          stopEngineAudioCapture();
        }
      }, 25000);
    } catch (err) {
      alert("Microphone access denied.");
      setIsRecording(false);
    }
  };

  const stopEngineAudioCapture = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="bg-[#0e1218] border border-cyan-500/30 rounded-2xl p-3 sm:p-4 shadow-2xl space-y-3 text-left">
      
      {/* LOCALIZED INLINE VIDEO VIEWPORT (MOUNTED SEQUENTIALLY ABOVE INPUT BAR) */}
      {isInlineCameraActive && (
        <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-black h-[160px] w-full animate-fade-in mb-2 shadow-inner">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 px-3">
            <button
              type="button"
              onClick={captureInlinePhoto}
              className="px-3 py-1.5 rounded-md bg-cyan-500 text-slate-950 font-mono font-black text-[9px] uppercase tracking-wider shadow-lg flex items-center gap-1 hover:bg-cyan-400 transition-all cursor-pointer"
            >
              <Camera className="w-3 h-3" /> Capture Component Frame
            </button>
            <button
              type="button"
              onClick={stopInlineCamera}
              className="px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-mono text-[9px] uppercase border border-white/10 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {inlineCameraError && (
        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-mono text-center mb-1">
          {inlineCameraError}
        </div>
      )}

      {/* ATTACHMENT BADGES ROW */}
      {(hasImage || capturedImageLocal || audioBlobUrl) && (
        <div className="flex flex-wrap gap-2 items-center pb-2 border-b border-white/5">
          {(hasImage || capturedImageLocal) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase">
              <ImageIcon className="w-3 h-3" /> Specimen Image Attached
            </span>
          )}
          {audioBlobUrl && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold uppercase">
              <Volume2 className="w-3 h-3 animate-pulse" /> Engine Acoustic Audio Locked
            </span>
          )}
        </div>
      )}

    </div>
  );
};
