import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Bot, Sparkles } from "lucide-react";
import { Card } from "./card";
import { useLocation } from "react-router-dom";
import AppRoutes from "../../routes/appRouter";

export function Chatbot() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Hide Chatbot on 404 Not Found page
  const isNotFound = !Object.values(AppRoutes).filter(route => route !== "*").includes(location.pathname);
  if (isNotFound) return null;

  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Marko, your AI guide to authentic discovery. How can I help you explore today?", sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // Simple Mock Response
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: "That's a great question! I'm currently in 'Discovery Mode'. Would you like to see our trending reviews or learn more about our verification process?",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999]">
      {/* Chat Window (Visible when isOpen is true) */}
      <div 
        className={`
          absolute bottom-16 right-0 w-[90vw] sm:w-[380px] h-[500px] 
          bg-[#0f172a] border border-white/10 rounded-[2.5rem] 
          shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
          ${isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 translate-y-8 pointer-events-none"}
        `}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-[#007acc] via-[#005f99] to-[#ff8c42] flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20 backdrop-blur-md">
              <Bot size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-black text-white tracking-wide text-sm">Marko</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">AI Support Active</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all text-white shadow-sm border border-white/10 active:scale-90"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Messages Dashboard */}
        <div 
          ref={scrollRef}
          className="p-6 h-[320px] overflow-y-auto space-y-6 scrollbar-hide bg-[#020617]/50"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === "bot" ? "bg-[#007acc]/10 text-[#007acc]" : "bg-white/5 text-slate-400"}`}>
                {msg.sender === "bot" ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`group relative max-w-[75%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm transition-all ${msg.sender === "bot" ? "bg-[#1e293b] text-slate-200 rounded-tl-none" : "bg-[#007acc] text-white rounded-tr-none"}`}>
                {msg.text}
                <span className={`absolute -bottom-5 right-1 text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${msg.sender === "bot" ? "text-slate-500" : "text-[#007acc]"}`}>
                  Delivered • {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interaction Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#0f172a] border-t border-white/5">
          <div className="relative flex items-center gap-3">
            <input 
              id="chatbot-input"
              name="chatbot-message"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => e.preventDefault()}
              placeholder="Ask Marko anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#007acc]/50 transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-12 h-12 bg-gradient-to-br from-[#007acc] to-[#ff8c42] rounded-2xl flex items-center justify-center text-white hover:brightness-110 disabled:opacity-50 disabled:grayscale transition-all active:scale-90 shadow-[0_4px_20px_rgba(0,122,204,0.3)]"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-gradient-to-br from-[#007acc] via-[#005f99] to-[#ff8c42]
          text-white shadow-lg
          hover:shadow-xl hover:brightness-110
          active:scale-95 transition-all duration-300
        "
      >
        <MessageCircle size={28} className="fill-white/10" />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#020617] rounded-full animate-pulse" />
        )}
      </button>
    </div>
  );
}
