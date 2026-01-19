
import React from 'react';
import { Facebook, Instagram, Twitter, ShieldCheck, HelpCircle, PhoneCall } from 'lucide-react';

interface FooterProps {
  onOpenInfo: (type: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenInfo }) => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8 px-6 mt-12 rounded-t-[40px]">
      <div className="space-y-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-900 text-2xl font-black italic">T</span>
          </div>
          <h2 className="text-xl font-black tracking-tighter">Tuchula</h2>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-2 px-8">
            O primeiro ecossistema de comércio seguro em Moçambique, protegendo compradores e vendedores através de tecnologia Escrow.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-4">
          <div className="space-y-3">
            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Plataforma</h4>
            <ul className="text-xs text-slate-300 space-y-2 font-medium">
              <li onClick={() => onOpenInfo('about')} className="cursor-pointer active:text-white">Sobre Nós</li>
              <li onClick={() => onOpenInfo('faq')} className="cursor-pointer active:text-white">Como Funciona</li>
              <li onClick={() => onOpenInfo('contacts')} className="cursor-pointer active:text-white">Suporte 24/7</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Legal</h4>
            <ul className="text-xs text-slate-300 space-y-2 font-medium">
              <li onClick={() => onOpenInfo('terms')} className="cursor-pointer active:text-white">Termos de Uso</li>
              <li onClick={() => onOpenInfo('privacy')} className="cursor-pointer active:text-white">Privacidade</li>
              <li onClick={() => onOpenInfo('legal')} className="cursor-pointer active:text-white">Responsabilidade</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 text-center">
          <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Pagamentos Seguros</h4>
          <div className="flex justify-center gap-3 grayscale opacity-60">
            {['M-Pesa', 'M-Mola', 'e-Mola', 'm-Cash'].map((p) => (
              <div key={p} className="bg-white/5 px-2 py-1 rounded-md text-[8px] font-bold border border-white/10 uppercase">{p}</div>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center gap-6">
          <div className="flex gap-6 text-slate-400">
            <Facebook size={20} className="hover:text-blue-500 transition-colors" />
            <Instagram size={20} className="hover:text-pink-500 transition-colors" />
            <Twitter size={20} className="hover:text-sky-400 transition-colors" />
          </div>
          
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-tighter">100% Protegido em Moçambique</span>
          </div>

          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Tuchula MarketPlace. Todos direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
