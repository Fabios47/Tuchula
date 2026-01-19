
import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle, Info, Calculator, Truck, ChevronRight, Zap, Trophy, Package, LayoutGrid, Clock, ShieldCheck, Plus, Star } from 'lucide-react';
import { User, MOZ_PROVINCES } from '../types';
import { COMMISSION_RATE } from '../constants';

interface SellProps {
  user: User;
  onOpenKYC: () => void;
}

const SHIPPING_PARTNERS = [
  "Nagi", "City Link", "Correios de Moçambique", "Portador Diário", "FedEx", "DHL", "Entrega em Mãos"
];

const Sell: React.FC<SellProps> = ({ user, onOpenKYC }) => {
  const [view, setView] = useState<'dashboard' | 'create'>('dashboard');
  const [isSponsored, setIsSponsored] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Eletrónicos',
    condition: 'new',
    location: user.location.province,
    shippingMethod: SHIPPING_PARTNERS[0]
  });

  const priceNum = parseFloat(formData.price) || 0;
  const commission = priceNum * COMMISSION_RATE;
  const sponsorshipFee = isSponsored ? 500 : 0;
  const netAmount = priceNum - commission - sponsorshipFee;

  if (view === 'create') {
    return (
      <div className="bg-slate-50 min-h-screen p-6 pb-32 animate-in slide-in-from-right duration-300">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('dashboard')} className="p-2 bg-white rounded-xl shadow-sm"><ChevronRight className="rotate-180" /></button>
          <h1 className="text-2xl font-black text-slate-800">Novo Anúncio</h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Fotos do Produto</label>
            <div className="grid grid-cols-3 gap-4">
              <button className="aspect-square bg-white border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 gap-2 active:bg-blue-50 transition-colors">
                <Camera size={28} />
                <span className="text-[10px] font-black uppercase">Add</span>
              </button>
              <div className="aspect-square bg-slate-100 rounded-3xl animate-pulse"></div>
              <div className="aspect-square bg-slate-100 rounded-3xl animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Detalhes</label>
            <input 
              type="text" 
              placeholder="Ex: iPhone 14 Pro Max" 
              className="w-full bg-white border border-slate-100 p-5 rounded-3xl text-sm outline-none shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            <textarea 
              placeholder="Descrição completa do estado e extras..." 
              rows={4}
              className="w-full bg-white border border-slate-100 p-5 rounded-3xl text-sm outline-none shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
            <div className="relative">
              <input 
                type="number" 
                placeholder="Preço em MT" 
                className="w-full bg-blue-900 text-white placeholder-blue-300 p-5 rounded-3xl text-lg outline-none shadow-xl font-black"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-400 font-black">MT</div>
            </div>

            {priceNum > 0 && (
              <div className="bg-slate-900 p-6 rounded-[32px] text-white space-y-3 animate-in fade-in duration-300">
                <div className="flex justify-between text-xs opacity-60">
                  <span>Comissão Tuchula (3%)</span>
                  <span className="font-bold">-{commission.toLocaleString()} MT</span>
                </div>
                {isSponsored && (
                  <div className="flex justify-between text-xs opacity-60">
                    <span>Anúncio Patrocinado</span>
                    <span className="font-bold">-500 MT</span>
                  </div>
                )}
                <div className="flex justify-between text-base pt-3 border-t border-white/10 font-black text-emerald-400">
                  <span>Receberás</span>
                  <span>{netAmount.toLocaleString()} MT</span>
                </div>
              </div>
            )}
          </div>

          <button className="w-full bg-emerald-500 text-white font-black py-5 rounded-[32px] shadow-2xl flex items-center justify-center gap-3 mt-4 active:scale-95 transition-all">
            <CheckCircle size={24} />
            PUBLICAR AGORA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <header className="bg-blue-900 p-8 pt-12 text-white rounded-b-[50px] shadow-xl">
        <h1 className="text-2xl font-black mb-2">Painel do Vendedor</h1>
        <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">Gestão de Negócios</p>
        
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-md">
            <p className="text-[10px] text-blue-200 font-black uppercase mb-1">Total de Vendas</p>
            <p className="text-xl font-black">128.500 MT</p>
          </div>
          <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-md">
            <p className="text-[10px] text-blue-200 font-black uppercase mb-1">Avaliação</p>
            <p className="text-xl font-black text-amber-400 flex items-center gap-1">4.9 <Star size={16} className="fill-amber-400" /></p>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {!user.isVerified && (
          <div className="bg-amber-50 border border-amber-100 p-5 rounded-[32px] flex gap-4 animate-card">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0"><ShieldCheck size={24} /></div>
            <div>
              <p className="text-xs font-black text-amber-800 uppercase tracking-widest mb-1">Verificação KYC Pendente</p>
              <p className="text-[10px] text-amber-700 leading-relaxed mb-3">Verifica a tua identidade para libertares o limite de vendas e obteres o selo de confiança.</p>
              <button onClick={onOpenKYC} className="bg-amber-600 text-white text-[9px] font-black px-4 py-2 rounded-lg uppercase tracking-widest">Verificar Agora</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <ActionCard 
            onClick={() => setView('create')}
            icon={<Plus className="text-blue-600" size={28} />} 
            label="Criar Anúncio" 
            sub="Novo Produto" 
          />
          <ActionCard 
            icon={<Package className="text-emerald-500" size={28} />} 
            label="Meus Anúncios" 
            sub="Gerir 12 itens" 
          />
          <ActionCard 
            icon={<Clock className="text-amber-500" size={28} />} 
            label="Vendas em Curso" 
            sub="3 pendentes" 
          />
          <ActionCard 
            icon={<LayoutGrid className="text-indigo-500" size={28} />} 
            label="Estatísticas" 
            sub="Ver evolução" 
          />
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-6 rounded-[40px] text-white shadow-xl relative overflow-hidden group active:scale-95 transition-all">
          <div className="relative z-10">
            <h3 className="font-black text-lg flex items-center gap-2">
              <Trophy size={20} className="text-amber-400" />
              Upgrade Premium
            </h3>
            <p className="text-[10px] text-blue-200 mt-2 max-w-[80%] font-medium leading-relaxed opacity-80">
              Vendedores Premium pagam apenas <b>2%</b> de comissão e têm destaque automático em todas as pesquisas.
            </p>
            <button className="mt-5 bg-amber-400 text-blue-900 text-[10px] font-black py-3 px-8 rounded-full uppercase tracking-widest shadow-lg">Descobrir Vantagens</button>
          </div>
          <Zap className="absolute -right-8 -bottom-8 text-white/5 w-40 h-40" />
        </div>
      </div>
    </div>
  );
};

const ActionCard: React.FC<{ icon: React.ReactNode, label: string, sub: string, onClick?: () => void }> = ({ icon, label, sub, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-start gap-3 active:scale-95 transition-all text-left"
  >
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-xs font-black text-slate-800 tracking-tight">{label}</p>
      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{sub}</p>
    </div>
  </button>
);

export default Sell;
