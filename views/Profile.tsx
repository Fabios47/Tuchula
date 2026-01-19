
import React from 'react';
import { 
  User as UserIcon, 
  LogOut, 
  ChevronRight, 
  Settings, 
  Package, 
  Heart, 
  Star, 
  ShieldCheck, 
  CreditCard, 
  MessageSquareText, 
  ShoppingBag,
  LayoutList,
  BarChart3,
  Wallet,
  ShieldAlert,
  Info,
  HelpCircle,
  PhoneCall,
  FileText,
  Globe,
  Scale,
  Receipt
} from 'lucide-react';
import { User } from '../types';
import { InfoPageType } from './InfoView';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onOpenMessages: () => void;
  onOpenKYC: () => void;
  onOpenInfo: (type: InfoPageType) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onOpenMessages, onOpenKYC, onOpenInfo }) => {
  const isSeller = user.role === 'seller' || user.role === 'both';

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[40px] shadow-sm border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <img 
              src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1e3a8a&color=fff`} 
              className="w-20 h-20 rounded-full border-4 border-slate-50 shadow-md object-cover transition-transform group-active:scale-95"
              alt={user.name}
            />
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                <ShieldCheck size={14} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 truncate">{user.name}</h2>
              {user.isPremium && (
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase">PRO</span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">{user.location.province}, Moçambique</p>
            
            <div className="flex items-center gap-3 mt-2">
              <div className="flex flex-col">
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Confiança</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600">88</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-50">
          <Stat label="Pedidos" value="12" />
          <Stat label="Seguidores" value={isSeller ? "2.4k" : "-"} />
          <Stat label="Avaliação" value="4.9" />
        </div>
      </div>

      <div className="p-6 space-y-8">
        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4 px-2">Gestão de Conta</h3>
          <div className="bg-white rounded-[28px] shadow-sm border border-slate-100 overflow-hidden">
            <MenuItem icon={<ShoppingBag className="text-blue-500" size={20} />} label="Minhas Compras" />
            <Divider />
            <MenuItem icon={<Heart className="text-rose-500" size={20} />} label="Favoritos" />
            <Divider />
            <MenuItem icon={<Globe className="text-indigo-500" size={20} />} label="Idioma: Português" />
          </div>
        </section>

        {isSeller && (
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4 px-2">Negócios & Fiscal</h3>
            <div className="bg-white rounded-[28px] shadow-sm border border-slate-100 overflow-hidden">
              <MenuItem icon={<LayoutList className="text-emerald-500" size={20} />} label="Gerir Catálogo" />
              <Divider />
              <MenuItem icon={<Wallet className="text-orange-500" size={20} />} label="Carteira (Vendas)" />
              <Divider />
              <MenuItem onClick={() => onOpenInfo('fiscal')} icon={<Receipt className="text-slate-500" size={20} />} label="Relatórios e Recibos" />
            </div>
          </section>
        )}

        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4 px-2">Suporte & Jurídico</h3>
          <div className="bg-white rounded-[28px] shadow-sm border border-slate-100 overflow-hidden">
            <MenuItem onClick={() => onOpenInfo('contacts')} icon={<PhoneCall className="text-emerald-500" size={20} />} label="Apoio ao Cliente" />
            <Divider />
            <MenuItem onClick={() => onOpenInfo('legal')} icon={<Scale className="text-rose-500" size={20} />} label="Responsabilidade Legal" />
            <Divider />
            <MenuItem onClick={() => onOpenInfo('faq')} icon={<HelpCircle className="text-blue-500" size={20} />} label="Ajuda (FAQ)" />
          </div>
        </section>

        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-5 bg-rose-50 rounded-[28px] text-rose-600 font-black text-sm active:scale-95 transition-all mb-8 shadow-sm"
        >
          <LogOut size={20} />
          <span>Sair da Conta</span>
        </button>

        <div className="text-center pb-10">
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">Tuchula Moçambique • v2.0.1</p>
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="text-center">
    <p className="text-lg font-black text-slate-800 leading-none">{value}</p>
    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 tracking-tighter">{label}</p>
  </div>
);

const Divider = () => <div className="h-px bg-slate-50 ml-16" />;

const MenuItem: React.FC<{ icon: React.ReactNode, label: string, onClick?: () => void, badge?: string }> = ({ icon, label, onClick, badge }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-5 active:bg-slate-50 transition-colors text-left group"
  >
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center group-active:scale-90 transition-transform">
        {icon}
      </div>
      <span className="text-[13px] font-bold text-slate-700 tracking-tight">{label}</span>
    </div>
    <div className="flex items-center gap-3">
      {badge && (
        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-md">
          {badge}
        </span>
      )}
      <ChevronRight size={16} className="text-slate-300" />
    </div>
  </button>
);

export default Profile;
