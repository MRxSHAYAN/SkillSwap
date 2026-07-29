import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  MessageSquare,
  Send,
  AlertCircle,
  Languages,
  Subtitles,
  StopCircle,
  Sparkles,
  Settings,
  Grid,
} from "lucide-react";

export default function LiveRoom() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [cameraError, setCameraError] = useState("");

  // Live Translation States
  const [isTranslationOn, setIsTranslationOn] = useState(true);
  const [targetLanguage, setTargetLanguage] = useState("Spanish");
  const [activeSubtitle, setActiveSubtitle] = useState(
    "Hola! Estás listo para comenzar la conversación sobre React y UI design?"
  );

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const screenStreamRef = useRef(null);

  const [chatLog, setChatLog] = useState([
    { sender: "Marcus Vance", text: "Hey! Let's get started on the live swap.", time: "4:02 PM" },
    { sender: "You", text: "Awesome! Live video & screen share are ready.", time: "4:03 PM" },
  ]);

  // Request real WebCam Stream on mount
  useEffect(() => {
    async function getCameraStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        mediaStreamRef.current = stream;
        if (videoRef.current && !isScreenSharing) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setCameraError("Camera unavailable");
      }
    }

    getCameraStream();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle Real Screen Sharing
  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        screenStreamRef.current = screenStream;

        if (videoRef.current) {
          videoRef.current.srcObject = screenStream;
        }

        setIsScreenSharing(true);

        screenStream.getVideoTracks()[0].onended = () => {
          stopScreenSharing();
        };
      } catch (err) {
        console.error("Screen sharing error:", err);
      }
    } else {
      stopScreenSharing();
    }
  };

  const stopScreenSharing = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }

    if (videoRef.current && mediaStreamRef.current) {
      videoRef.current.srcObject = mediaStreamRef.current;
    }

    setIsScreenSharing(false);
  };

  // Toggle Video Track
  const toggleVideo = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = isVideoOff;
      }
    }
    setIsVideoOff(!isVideoOff);
  };

  // Toggle Audio Track
  const toggleAudio = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
      }
    }
    setIsMuted(!isMuted);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatLog([
      ...chatLog,
      { sender: "You", text: chatMessage, time: "Just now" },
    ]);
    setChatMessage("");
  };

  return (
    <div className="w-full h-[calc(100vh-90px)] bg-slate-950 rounded-3xl overflow-hidden flex flex-col text-white shadow-2xl relative border border-slate-800">
      
      {/* Top Floating Glass Header */}
      <header className="h-16 px-6 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE SESSION</span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <h2 className="text-sm font-extrabold text-slate-100 tracking-tight">
            SkillSwap Room #1042
          </h2>
        </div>

        {/* Translation Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1.5">
            <button
              onClick={() => setIsTranslationOn(!isTranslationOn)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isTranslationOn
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Languages size={14} />
              <span>{isTranslationOn ? "AI Translation ON" : "AI Translation OFF"}</span>
            </button>

            {isTranslationOn && (
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="bg-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Urdu">Urdu</option>
                <option value="Hindi">Hindi</option>
                <option value="Mandarin">Mandarin</option>
              </select>
            )}
          </div>

          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              showChat
                ? "bg-blue-600/20 border-blue-500 text-blue-400"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageSquare size={16} />
          </button>
        </div>
      </header>

      {/* Main Video & Chat Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 bg-slate-950 p-4 relative flex items-center justify-center">
          
          {/* Main Display Grid */}
          <div className="w-full h-full rounded-2xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden flex items-center justify-center">
            
            {/* Primary Remote Video Feed */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=80"
              alt="Marcus Vance Main Stream"
              className="w-full h-full object-cover"
            />

            {/* Remote Partner Label */}
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-slate-950/70 backdrop-blur-md text-xs font-bold text-slate-200 border border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Marcus Vance (Mentor)
            </div>

            {/* Subtitles Overlay Banner */}
            {isTranslationOn && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-xl w-11/12 px-5 py-3 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-slate-800 text-center shadow-2xl space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-blue-400 font-extrabold tracking-wider uppercase">
                  <Sparkles size={12} /> Live AI Translated ({targetLanguage})
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-100 italic">
                  "{activeSubtitle}"
                </p>
              </div>
            )}
          </div>

          {/* Self Video PIP Window */}
          <div className="absolute bottom-8 right-8 w-48 sm:w-64 h-36 sm:h-44 rounded-2xl bg-slate-900 border-2 border-slate-700/80 shadow-2xl overflow-hidden group">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${
                isScreenSharing ? "" : "transform -scale-x-100"
              } ${isVideoOff && !isScreenSharing ? "hidden" : "block"}`}
            />

            {isVideoOff && !isScreenSharing && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400">
                <VideoOff size={24} />
                <span className="text-[11px] mt-1.5 font-semibold">Camera Off</span>
              </div>
            )}

            {cameraError && !isVideoOff && !isScreenSharing && (
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-slate-900 text-amber-400">
                <AlertCircle size={20} />
                <span className="text-[10px] mt-1">{cameraError}</span>
              </div>
            )}

            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm text-[10px] font-bold text-slate-300 border border-slate-800">
              {isScreenSharing ? "You (Screen)" : "You"} {isMuted && "• Muted"}
            </div>
          </div>
        </div>

        {/* Dynamic Chat Panel */}
        {showChat && (
          <div className="w-80 bg-slate-900/90 backdrop-blur-xl border-l border-slate-800 flex flex-col justify-between p-4 z-10">
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                In-Room Chat
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                2 Live
              </span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {chatLog.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    msg.sender === "You" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-[10px] text-slate-500 mb-0.5">{msg.sender}</span>
                  <div
                    className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs ${
                      msg.sender === "You"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/50"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-0.5">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Send a message..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Floating Modern Control Dock */}
      <footer className="h-20 bg-slate-950 border-t border-slate-900 px-6 flex items-center justify-center gap-3 z-20">
        <button
          onClick={toggleAudio}
          className={`p-3.5 rounded-2xl transition-all cursor-pointer ${
            isMuted
              ? "bg-rose-600 text-white shadow-lg shadow-rose-950/40"
              : "bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
          }`}
          title="Toggle Microphone"
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-3.5 rounded-2xl transition-all cursor-pointer ${
            isVideoOff
              ? "bg-rose-600 text-white shadow-lg shadow-rose-950/40"
              : "bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
          }`}
          title="Toggle Camera"
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>

        <button
          onClick={toggleScreenShare}
          className={`p-3.5 rounded-2xl transition-all cursor-pointer ${
            isScreenSharing
              ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
              : "bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
          }`}
          title="Share Screen"
        >
          {isScreenSharing ? <StopCircle size={20} /> : <Monitor size={20} />}
        </button>

        <div className="h-6 w-px bg-slate-800 mx-1" />

        <button
          onClick={() => window.history.back()}
          className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-rose-950/50 flex items-center gap-2"
        >
          <PhoneOff size={18} />
          <span>Leave Call</span>
        </button>
      </footer>

    </div>
  );
}