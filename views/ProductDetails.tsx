
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Share2, 
  Heart, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  MessageCircle, 
  ShoppingCart, 
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import { Product, User } from '../types';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  user: User | null;
  onAuthRequired: () => void;
  onStartChat: (product: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose, user, onAuthRequired, onStartChat }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [purchaseStep, setPurchaseStep] = useState<'view' | 'checkout' | 'success'>('view');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleBuy = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    setPurchaseStep('checkout');
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }, 600);
  };

  if (purchaseStep === 'success') {
    return (
      <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck size={48} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Pagamento Confirmado!</h2>
        <p className="text-slate-500 mt-2 mb-8">
          O valor de <b>{product.price.toLocaleString()} MT</b> está seguro no nosso sistema de <b>Escrow</b>. 
          O vendedor já foi notificado.
        </p>
        <div className="w-full space-y-3">
          <button onClick={onClose} className="w-full bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-lg">Ver Meus Pedidos</button>
          <button onClick={onClose} className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl">Voltar ao Início</button>
        </div>
      </div>
    );
  }

  if (purchaseStep === 'checkout') {
    return (
      <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-bottom duration-300">
        <header className="p-4 border-b flex items-center gap-4">
          <button onClick={() => setPurchaseStep('view')} className="p-2"><ChevronLeft /></button>
          <h2 className="font-bold text-lg">Finalizar Compra</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
            <img src={product.images[0]} className="w-20 h-20 rounded-xl object-cover" />
            <div>
              <h3 className="font-bold text-sm line-clamp-2">{product.title}</h3>
              <p className="text-blue-900 font-bold mt-1">{product.price.toLocaleString()} MT</p>
            </div>
          </div>
          
          <h4 className="font-bold text-slate-800 mb-4">Escolha o Método de Pagamento</h4>
          <div className="space-y-3">
            {['M-Pesa', 'M-Mola', 'e-Mola', 'Cartão Visa'].map(method => (
              <label key={method} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer active:bg-blue-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-xs text-slate-400">ICON</div>
                  <span className="font-bold text-slate-700">{method}</span>
                </div>
                <input type="radio" name="payment" className="w-5 h-5 accent-blue-900" />
              </label>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
            <ShieldCheck className="text-blue-600 shrink-0" size={20} />
            <p className="text-[10px] text-blue-800 leading-relaxed">
              <b>Tuchula Escrow:</b> Seu dinheiro só é libertado para o vendedor depois que você confirmar o recebimento do produto.
            </p>
          </div>
        </div>
        <footer className="p-6 border-t bg-slate-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-500 font-medium">Total a Pagar</span>
            <span className="text-xl font-black text-blue-900">{product.price.toLocaleString()} MT</span>
          </div>
          <button onClick={() => setPurchaseStep('success')} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all">
            Pagar Agora
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen relative animate-in fade-in duration-300 pb-24">
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-30">
        <button onClick={onClose} className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white"><ChevronLeft size={24} /></button>
        <div className="flex gap-2">
          <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white"><Share2 size={20} /></button>
          <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white"><Heart size={20} /></button>
        </div>
      </div>

      <div className="relative h-96 bg-slate-200">
        <img src={product.images[activeImage]} alt={product.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-6 -mt-6 bg-white rounded-t-[40px] relative z-20 shadow-2xl">
        <div className="flex justify-between items-start mb-2">
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${product.condition === 'new' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
            {product.condition === 'new' ? 'Produto Novo' : 'Produto Usado'}
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{product.title}</h1>
        <p className="text-3xl font-black text-blue-900 mb-6">{product.price.toLocaleString()} MT</p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 text-slate-600">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center"><MapPin size={18} /></div>
            <span className="text-sm font-medium">{product.location}, Moçambique</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center"><Truck size={18} /></div>
            <span className="text-sm font-medium">Entrega em: {product.estimatedDelivery}</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-slate-800 mb-2">Descrição</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://picsum.photos/seed/seller/48/48" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white">
                <ShieldCheck size={10} />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Loja do Carlos</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">Vendedor Verificado</p>
            </div>
          </div>
          <button className="text-blue-600 font-bold text-xs px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">Ver Loja</button>
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white/95 backdrop-blur-md border-t p-4 flex gap-2 z-50">
        <button 
          onClick={() => onStartChat(product)}
          className="flex-none w-14 h-14 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center active:bg-blue-50 active:scale-95 transition-all"
          aria-label="Mensagem"
        >
          <MessageCircle size={22} />
        </button>
        
        <button 
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`flex-1 h-14 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
            addedToCart 
              ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-600' 
              : 'bg-white border-2 border-blue-900 text-blue-900'
          }`}
        >
          {addedToCart ? (
            <>
              <CheckCircle2 size={18} />
              <span className="text-xs">OK</span>
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              <span className="text-xs">No Carrinho</span>
            </>
          )}
        </button>

        <button 
          onClick={handleBuy}
          className="flex-1 h-14 bg-blue-900 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <ShoppingCart size={18} />
          <span className="text-xs">Comprar</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
