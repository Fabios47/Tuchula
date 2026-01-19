
import React, { useState } from 'react';
import { Phone, Mail, Lock, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { User, UserRole, MOZ_PROVINCES } from '../types';

interface AuthProps {
  onAuthSuccess: (user: User) => void;
  onCancel?: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onCancel }) => {
  const [step, setStep] = useState<'options' | 'details' | 'otp' | 'success'>('options');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    province: MOZ_PROVINCES[4], // Maputo Cidade default
    role: 'both' as UserRole
  });

  const handleComplete = () => {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Utilizador Tuchula',
      email: formData.email,
      phone: formData.phone,
      location: {
        province: formData.province,
        district: 'Urbano'
      },
      role: formData.role,
      isVerified: false,
      isPremium: false,
      score: 100,
      language: 'PT',
      currency: 'MZN',
      wallet: {
        available: 0,
        pending: 0
      }
    };
    onAuthSuccess(mockUser);
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full bg-white text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Conta Criada!</h2>
        <p className="text-slate-500 mt-2 mb-8">Bem-vindo à maior comunidade de compras de Moçambique.</p>
        <button 
          onClick={handleComplete}
          className="w-full bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
        >
          Começar a explorar
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-50 flex flex-col">
      <div className="bg-blue-900 p-8 text-white relative h-64 flex flex-col justify-end">
        {onCancel && (
          <button onClick={onCancel} className="absolute top-8 left-4 p-2 bg-white/10 rounded-full">
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-3xl font-black mb-2">Tuchula</h1>
        <p className="text-blue-200 text-sm">O marketplace moçambicano.</p>
      </div>

      <div className="flex-1 bg-white -mt-10 rounded-t-[40px] p-8 shadow-2xl relative z-10">
        {step === 'options' && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Entrar ou Registar</h2>
            
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="tel" 
                placeholder="+258 84/85/82/86/87 ..." 
                className="w-full bg-slate-50 border-none pl-12 pr-4 py-4 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <button 
              onClick={() => setStep('details')}
              className="bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              Continuar
            </button>

            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-slate-100"></div>
              <span className="text-xs text-slate-400 font-medium">OU</span>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>

            <button className="flex items-center justify-center gap-3 w-full bg-white border border-slate-200 py-4 rounded-2xl text-slate-700 font-medium active:bg-slate-50">
              <Mail size={18} />
              <span>Continuar com Google</span>
            </button>
          </div>
        )}

        {step === 'details' && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Criar sua conta</h2>
            
            <input 
              type="text" 
              placeholder="Nome Completo" 
              className="w-full bg-slate-50 border-none px-4 py-4 rounded-2xl text-sm outline-none"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />

            <input 
              type="email" 
              placeholder="E-mail" 
              className="w-full bg-slate-50 border-none px-4 py-4 rounded-2xl text-sm outline-none"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="Criar senha" 
                className="w-full bg-slate-50 border-none pl-12 pr-4 py-4 rounded-2xl text-sm outline-none"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <select 
              className="w-full bg-slate-50 border-none px-4 py-4 rounded-2xl text-sm outline-none appearance-none"
              value={formData.province}
              onChange={e => setFormData({...formData, province: e.target.value})}
            >
              {MOZ_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Eu quero...</span>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setFormData({...formData, role: 'buyer'})}
                  className={`py-3 rounded-xl border text-xs font-bold transition-all ${formData.role === 'buyer' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-500'}`}
                >
                  Comprar
                </button>
                <button 
                  onClick={() => setFormData({...formData, role: 'seller'})}
                  className={`py-3 rounded-xl border text-xs font-bold transition-all ${formData.role === 'seller' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-500'}`}
                >
                  Vender
                </button>
              </div>
            </div>

            <button 
              onClick={() => setStep('otp')}
              className="bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4"
            >
              Criar Conta
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Verificar Número</h2>
              <p className="text-slate-500 text-sm mt-1">Enviamos um SMS para {formData.phone}</p>
            </div>
            
            <div className="flex justify-center gap-3">
              {[1,2,3,4].map(i => (
                <input 
                  key={i}
                  type="text" 
                  maxLength={1}
                  className="w-12 h-16 bg-slate-100 border-none rounded-xl text-center text-xl font-bold focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button 
              onClick={() => setStep('success')}
              className="bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-lg"
            >
              Confirmar Código
            </button>
            
            <button className="text-blue-600 text-xs font-bold">Reenviar código em 45s</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
