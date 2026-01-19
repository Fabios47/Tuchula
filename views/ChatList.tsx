
import React from 'react';
import { Search, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { ChatSession } from '../types';

interface ChatListProps {
  onChatSelect: (session: ChatSession) => void;
}

const MOCK_CHATS: ChatSession[] = [
  {
    id: 'chat_1',
    participantId: 's1',
    participantName: 'Loja do Carlos',
    productId: '1',
    productTitle: 'iPhone 13 Pro Max - 256GB',
    productPrice: 45000,
    productImage: 'https://picsum.photos/seed/iphone/100/100',
    lastMessageSnippet: 'Ainda está disponível? Podemos fechar hoje.',
    lastMessageTimestamp: '2023-10-27T14:30:00Z',
    messages: []
  },
  {
    id: 'chat_2',
    participantId: 's2',
    participantName: 'Mário Vendas',
    productId: '2',
    productTitle: 'Sapatilhas Nike Air Force 1',
    productPrice: 7500,
    productImage: 'https://picsum.photos/seed/nike/100/100',
    lastMessageSnippet: 'Qual é o tamanho disponível?',
    lastMessageTimestamp: '2023-10-26T09:15:00Z',
    messages: []
  }
];

const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-blue-900 p-6 pt-12 text-white rounded-b-[40px] shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Mensagens</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Procurar conversas..." 
            className="w-full bg-white/10 border-white/20 text-white placeholder-blue-200 pl-10 pr-4 py-3 rounded-2xl text-sm outline-none backdrop-blur-sm focus:bg-white focus:text-slate-900 transition-all"
          />
        </div>
      </header>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="text-emerald-500" size={16} />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conversas Seguras Ativas</span>
        </div>

        {MOCK_CHATS.length > 0 ? (
          <div className="space-y-3">
            {MOCK_CHATS.map((chat) => (
              <button 
                key={chat.id} 
                onClick={() => onChatSelect(chat)}
                className="w-full bg-white p-4 rounded-2xl flex items-center gap-4 border border-slate-100 shadow-sm active:scale-95 transition-transform text-left"
              >
                <div className="relative shrink-0">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-900 text-lg">
                    {chat.participantName[0]}
                  </div>
                  <img src={chat.productImage} className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md border-2 border-white object-cover shadow-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-800 truncate">{chat.participantName}</h3>
                    <span className="text-[9px] text-slate-400 font-medium">14:30</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium truncate mb-1">{chat.productTitle}</p>
                  <p className="text-[11px] text-slate-400 truncate italic">"{chat.lastMessageSnippet}"</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <MessageSquare size={48} className="opacity-20 mb-4" />
            <p className="font-bold">Nenhuma conversa ativa</p>
            <p className="text-xs">Inicie um chat a partir de qualquer produto.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
