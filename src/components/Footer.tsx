import { MessageCircle, ArrowUp } from 'lucide-react';
import { 
  WHATSAPP_DISPLAY, 
  ADDRESS_TEXT, 
  createWhatsAppUrl 
} from '../data/menu';

export function Footer() {
  const whatsappUrl = createWhatsAppUrl('Olá! Gostaria de conversar com a Gioia! Pizzeria.');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#0A090C] py-16 text-[#A19FA8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.04]">
          
          {/* Brand mark */}
          <div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tracking-tight text-white font-display mb-2">
              <span className="text-[#E31837]">Gioia!</span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#A19FA8] font-sans font-medium">Pizzeria</span>
            </div>
            <p className="text-xs text-[#7A7785] max-w-sm leading-relaxed">
              Pizzas artesanais napolitanas assadas a 450°C no forno a lenha com fermentação natural de 48 horas.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#C8C6D0]">
            <a href="#inicio" className="hover:text-white transition-colors">Início</a>
            <a href="#cardapio" className="hover:text-white transition-colors">Cardápio</a>
            <a href="#tradicao" className="hover:text-white transition-colors">Tradição</a>
            <a href="#pedido" className="hover:text-white transition-colors">Monte seu Pedido</a>
            <a href="#localizacao" className="hover:text-white transition-colors">Localização</a>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B35] hover:text-[#FFA07A] transition-colors"
            >
              WhatsApp
            </a>
          </nav>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Voltar ao topo da página"
            className="flex items-center gap-2 text-xs text-[#8A8795] hover:text-white transition-colors"
          >
            <span>Voltar ao topo</span>
            <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center">
              <ArrowUp className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6A6775]">
          <div>
            © {new Date().getFullYear()} Gioia! Pizzeria. Todos os direitos reservados.
          </div>
          <div className="text-center sm:text-right">
            {ADDRESS_TEXT} · {WHATSAPP_DISPLAY}
          </div>
        </div>
      </div>
    </footer>
  );
}
