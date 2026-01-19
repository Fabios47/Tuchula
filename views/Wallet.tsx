
import React from 'react';
import { User, Transaction } from '../types';
import { ArrowUpRight, ArrowDownLeft, Shield, Clock, HelpCircle, Wallet as WalletIcon, CheckCircle2, CreditCard, Landmark, Smartphone } from 'lucide-react';

interface WalletProps {
  user: User;
}

const MOCK_TXS: Transaction[] = [
  { id: 'tx1', productId: '1', buyerId: 'b1', sellerId: 's1', amount: 45000, commission: 1350, taxFee: 15, status: 'completed', date: '2023-10-24' },
  { id: 'tx2', productId: '2', buyerId: 'b2', sellerId: 's1', amount: 7500, commission: 225, taxFee: 15, status: 'escrow', date: '2023-10-26' },
  { id: 'tx3', productId: '4', buyerId: 'b3', sellerId: 's1', amount: 1500, commission: 45, taxFee: 15, status: 'pending', date: '2023-10-27' },
];

const Wallet: React.FC<WalletProps> = ({ user }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <header className="bg-blue-900 pt-12 pb-24 px-6 text-white text-center rounded-b-[60px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-800 to-transparent opacity-50"></div>
        <h1 className="text-xl font-black uppercase tracking-widest mb-8 relative z-10">Minha Carteira</h1>
        
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Saldo Total</p>
          <h2 className="text-4xl font-black tracking-tighter">54.000,00 MT</h2>
        </div>
      </header>

      <div className="px-6 -mt-12 relative z-20 space-y-6">
        {/* Balances Breakdown */}
        <div className="bg-white rounded-[40px] shadow-xl p-8 border border-slate-100 flex justify-between divide-x divide-slate-100">
          <div className="flex-1 text-center pr-4">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Disponível</p>
            <p className="font-black text-lg text-emerald-500">46.500 MT</p>
          </div>
          <div className="flex-1 text-center pl-4">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Retido (Escrow)</p>
            <p className="font-black text-lg text-amber-500">7.500 MT</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-emerald-500 text-white font-black py-4 rounded-3xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all">
            <ArrowUpRight size={20} />
            LEVANTAR
          </button>
          <button className="bg-white text-blue-900 font-black py-4 rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center gap-2 active:scale-95 transition-all">
            <WalletIcon size={20} />
            RECARREGAR
          </button>
        </div>

        {/* Payment Methods */}
        <section>
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Métodos de Recebimento</h3>
            <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest">+ Adicionar</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            <MethodCard icon={<Smartphone className="text-emerald-500" />} label="M-Pesa" sub="Principal" active />
            <MethodCard icon={<Landmark className="text-blue-500" />} label="Banco" sub="Saldos Altos" />
            <MethodCard icon={<CreditCard className="text-indigo-500" />} label="Visa" sub="Cartão" />
          </div>
        </section>

        {/* Security Alert */}
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5 flex gap-4">
          <Shield className="text-blue-600 shrink-0" size={24} />
          <div className="text-xs text-blue-800 font-medium leading-relaxed">
            <p className="font-black uppercase text-[10px] mb-1">Proteção Escrow</p>
            <p className="opacity-80">O saldo retido será libertado para a tua conta disponível assim que o comprador confirmar a entrega.</p>
          </div>
        </div>

        {/* Transactions */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">Histórico Financeiro</h3>
            <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ver Tudo</button>
          </div>
          <div className="space-y-3">
            {MOCK_TXS.map(tx => (
              <div key={tx.id} className="bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm border border-slate-100 active:scale-95 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {tx.status === 'completed' ? <ArrowDownLeft size={24} /> : <Clock size={24} />}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-800">Venda #1024-XP</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase">{tx.date} • {tx.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-800">+{tx.amount.toLocaleString()} MT</p>
                  <p className="text-[9px] text-rose-500 font-black uppercase">-Taxa 3%</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const MethodCard: React.FC<{ icon: React.ReactNode, label: string, sub: string, active?: boolean }> = ({ icon, label, sub, active }) => (
  <div className={`min-w-[140px] p-5 rounded-3xl border shadow-sm transition-all active:scale-95 cursor-pointer ${active ? 'bg-white border-emerald-500 ring-2 ring-emerald-50' : 'bg-white border-slate-100'}`}>
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-3">
      {icon}
    </div>
    <p className="text-xs font-black text-slate-800 mb-0.5">{label}</p>
    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{sub}</p>
  </div>
);

export default Wallet;
