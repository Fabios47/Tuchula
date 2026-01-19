
import React, { useState } from 'react';
import { ChevronLeft, Camera, ShieldCheck, CreditCard, UserCheck, Smartphone, CheckCircle2, Info } from 'lucide-react';

interface KYCVerificationProps {
  onClose: () => void;
  onComplete: () => void;
}

const KYCVerification: React.FC<KYCVerificationProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phone, setPhone] = useState('');

  const nextStep = () => setStep((prev) => (prev + 1) as any);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-900">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-4">Torne-se um Vendedor Verificado</h2>
            <p className="text-slate-500 text-center mb-8 leading-relaxed">
              Para garantir a segurança de todos os utilizadores, solicitamos uma verificação rápida de identidade antes de começar a vender.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0"><UserCheck size={20} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Identidade</p>
                  <p className="text-xs text-slate-500">Documento de identificação válido (BI ou Direta).</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0"><CreditCard size={20} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Pagamentos</p>
                  <p className="text-xs text-slate-500">Número de Mobile Money para receber as suas vendas.</p>
                </div>
              </div>
            </div>
            <button onClick={nextStep} className="w-full bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-lg">Iniciar Agora</button>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-2">1. Documento de Identidade</h2>
            <p className="text-sm text-slate-500 mb-6">Tire uma foto nítida da frente do seu Bilhete de Identidade ou Carta de Condução.</p>
            
            <div className="aspect-[3/2] bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-4 mb-8 relative overflow-hidden group active:bg-slate-200 transition-colors cursor-pointer">
              <Camera size={48} className="text-slate-400" />
              <span className="text-sm font-bold text-slate-500">Frente do Documento</span>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white font-bold text-sm">Abrir Câmara</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 mb-8">
              <Info className="text-blue-600 shrink-0" size={18} />
              <p className="text-[11px] text-blue-800 leading-tight">Certifique-se de que todos os dados estão legíveis e não há reflexos na foto.</p>
            </div>

            <button onClick={nextStep} className="w-full bg-blue-900 text-white font-bold py-4 rounded-2xl">Próximo Passo</button>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">2. Prova de Vida</h2>
            <p className="text-sm text-slate-500 mb-8">Tire uma selfie segurando o seu documento próximo ao rosto.</p>
            
            <div className="w-64 h-64 bg-slate-100 rounded-full mx-auto border-4 border-white shadow-xl flex flex-col items-center justify-center gap-4 mb-8 relative overflow-hidden active:scale-95 transition-transform cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
              <Camera size={40} className="text-slate-400 relative z-10" />
              <span className="text-xs font-bold text-slate-500 relative z-10">Sorria para a Foto</span>
            </div>

            <button onClick={nextStep} className="w-full bg-blue-900 text-white font-bold py-4 rounded-2xl">Confirmar Selfie</button>
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-2">3. Dados de Pagamento</h2>
            <p className="text-sm text-slate-500 mb-8">Onde deseja receber o dinheiro das suas vendas?</p>
            
            <div className="space-y-4 mb-8">
              {['M-Pesa', 'M-Mola', 'e-Mola', 'm-Cash'].map((m) => (
                <button 
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all ${paymentMethod === m ? 'border-blue-900 bg-blue-50' : 'border-slate-100 bg-white'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${paymentMethod === m ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {m[0]}
                  </div>
                  <span className={`font-bold ${paymentMethod === m ? 'text-blue-900' : 'text-slate-600'}`}>{m}</span>
                  {paymentMethod === m && <CheckCircle2 className="ml-auto text-blue-900" size={20} />}
                </button>
              ))}
            </div>

            {paymentMethod && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="relative mb-8">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="tel" 
                    placeholder="Número da Carteira Móvel" 
                    className="w-full bg-white border border-slate-200 pl-12 pr-4 py-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button onClick={nextStep} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg">Finalizar Registo</button>
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="animate-in zoom-in duration-500 text-center py-10">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Documentos Enviados!</h2>
            <p className="text-slate-500 mt-2 mb-10 leading-relaxed px-4">
              A nossa equipa irá analisar os seus dados em até <b>24 horas</b>. Receberá uma notificação assim que o seu selo de verificação for activado.
            </p>
            <button 
              onClick={() => {
                onComplete();
                onClose();
              }} 
              className="w-full bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-lg"
            >
              Voltar ao Perfil
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[70] flex flex-col h-full overflow-hidden">
      {/* Progress Header */}
      <header className="px-6 pt-12 pb-6 border-b border-slate-50">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="p-2 -ml-2 text-slate-400"><ChevronLeft size={24} /></button>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Verificação KYC</span>
          <div className="w-10"></div>
        </div>
        
        {step < 5 && (
          <div className="flex gap-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`flex-1 transition-all duration-500 rounded-full ${step >= s ? 'bg-blue-900' : 'bg-slate-200'}`}
              />
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
        {renderStep()}
      </main>
    </div>
  );
};

export default KYCVerification;
