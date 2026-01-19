
import React, { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Search as SearchIcon, 
  PlusCircle, 
  Wallet as WalletIcon, 
  User as UserIcon,
  Menu,
  X,
  Settings,
  ShoppingBag,
  Heart,
  Bell,
  HelpCircle,
  LogOut,
  ShieldCheck,
  ShoppingCart
} from 'lucide-react';
import Splash from './components/Splash';
import Home from './views/Home';
import Search from './views/Search';
import Sell from './views/Sell';
import Wallet from './views/Wallet';
import Profile from './views/Profile';
import Auth from './views/Auth';
import ProductDetails from './views/ProductDetails';
import ChatRoom from './views/ChatRoom';
import KYCVerification from './views/KYCVerification';
import InfoView, { InfoPageType } from './views/InfoView';
import { User, Product, ChatSession } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'sell' | 'wallet' | 'profile'>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
  const [isKYCOpen, setIsKYCOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeInfoPage, setActiveInfoPage] = useState<InfoPageType | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Splash />;

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleStartChat = (product: Product) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    
    const newChat: ChatSession = {
      id: `chat_${product.id}`,
      participantId: product.sellerId,
      participantName: "Vendedor Tuchula",
      productId: product.id,
      productTitle: product.title,
      productPrice: product.price,
      productImage: product.images[0],
      lastMessageSnippet: "Olá! Tenho interesse no produto.",
      lastMessageTimestamp: new Date().toISOString(),
      messages: [
        {
          id: '1',
          senderId: currentUser.id,
          text: `Olá! Tenho interesse no seu anúncio: ${product.title}`,
          timestamp: new Date().toISOString(),
          isRead: true
        }
      ]
    };
    setActiveChat(newChat);
    setSelectedProduct(null);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
  };

  const renderContent = () => {
    if (activeChat) return <ChatRoom session={activeChat} currentUserId={currentUser?.id || ''} onClose={() => setActiveChat(null)} />;
    if (selectedProduct) return <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} user={currentUser} onAuthRequired={() => setIsAuthOpen(true)} onStartChat={handleStartChat} />;

    switch (activeTab) {
      case 'home': return <Home onProductClick={handleProductSelect} onOpenMenu={() => setIsDrawerOpen(true)} onOpenInfo={(type) => setActiveInfoPage(type)} />;
      case 'search': return <Search onProductClick={handleProductSelect} />;
      case 'sell': 
        if (!currentUser) return <Auth onAuthSuccess={handleAuthSuccess} onCancel={() => setIsAuthOpen(false)} />;
        return <Sell user={currentUser} onOpenKYC={() => setIsKYCOpen(true)} />;
      case 'wallet': 
        if (!currentUser) return <Auth onAuthSuccess={handleAuthSuccess} onCancel={() => setIsAuthOpen(false)} />;
        return <Wallet user={currentUser} />;
      case 'profile': 
        if (!currentUser) return <Auth onAuthSuccess={handleAuthSuccess} onCancel={() => setIsAuthOpen(false)} />;
        return <Profile user={currentUser} onLogout={() => setCurrentUser(null)} onOpenMessages={() => {}} onOpenKYC={() => setIsKYCOpen(true)} onOpenInfo={(type) => setActiveInfoPage(type)} />;
      default: return <Home onProductClick={handleProductSelect} onOpenMenu={() => setIsDrawerOpen(true)} onOpenInfo={(type) => setActiveInfoPage(type)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      {/* Navigation Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Navigation Drawer */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-white z-[120] shadow-2xl transition-transform duration-300 ease-out transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="bg-blue-900 p-8 text-white relative">
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full"
            >
              <X size={20} />
            </button>
            {currentUser ? (
              <div className="mt-4">
                <div className="relative inline-block">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=10b981&color=fff`} className="w-16 h-16 rounded-2xl border-2 border-white/20 mb-4" />
                  {currentUser.isVerified && <ShieldCheck className="absolute -bottom-1 -right-1 text-emerald-400 fill-blue-900" size={20} />}
                </div>
                <h3 className="font-bold text-lg">{currentUser.name}</h3>
                <p className="text-blue-200 text-xs truncate">{currentUser.email}</p>
              </div>
            ) : (
              <div className="mt-4">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 italic font-black text-2xl">T</div>
                <h3 className="font-bold text-lg">Bem-vindo ao Tuchula</h3>
                <button 
                  onClick={() => { setIsDrawerOpen(false); setIsAuthOpen(true); }}
                  className="mt-2 text-xs font-bold text-emerald-400 uppercase tracking-widest"
                >
                  Entrar ou Registar
                </button>
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <DrawerItem icon={<ShoppingCart size={18} />} label="Meu Carrinho" onClick={() => setIsDrawerOpen(false)} badge="2" />
            <DrawerItem icon={<ShoppingBag size={18} />} label="Meus Pedidos" onClick={() => setIsDrawerOpen(false)} />
            <DrawerItem icon={<Heart size={18} />} label="Favoritos" onClick={() => setIsDrawerOpen(false)} />
            <DrawerItem icon={<Bell size={18} />} label="Notificações" onClick={() => setIsDrawerOpen(false)} badge="3" />
            <div className="h-px bg-slate-100 my-4 mx-4"></div>
            <DrawerItem icon={<Settings size={18} />} label="Configurações" onClick={() => setIsDrawerOpen(false)} />
            <DrawerItem icon={<HelpCircle size={18} />} label="Centro de Ajuda" onClick={() => setActiveInfoPage('faq')} />
            <DrawerItem icon={<UserIcon size={18} />} label="Sobre o Tuchula" onClick={() => setActiveInfoPage('about')} />
          </nav>

          {currentUser && (
            <div className="p-6 border-t border-slate-100">
              <button 
                onClick={() => { setCurrentUser(null); setIsDrawerOpen(false); }}
                className="flex items-center gap-3 text-rose-500 font-bold text-sm"
              >
                <LogOut size={18} /> Sair da Conta
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {renderContent()}
      </main>

      {isAuthOpen && !currentUser && (
        <div className="fixed inset-0 z-[100] bg-white">
          <Auth onAuthSuccess={handleAuthSuccess} onCancel={() => setIsAuthOpen(false)} />
        </div>
      )}

      {isKYCOpen && <KYCVerification onClose={() => setIsKYCOpen(false)} onComplete={() => currentUser && setCurrentUser({...currentUser, isVerified: true})} />}
      {activeInfoPage && <InfoView type={activeInfoPage} onClose={() => setActiveInfoPage(null)} />}

      {!selectedProduct && !activeChat && !isKYCOpen && !activeInfoPage && (
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 flex justify-around items-center py-3 px-2 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
          <NavItem icon={<HomeIcon size={20} />} label="Início" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<SearchIcon size={20} />} label="Pesquisar" active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
          <NavItem icon={<PlusCircle size={26} className="text-emerald-500" />} label="Vender" active={activeTab === 'sell'} onClick={() => setActiveTab('sell')} />
          <NavItem icon={<WalletIcon size={20} />} label="Carteira" active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} />
          <NavItem icon={<UserIcon size={20} />} label="Perfil" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>
      )}
    </div>
  );
};

const DrawerItem: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void, badge?: string }> = ({ icon, label, onClick, badge }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 rounded-xl active:bg-slate-50 transition-colors"
  >
    <div className="flex items-center gap-4 text-slate-700 font-medium text-sm">
      <span className="text-slate-400">{icon}</span>
      {label}
    </div>
    {badge && <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{badge}</span>}
  </button>
);

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all flex-1 py-1 ${active ? 'text-blue-900' : 'text-slate-400'}`}
  >
    <div className={`transition-all duration-300 ${active ? 'scale-110' : 'scale-100'}`}>{icon}</div>
    <span className={`text-[9px] font-black uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
  </button>
);

export default App;
