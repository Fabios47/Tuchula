
import React from 'react';
import { Search, Bell, MapPin, Star, ShieldCheck, ShoppingBag, Zap, Flame, Menu, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import Footer from '../components/Footer';

interface HomeProps {
  onProductClick: (product: Product) => void;
  onOpenMenu: () => void;
  onOpenInfo: (type: any) => void;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    sellerId: 's1',
    title: 'iPhone 13 Pro Max - 256GB',
    description: 'Bateria 100%, sem riscos, com todos acessórios.',
    price: 45000,
    images: ['https://picsum.photos/seed/iphone/400/400'],
    category: 'Eletrónicos',
    location: 'Maputo',
    condition: 'used',
    deliveryMethods: ['Entrega em mãos', 'Correio'],
    estimatedDelivery: '1-2 dias',
    rating: 4.8,
    reviewCount: 12,
    isSponsored: true
  },
  {
    id: '2',
    sellerId: 's2',
    title: 'Sapatilhas Nike Air Force 1',
    description: 'Originais, novas na caixa. Tamanho 42.',
    price: 7500,
    images: ['https://picsum.photos/seed/nike/400/400'],
    category: 'Moda',
    location: 'Matola',
    condition: 'new',
    deliveryMethods: ['Entrega em mãos'],
    estimatedDelivery: 'Imediata',
    rating: 5.0,
    reviewCount: 5
  }
];

const Home: React.FC<HomeProps> = ({ onProductClick, onOpenMenu, onOpenInfo }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-blue-900 p-4 pt-8 text-white sticky top-0 z-30 shadow-lg rounded-b-[30px]">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenMenu}
              className="p-2 bg-white/10 rounded-xl active:scale-90 transition-transform"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none">Tuchula</h1>
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-0.5">O Teu Mercado</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white/10 rounded-full relative active:scale-90 transition-transform">
              <ShoppingCart size={20} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-blue-900 rounded-full flex items-center justify-center text-[8px] font-black">2</div>
            </button>
            <button className="p-2 bg-white/10 rounded-full relative active:scale-90 transition-transform">
              <Bell size={20} />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-blue-900 rounded-full"></div>
            </button>
          </div>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="O que procuras hoje?" 
            className="w-full bg-white text-slate-900 pl-12 pr-4 py-4 rounded-2xl text-sm outline-none shadow-xl font-medium"
          />
        </div>
      </header>

      {/* Destaques */}
      <section className="px-4 mt-6">
        <div className="flex items-center gap-2 mb-4 px-1">
          <Flame size={20} className="text-rose-500 fill-rose-500" />
          <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Destaques</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1">
          {FEATURED_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[280px] bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex p-3 gap-3 animate-card active:scale-[0.98] transition-transform"
              onClick={() => onProductClick(product)}
            >
              <img src={product.images[0]} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">{product.title}</h4>
                  <p className="text-blue-900 font-black text-sm mt-1">{product.price.toLocaleString()} MT</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                    <Zap size={8} className="fill-emerald-500" /> Patrocinado
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Segurança Banner */}
      <div className="p-4 mt-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-black text-xl leading-tight">Compra com<br/>Segurança Total</h2>
            <p className="text-emerald-50 text-[10px] mt-2 max-w-[70%] font-medium opacity-80 italic">O dinheiro só é libertado quando confirmares a recepção.</p>
          </div>
          <ShieldCheck className="absolute -right-6 -bottom-6 text-white/20 w-40 h-40 rotate-12" />
        </div>
      </div>

      {/* Recomendados */}
      <section className="px-4 mt-8">
        <div className="flex items-center gap-2 mb-4 px-1">
          <Star size={18} className="text-amber-400 fill-amber-400" />
          <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Recomendados</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {FEATURED_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm active:scale-95 transition-all animate-card"
              onClick={() => onProductClick(product)}
            >
              <div className="relative h-44">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                {product.isSponsored && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-900/80 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase flex items-center gap-1">
                      <Zap size={8} /> Pro
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="text-[11px] font-bold text-slate-800 line-clamp-2 min-h-[2.4rem] leading-tight">{product.title}</h4>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-blue-900 font-black text-sm">{product.price.toLocaleString()} MT</span>
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <ShoppingBag size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Institucional */}
      <Footer onOpenInfo={onOpenInfo} />
    </div>
  );
};

export default Home;
