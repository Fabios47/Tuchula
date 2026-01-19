
import React, { useState } from 'react';
import { Search as SearchIcon, Filter, MapPin, SlidersHorizontal } from 'lucide-react';
import { Product, MOZ_PROVINCES } from '../types';

interface SearchProps {
  onProductClick: (product: Product) => void;
}

const Search: React.FC<SearchProps> = ({ onProductClick }) => {
  const [query, setQuery] = useState('');
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-blue-900 p-4 pt-8 sticky top-0 z-30">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            autoFocus
            type="text" 
            placeholder="Pesquisar por produtos ou lojas..." 
            className="w-full bg-white text-slate-900 pl-12 pr-4 py-4 rounded-2xl text-sm outline-none shadow-lg"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap">
            <Filter size={14} /> Filtros
          </button>
          <button className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap">
            <MapPin size={14} /> Localização
          </button>
          <button className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap">
            Preço: 0 - 5.000 MT
          </button>
        </div>
      </div>

      {query.length === 0 ? (
        <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-4 mt-20">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
            <SlidersHorizontal size={32} />
          </div>
          <div>
            <p className="font-bold text-slate-600">Nada por aqui ainda</p>
            <p className="text-xs">Tente pesquisar por iPhone, Roupas ou Serviços.</p>
          </div>
          
          <div className="mt-8 w-full text-left">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Pesquisas Populares</h4>
            <div className="flex flex-wrap gap-2">
              {['Smartphones', 'Toyota Hilux', 'Terrenos', 'Freelance', 'Moda Feminina'].map(tag => (
                <span key={tag} className="bg-white px-4 py-2 rounded-xl text-xs font-medium text-slate-600 border border-slate-100 shadow-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 gap-4">
           <p className="text-xs font-bold text-slate-400 p-2">Resultados para "{query}"</p>
           {/* Search Results would go here */}
           <div className="bg-white p-6 rounded-3xl text-center border border-slate-100 shadow-sm">
             <p className="text-slate-500 text-sm">Mostrando resultados simulados para a sua pesquisa.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Search;
