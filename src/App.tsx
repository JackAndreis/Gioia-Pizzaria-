/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { TraditionSection } from './components/TraditionSection';
import { OrderBuilder } from './components/OrderBuilder';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { MenuItem } from './types';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl } from './data/menu';

export default function App() {
  const [selectedPizzaForBuilder, setSelectedPizzaForBuilder] = useState<{ item: MenuItem; key: number } | null>(null);

  const handleSelectPizza = (item: MenuItem) => {
    setSelectedPizzaForBuilder((prev) => ({ item, key: (prev?.key ?? 0) + 1 }));
    const element = document.getElementById('pedido');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const floatingWhatsAppUrl = createWhatsAppUrl('Olá Gioia! Gostaria de fazer um pedido pelo WhatsApp.');

  return (
    <div className="min-h-screen bg-[#0C0B0E] text-[#ECEAF0] flex flex-col selection:bg-[#E31837] selection:text-white">
      {/* Top Bar Header */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Cardápio Digital Interativo */}
        <MenuSection onSelectItemForOrder={handleSelectPizza} />

        {/* 3. Tradição Napolitana & Estatísticas */}
        <TraditionSection />

        {/* 4. Monte seu Pedido via WhatsApp */}
        <OrderBuilder selectedItem={selectedPizzaForBuilder} />

        {/* 5. Localização & Contato */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Action Button */}
      <aside aria-label="Atendimento rápido" className="fixed bottom-6 right-6 z-40">
        <a
          href={floatingWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 rounded-full bg-[#E31837] p-3.5 sm:px-5 sm:py-3.5 text-white shadow-2xl shadow-[#E31837]/50 transition-all duration-300 hover:bg-[#C2132D] hover:scale-105 active:scale-95"
          aria-label="Conversar no WhatsApp"
        >
          <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
          <span className="hidden sm:inline font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
            Pedir no WhatsApp
          </span>
        </a>
      </aside>
    </div>
  );
}
