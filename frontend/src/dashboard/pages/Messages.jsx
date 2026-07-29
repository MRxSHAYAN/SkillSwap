import React, { useState } from "react";
import { Send, User, Search } from "lucide-react";

export default function Messages() {
  const [activeChat, setActiveChat] = useState("Alex Rivera");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "Alex Rivera", text: "Hey! Excited for our session today.", time: "3:45 PM" },
    { sender: "You", text: "Me too! Ready with Figma questions.", time: "3:48 PM" },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input, time: "Just now" }]);
    setInput("");
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-120px)] bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex overflow-hidden">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-slate-200 p-4 space-y-3 hidden sm:block">
        <h2 className="text-sm font-bold text-slate-900">Conversations</h2>
        <div className="space-y-1">
          {["Alex Rivera", "Sophia Chen"].map((name) => (
            <button
              key={name}
              onClick={() => setActiveChat(name)}
              className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center gap-3 cursor-pointer ${
                activeChat === name ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-800">
                {name[0]}
              </div>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div className="pb-3 border-b border-slate-100 font-bold text-sm text-slate-900">
          Chat with {activeChat}
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === "You" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-xs ${
                  m.sender === "You"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-800 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1">{m.time}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-slate-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white cursor-pointer">
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}