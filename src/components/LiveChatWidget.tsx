import React, { useState, useRef, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  PhoneCall, 
  Clock, 
  CheckCheck,
  Minimize2,
  Smile
} from 'lucide-react';

export const LiveChatWidget: React.FC = () => {
  const { 
    isChatOpen, 
    toggleChat, 
    chatMessages, 
    sendMessage, 
    isSupportTyping 
  } = useResort();

  const [inputVal, setInputVal] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'How do we get to Sipalay from Bacolod?',
    'What time is the sunset bonfire?',
    'Can we book an island hopping tour to Tinagong Dagat?',
    'Are pets allowed at Alon Aninag?'
  ];

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen, isSupportTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal.trim());
    setInputVal('');
  };

  const handleQuickClick = (q: string) => {
    sendMessage(q);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Launcher Button */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="relative group p-4 rounded-full bg-[#2C241D] hover:bg-[#1E1712] text-white shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-[#E4A853] flex items-center gap-2"
          aria-label="Open 24/7 Live Concierge Chat"
        >
          <MessageCircle className="w-6 h-6 text-[#E4A853]" />
          <span className="hidden sm:inline text-xs font-bold tracking-wide pr-1">
            Chat with Sipalay Concierge
          </span>
          {/* Active status pulse */}
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2A9D8F] border-2 border-white flex items-center justify-center text-[9px] font-bold">
            1
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isChatOpen && (
        <div className="bg-white rounded-3xl w-[360px] sm:w-[400px] h-[540px] max-h-[85vh] shadow-2xl border border-[#E0D5C1] flex flex-col overflow-hidden animate-fadeIn">
          {/* Chat Header */}
          <div className="p-4 bg-linear-to-r from-[#2C241D] to-[#3B2F23] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#E4A853] text-[#2C241D] flex items-center justify-center font-bold text-base shadow-xs">
                  🌊
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#2A9D8F] border-2 border-[#2C241D]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold flex items-center gap-1.5">
                  <span>Alon Concierge</span>
                  <span className="text-[10px] font-sans font-normal text-[#E4A853] bg-white/10 px-1.5 py-0.2 rounded">Live</span>
                </h4>
                <p className="text-[11px] text-[#DDD0B9]">
                  Poblacion Beach • Sipalay Support
                </p>
              </div>
            </div>

            <button
              onClick={toggleChat}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ Suggestion Bar */}
          <div className="p-2.5 bg-[#FAF7F2] border-b border-[#E8DFC8] flex items-center gap-1.5 overflow-x-auto text-[11px] text-[#6B5A48] select-none">
            <Sparkles className="w-3.5 h-3.5 text-[#C88A32] shrink-0" />
            <span className="font-semibold shrink-0 text-[#8C7B68]">Ask:</span>
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickClick(q)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-[#F3EDE2] border border-[#DDD0B9] text-[#2C241D] whitespace-nowrap transition cursor-pointer text-[10px] font-medium shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message History Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF7F2]">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#2C241D] text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-[#2C241D] rounded-bl-xs border border-[#E5DAC4] shadow-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-[#8C7B68] px-1">
                    <span>{msg.timestamp}</span>
                    {isUser && <CheckCheck className="w-3 h-3 text-[#2A9D8F]" />}
                  </div>
                </div>
              );
            })}

            {/* Support Typing Indicator */}
            {isSupportTyping && (
              <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-2xl rounded-bl-xs border border-[#E5DAC4] w-20 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C88A32] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C88A32] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C88A32] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E8DFC8] flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about Sipalay or your stay..."
              className="flex-1 px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-xs text-[#2C241D] focus:outline-none focus:border-[#C88A32]"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-xl bg-[#C88A32] hover:bg-[#B87A24] disabled:opacity-50 text-white transition shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
