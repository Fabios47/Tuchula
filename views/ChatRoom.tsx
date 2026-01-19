
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, ShieldAlert, PhoneOff, Image as ImageIcon, Info } from 'lucide-react';
import { ChatSession, Message } from '../types';

interface ChatRoomProps {
  session: ChatSession;
  currentUserId: string;
  onClose: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ session, currentUserId, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(session.messages);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Sistema básico de proteção: ocultar números de telefone
    const safeText = inputText.replace(/\b(\d\d\s?){4,}\b/g, "[Número Oculto]");
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      text: safeText,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simular resposta automática em 2 segundos
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: session.participantId,
        text: "Obrigado pelo contacto! O produto ainda está disponível. Como gostaria de proceder com o pagamento via Escrow?",
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 p-4 flex items-center gap-3 sticky top-0 z-30">
        <button onClick={onClose} className="p-1 -ml-1"><ChevronLeft /></button>
        <div className="relative">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-900">
            {session.participantName[0]}
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-slate-900 truncate">{session.participantName}</h3>
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">Vendedor Online</p>
        </div>
        <button className="p-2 text-slate-400"><Info size={20} /></button>
      </header>

      {/* Product Context Context */}
      <div className="bg-blue-900 text-white p-3 flex items-center gap-3 shadow-md">
        <img src={session.productImage} className="w-12 h-12 rounded-lg object-cover border border-white/20" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-blue-200 uppercase font-bold tracking-widest leading-none mb-1">Negociando</p>
          <h4 className="text-xs font-bold truncate">{session.productTitle}</h4>
          <p className="text-xs font-black text-emerald-400">{session.productPrice.toLocaleString()} MT</p>
        </div>
        <button className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-2 rounded-lg shadow-sm">Comprar</button>
      </div>

      {/* Safety Banner */}
      <div className="m-3 p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
        <ShieldAlert className="text-amber-500 shrink-0" size={18} />
        <p className="text-[10px] text-amber-800 leading-tight">
          <b>Segurança Uchtala:</b> Nunca partilhe dados bancários ou números de telefone aqui. Use sempre o sistema de pagamento da plataforma para estar protegido pelo Escrow.
        </p>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                isMe 
                  ? 'bg-blue-900 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
              }`}>
                <p>{msg.text}</p>
                <div className={`text-[9px] mt-1 flex items-center gap-1 ${isMe ? 'text-blue-300' : 'text-slate-400'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {isMe && <div className="w-1 h-1 bg-blue-300 rounded-full"></div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
        <button className="p-2 text-slate-400 bg-slate-50 rounded-xl"><ImageIcon size={20} /></button>
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Escreva uma mensagem..." 
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={handleSendMessage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-900 disabled:text-slate-300"
            disabled={!inputText.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
