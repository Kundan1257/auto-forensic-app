import React, { useState, useRef } from "react";
import { Camera, Mic, Square, Send, Image as ImageIcon, Volume2, AlertCircle } from "lucide-react";

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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Start 5-Second Engine Audio Recording
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
          }
        };
        reader.readAsDataURL(audioBlob);
        // Stop all microphone tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);

      // Auto-stop after 6 seconds of running engine sound
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          stopEngineAudioCapture();
        }
      }, 6000);
    } catch (err) {
      alert("Microphone access denied or unavailable in this browser context.");
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
      {/* ATTACHMENT BADGES ROW */}
      {(hasImage || audioBlobUrl) && (
        <div className="flex flex-wrap gap-2 items-center pb-2 border-b border-white/5">
          {hasImage && (
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

      {/* UNIFIED INPUT CONTROLLER STRIP */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <div className="flex items-center gap-1.5 shrink-0">
          {/* CAMERA / UPLOAD TRIGGER BUTTON */}
          <button
            onClick={onOpenScanner}
            className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              hasImage 
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" 
                : "bg-white/5 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
            }`}
            title="Snap or Upload Engine Part Photo"
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs font-mono font-bold hidden md:inline">Part Scan</span>
          </button>

          {/* ENGINE ACOUSTIC MICROPHONE RECORD BUTTON */}
          <button
            onClick={isRecording ? stopEngineAudioCapture : startEngineAudioCapture}
            className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isRecording
                ? "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse"
                : audioBlobUrl
                ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                : "bg-white/5 hover:bg-blue-500/20 text-blue-400 border-blue-500/30"
            }`}
            title="Record Running Engine Sound (Squeal/Knock)"
          >
            {isRecording ? <Square className="w-5 h-5 fill-red-400" /> : <Mic className="w-5 h-5" />}
            <span className="text-xs font-mono font-bold hidden md:inline">
              {isRecording ? "Listening..." : "Engine Sound"}
            </span>
          </button>
        </div>

        {/* TEXT SYMPTOM / OBD2 CODE PROMPT INPUT BOX */}
        <div className="relative flex-1">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && onSubmit()}
            placeholder="Type symptoms (e.g. squealing at start) or OBD2 codes (P0300)..."
            className="w-full bg-black/60 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none font-sans transition-colors pr-12"
          />
          
          {/* SEND DISPATCH BUTTON */}
          <button
            onClick={onSubmit}
            disabled={isLoading || (!prompt.trim() && !hasImage)}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
