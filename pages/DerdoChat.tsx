
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, MessageSquare, Trash2, ChevronLeft } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Link } from 'react-router-dom';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const DerdoChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Përshëndetje! Unë jam Derdo, asistenti yt inteligjent nga Vizioni Rinor i Shalës. Si mund të të ndihmoj sot me informacion rreth projekteve tona apo vullnetarizmit?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: messages.concat({ role: 'user', text: userMessage }).map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "Ju jeni Derdo, një asistent inteligjent për organizatën VRSH (Vizioni Rinor i Shalës) në fshatin Shalë, Lipjan. Qëllimi juaj është të ndihmoni të rinjtë të informohen për projektet si 'Akademia Digjitale', t'u tregoni si të aplikojnë për vullnetarizëm dhe t'i frymëzoni për aktivizëm qytetar. Përgjigjuni gjithmonë në gjuhën shqipe, jini miqësor, pozitiv dhe përdorni terma që lidhen me rininë dhe teknologjinë.",
          temperature: 0.7,
        }
      });

      const botResponse = response.text || "Më falni, kam një problem teknik. Ju lutem provoni përsëri.";
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Ndodhi një gabim gjatë lidhjes me trurin tim artificial. Kontrolloni internetin!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'model', text: 'Chat-i u fshi. Si mund të të ndihmoj nga fillimi?' }]);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col h-[80vh] bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 bg-brand-dark text-white flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-tr from-brand-pink to-brand-orange rounded-2xl flex items-center justify-center shadow-lg">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-lime border-2 border-brand-dark rounded-full"></div>
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Derdo AI</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asistenti i VRSH</p>
            </div>
          </div>
          <button onClick={clearChat} className="p-3 text-slate-400 hover:text-red-400 transition-colors">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-slate-50/30 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-pink ml-3' : 'bg-brand-dark mr-3'}`}>
                  {msg.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                </div>
                <div className={`p-5 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-pink text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="flex items-center space-x-2 bg-white p-4 rounded-full border border-slate-100 shadow-sm">
                <div className="w-2 h-2 bg-brand-pink rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-brand-lime rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Pyet Derdon për projektet, vullnetarizmin..."
              className="w-full pl-8 pr-20 py-5 bg-slate-50 border border-slate-200 rounded-full outline-none focus:ring-2 focus:ring-brand-pink font-bold text-sm transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-4 bg-brand-dark text-white rounded-full hover:bg-brand-pink transition-all shadow-lg disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-center mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center">
            <Sparkles className="h-3 w-3 mr-2 text-brand-orange" />
            Mundësuar nga Inteligjenca Artificiale e VRSH
          </p>
        </div>
      </div>
    </div>
  );
};

export default DerdoChat;
