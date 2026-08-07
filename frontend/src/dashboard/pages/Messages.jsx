import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  Search,
  Lock,
  Copy,
  Check,
  X,
  Shield,
  Video,
  ArrowLeft,
} from "lucide-react";

export default function Messages() {
  const [activeChat, setActiveChat] = useState("Alex Rivera");
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Tracks active view on mobile: 'list' (shows users) or 'chat' (shows conversation)
  const [mobileView, setMobileView] = useState("list");

  const [messages, setMessages] = useState({
    "Alex Rivera": [
      { sender: "Alex Rivera", text: "Hey! Excited for our session today.", time: "3:45 PM" },
      { sender: "You", text: "Me too! Ready with Figma questions.", time: "3:48 PM" },
    ],
    "Sophia Chen": [
      { sender: "Sophia Chen", text: "Did you review the React components?", time: "Yesterday" },
    ],
  });

  const users = [
    { name: "Alex Rivera", role: "UI/UX Designer", online: true, unread: 0 },
    { name: "Sophia Chen", role: "Frontend Dev", online: false, unread: 1 },
  ];

  const currentMessages = messages[activeChat] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages({
      ...messages,
      [activeChat]: [
        ...currentMessages,
        { sender: "You", text: input, time: "Just now" },
      ],
    });
    setInput("");
  };

  const handleSelectUser = (userName) => {
    setActiveChat(userName);
    setMobileView("chat"); // Switch view on mobile when user is tapped
  };

  const roomLink = `${window.location.origin}/dashboard/room`;

  const copyRoomLink = () => {
    navigator.clipboard.writeText(roomLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-80px)] sm:h-[calc(100vh-120px)] bg-white rounded-none sm:rounded-3xl border-0 sm:border border-zinc-200/80 shadow-none sm:shadow-sm flex overflow-hidden relative">
      {/* SIDEBAR: CONVERSATION LIST */}
      <div
        className={`${
          mobileView === "list" ? "flex" : "hidden"
        } sm:flex w-full sm:w-80 md:w-96 border-r border-zinc-200 flex-col bg-zinc-50/50 h-full`}
      >
        {/* Sidebar Header & Search */}
        <div className="p-3 sm:p-4 border-b border-zinc-200/80 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-zinc-900">Direct Messages</h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              {users.length} Active
            </span>
          </div>
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-100 border border-transparent text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {users
            .filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((user) => {
              const isActive = activeChat === user.name;
              return (
                <button
                  key={user.name}
                  onClick={() => handleSelectUser(user.name)}
                  className={`w-full text-left p-2.5 sm:p-3 rounded-2xl transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-white shadow-sm border border-zinc-200/80 text-zinc-900"
                      : "hover:bg-zinc-100/80 text-zinc-600"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm shadow-blue-500/20">
                        {user.name[0]}
                      </div>
                      {user.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-zinc-900 truncate">
                        {user.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  {user.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {user.unread}
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div
        className={`${
          mobileView === "chat" ? "flex" : "hidden"
        } sm:flex flex-1 flex-col bg-white h-full`}
      >
        {/* Chat Header */}
        <div className="p-3 sm:p-4 border-b border-zinc-200 flex items-center justify-between bg-white z-10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Back button visible only on mobile view */}
            <button
              onClick={() => setMobileView("list")}
              className="sm:hidden p-1.5 -ml-1 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Back to contacts list"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
              {activeChat[0]}
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 leading-tight truncate">
                {activeChat}
              </h3>
              <p className="text-[9px] sm:text-[10px] text-emerald-600 font-medium flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
                Active Swap Session
              </p>
            </div>
          </div>

          {/* Private Room Action via Link */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowRoomModal(true)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm shadow-blue-600/20 cursor-pointer active:scale-95"
            >
              <Lock size={13} />
              <span className="hidden xs:inline sm:inline">Private Room</span>
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-zinc-50/30">
          {currentMessages.map((m, idx) => {
            const isMe = m.sender === "You";
            return (
              <div
                key={idx}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-xs"
                      : "bg-white border border-zinc-200/80 text-zinc-800 rounded-bl-xs"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-zinc-400 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Message Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-2.5 sm:p-4 border-t border-zinc-200 bg-white flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${activeChat}...`}
            className="flex-1 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-zinc-100 border border-transparent text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 sm:p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-all shadow-md shadow-blue-600/20 cursor-pointer active:scale-95 shrink-0"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* PRIVATE ROOM MODAL */}
      {showRoomModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-zinc-200 max-w-sm w-full p-5 sm:p-6 shadow-2xl space-y-4 sm:space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                <Shield size={18} className="text-blue-600" />
                <span>Private Swap Room</span>
              </div>
              <button
                onClick={() => setShowRoomModal(false)}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-full cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                <Video size={22} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-zinc-900">
                Ready to start 1-on-1?
              </h4>
              <p className="text-xs text-zinc-500">
                Launch an encrypted, private room with <strong>{activeChat}</strong>.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Room Access Link
              </label>
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl p-2">
                <input
                  type="text"
                  readOnly
                  value={roomLink}
                  className="bg-transparent text-xs text-zinc-700 flex-1 outline-none px-1 truncate"
                />
                <button
                  onClick={copyRoomLink}
                  className="px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowRoomModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 font-bold text-xs hover:bg-zinc-50 transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <Link
                to="/dashboard/room"
                onClick={() => setShowRoomModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm shadow-blue-600/20 text-center cursor-pointer"
              >
                Enter Room
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}