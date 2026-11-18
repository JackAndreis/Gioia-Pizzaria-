import { useState } from 'react';
import { MessageCircle, Menu as MenuIcon, X } from 'lucide-react';
import { createWhatsAppUrl } from '../data/menu';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const defaultWhatsAppUrl = createWhatsAppUrl('Olá! Gostaria de fazer um pedido na Gioia! Pizzeria.');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0C0B0E]/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-12">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#inicio" 
          className="group flex items-baseline gap-1 text-2xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-display transition-transform duration-200 active:scale-95"
        >
          <span className="text-[#E31837] transition-colors group-hover:text-[#FF6B35]">Gioia!</span>
          <span className="text-xs uppercase tracking-[0.25em] text-[#A19FA8] font-sans font-medium">Pizzeria</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#C8C6D0]">
          <a href="#inicio" className="transition-colors hover:text-white whitespace-nowrap shrink-0">
            Início
          </a>
          <a href="#cardapio" className="transition-colors hover:text-white whitespace-nowrap shrink-0">
            Cardápio
          </a>
          <a href="#tradicao" className="transition-colors hover:text-white whitespace-nowrap shrink-0">
            Tradição
          </a>
          <a href="#pedido" className="transition-colors hover:text-white whitespace-nowrap shrink-0">
            Monte seu Pedido
          </a>
          <a href="#localizacao" className="transition-colors hover:text-white whitespace-nowrap shrink-0">
            Localização
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={defaultWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#E31837] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#E31837]/25 transition-all duration-200 hover:bg-[#c2132d] hover:shadow-xl hover:shadow-[#E31837]/40 active:scale-95 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Conversar no WhatsApp</span>
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-[#A19FA8] hover:bg-white/[0.05] hover:text-white transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#121115] px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#C8C6D0]">
            <a 
              href="#inicio" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Início
            </a>
            <a 
              href="#cardapio" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Cardápio
            </a>
            <a 
              href="#tradicao" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Tradição
            </a>
            <a 
              href="#pedido" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Monte seu Pedido
            </a>
            <a 
              href="#localizacao" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Localização
            </a>
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#E31837] px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md hover:bg-[#c2132d] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Conversar no WhatsApp</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
