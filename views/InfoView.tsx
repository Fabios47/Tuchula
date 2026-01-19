
import React from 'react';
import { ChevronLeft, Phone, Mail, MessageCircle, HelpCircle, FileText, ShieldAlert, Users, ExternalLink, Scale, FileCheck, Truck } from 'lucide-react';

export type InfoPageType = 'refund' | 'terms' | 'privacy' | 'about' | 'faq' | 'contacts' | 'legal' | 'fiscal';

interface InfoViewProps {
  type: InfoPageType;
  onClose: () => void;
}

const InfoView: React.FC<InfoViewProps> = ({ type, onClose }) => {
  const renderContent = () => {
    switch (type) {
      case 'refund':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Política de Reembolso</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              No Tuchula, a sua satisfação é a nossa prioridade. O nosso sistema de <b>Escrow</b> garante que o seu dinheiro só é libertado quando confirmar a recepção do produto.
            </p>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-blue-900 text-sm mb-2">Pode pedir reembolso se:</h4>
              <ul className="text-xs text-blue-800 space-y-2 list-disc ml-4">
                <li>O produto não for entregue no prazo estipulado.</li>
                <li>O produto recebido for diferente da descrição ou fotos.</li>
                <li>O produto apresentar defeitos não mencionados.</li>
              </ul>
            </div>
            <p className="text-sm text-slate-600">O prazo para iniciar uma disputa é de 48 horas após a data prevista de entrega ou recepção.</p>
          </div>
        );
      case 'legal':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Responsabilidade Legal</h2>
            <div className="flex gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl">
              <Scale className="text-rose-600 shrink-0" size={20} />
              <p className="text-xs text-rose-800 leading-relaxed">
                A Tuchula é uma plataforma de intermediação. A responsabilidade civil e criminal sobre a origem e qualidade dos produtos é exclusivamente do vendedor.
              </p>
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Itens Proibidos</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              É terminantemente proibida a venda de: armas, explosivos, drogas ilícitas, órgãos humanos, animais silvestres, ou qualquer item que viole as leis da República de Moçambique. O não cumprimento resultará no banimento imediato e entrega dos logs às autoridades.
            </p>
          </div>
        );
      case 'fiscal':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Relatórios e Auditoria</h2>
            <p className="text-sm text-slate-600">Para sua organização financeira e fiscal, disponibilizamos relatórios mensais de todas as suas vendas.</p>
            <div className="space-y-3">
              <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Recibo Eletrónico</p>
                  <p className="text-[10px] text-slate-400">Gerado após cada transação concluída.</p>
                </div>
                <FileCheck className="text-emerald-500" size={20} />
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Relatório Fiscal Trimestral</p>
                  <p className="text-[10px] text-slate-400">Resumo de comissões pagas para auditoria.</p>
                </div>
                <ExternalLink className="text-blue-500" size={20} />
              </div>
            </div>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Termos e Condições</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ao utilizar a plataforma Tuchula, concorda com as nossas regras de comunidade. É proibida a venda de produtos ilegais, armas ou substâncias controladas em Moçambique.
            </p>
            <h3 className="font-bold text-slate-800">Comissões e Taxas</h3>
            <ul className="text-xs text-slate-500 space-y-2 list-disc ml-4">
              <li>Comissão de Venda: 3% fixa.</li>
              <li>Taxa de Levantamento (Mobile Money): 20 MT fixos por operação.</li>
              <li>Taxa de Patrocínio: Variável conforme o destaque escolhido.</li>
            </ul>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Política de Privacidade</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Os seus dados estão protegidos. Não partilhamos o seu número de telefone ou email com terceiros sem a sua autorização expressa durante uma transacção.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-xs text-slate-500 italic">Respeitamos a Lei de Protecção de Dados de Moçambique. Classificação Etária: 18+ (Vendedores), 13+ (Compradores).</p>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-blue-900 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl font-black italic">T</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Sobre o Tuchula</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tuchula é a primeira plataforma moçambicana focada em 100% de segurança nas transacções online. Nascemos para eliminar as burlas e profissionalizar o comércio digital em Moçambique.
            </p>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Perguntas Frequentes</h2>
            {[
              { q: "Qual o prazo para envio?", a: "O vendedor tem até 48 horas úteis para inserir o código de rastreio no sistema." },
              { q: "O que acontece se o vendedor não enviar?", a: "O dinheiro é reembolsado automaticamente ao comprador após o prazo limite de 5 dias sem rastreio." },
              { q: "O que é o Score do Vendedor?", a: "É uma métrica de confiança. Vendedores com score abaixo de 50 são bloqueados para novas vendas." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-800 text-sm mb-2">{item.q}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        );
      case 'contacts':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Suporte ao Cliente</h2>
            <p className="text-sm text-slate-500">Estamos disponíveis todos os dias das 08h às 20h para o ajudar.</p>
            <div className="space-y-3">
              <a href="tel:+258844977774" className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm active:bg-slate-50">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600"><Phone size={24} /></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Vodacom</p>
                  <p className="text-lg font-black text-slate-800">+258 84 49 77 774</p>
                </div>
              </a>
              <button className="flex items-center gap-4 p-5 bg-emerald-500 text-white rounded-2xl shadow-lg w-full active:scale-95 transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><MessageCircle size={24} /></div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white/70 uppercase">WhatsApp</p>
                  <p className="text-lg font-black">Conversar Agora</p>
                </div>
              </button>
            </div>
          </div>
        );
    }
  };

  const getTitle = () => {
    const titles = {
      refund: 'Reembolso',
      terms: 'Termos',
      privacy: 'Privacidade',
      about: 'Sobre Nós',
      faq: 'FAQ',
      contacts: 'Contactos',
      legal: 'Responsabilidade',
      fiscal: 'Fiscal & Audit'
    };
    return titles[type];
  };

  return (
    <div className="fixed inset-0 bg-white z-[80] flex flex-col animate-in slide-in-from-right duration-300">
      <header className="p-6 pt-12 border-b flex items-center justify-between sticky top-0 bg-white z-10">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-400"><ChevronLeft size={24} /></button>
        <h2 className="font-black text-slate-900 uppercase tracking-widest text-sm">{getTitle()}</h2>
        <div className="w-10"></div>
      </header>
      <main className="flex-1 overflow-y-auto p-6 pb-12 no-scrollbar">
        {renderContent()}
      </main>
    </div>
  );
};

export default InfoView;
