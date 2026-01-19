
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#1e3a8a] flex flex-col items-center justify-center z-[100]">
      <div className="relative">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
          <span className="text-[#1e3a8a] text-4xl font-black italic">T</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#10b981] rounded-full border-4 border-[#1e3a8a]"></div>
      </div>
      <h1 className="mt-6 text-white text-3xl font-bold tracking-tight">Tuchula</h1>
      <p className="text-blue-200 mt-2 text-sm font-medium tracking-widest uppercase">Moçambique</p>
      
      <div className="mt-20 flex flex-col items-center">
        <div className="w-12 h-1 bg-blue-900/50 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-400 animate-[loading_1.5s_infinite]"></div>
        </div>
        <p className="text-blue-100/60 text-[10px] mt-3 uppercase tracking-tighter">Marketplace Seguro</p>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 50%; margin-left: 25%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Splash;
