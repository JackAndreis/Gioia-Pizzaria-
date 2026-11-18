import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Plus, Info, ArrowRight, Search, X } from 'lucide-react';
import { MENU_ITEMS, createWhatsAppUrl } from '../data/menu';
import { MenuItem } from '../types';
import pizzaMargheritaImg from '../assets/images/pizza_margherita_1794436385353.jpg';
import pizzaPepperoniImg from '../assets/images/pizza_pepperoni_1794436386291.jpg';
import pizzaQuatroQueijosImg from '../assets/images/pizza_quatro_queijos_1794436386489.jpg';

interface MenuSectionProps {
  onSelectItemForOrder?: (item: MenuItem) => void;
}

type FilterTab =
  | 'tradicionais'
  | 'lancamentos'
  | 'novidades'
  | 'nobres-especiais'
  | 'vegetarianas-tropicais'
  | 'doces'
  | 'carnes'
  | 'massas'
  | 'bebidas';

const CATEGORY_TABS: { id: FilterTab; label: string }[] = [
  { id: 'tradicionais', label: 'Tradicionais' },
  { id: 'lancamentos', label: 'Lançamentos' },
  { id: 'novidades', label: 'Novidades' },
  { id: 'nobres-especiais', label: 'Nobres & Especialíssimas' },
  { id: 'vegetarianas-tropicais', label: 'Vegetarianas & Tropicais' },
  { id: 'doces', label: 'Pizzas Doces' },
  { id: 'carnes', label: 'Carnes' },
  { id: 'massas', label: 'Massas' },
  { id: 'bebidas', label: 'Bebidas & Molhos' },
];

const SHOWCASE_PHOTOS = [
  {
    src: pizzaMargheritaImg,
    alt: 'Pizza artesanal assada no forno a lenha da Gioia! Pizzeria',
    title: 'Tradição no Forno a Lenha',
    subtitle: 'Mais de 110 sabores salgados e doces',
  },
  {
    src: pizzaPepperoniImg,
    alt: 'Pizza de Pepperoni da Gioia! Pizzeria',
    title: 'Sabores Nobres & Lançamentos',
    subtitle: 'Combinações exclusivas do chef',
  },
  {
    src: pizzaQuatroQueijosImg,
    alt: 'Pizza de Queijos Especiais da Gioia! Pizzeria',
    title: 'Carnes, Massas & Vinhos',
    subtitle: 'Filés grelhados e talharim artesanal',
  },
];

function matchesTab(item: MenuItem, tab: FilterTab): boolean {
  switch (tab) {
    case 'tradicionais':
      return item.category === 'tradicionais';
    case 'lancamentos':
      return item.category === 'lancamentos';
    case 'novidades':
      return item.category === 'novidades';
    case 'nobres-especiais':
      return item.category === 'nobres' || item.category === 'especialissimas';
    case 'vegetarianas-tropicais':
      return (
        item.category === 'vegetarianas' ||
        item.category === 'agridoces' ||
        item.category === 'tropicais'
      );
    case 'doces':
      return item.category === 'doces';
    case 'carnes':
      return item.category === 'carnes';
    case 'massas':
      return item.category === 'massas';
    case 'bebidas':
      return item.category === 'bebidas' || item.category === 'condimentos';
  }
}

export function MenuSection({ onSelectItemForOrder }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('tradicionais');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] =
    useState<MenuItem | null>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    if (normalizedQuery.length > 0) {
      return MENU_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.description.toLowerCase().includes(normalizedQuery) ||
          item.categoryLabel.toLowerCase().includes(normalizedQuery) ||
          (item.code && item.code.includes(normalizedQuery))
      );
    }
    return MENU_ITEMS.filter((item) => matchesTab(item, activeTab));
  }, [activeTab, normalizedQuery]);

  const handleQuickWhatsAppOrder = (item: MenuItem) => {
    const priceValue = item.priceSmall ?? item.priceMedium;
    const priceNote = item.isPizza
      ? `(a partir de R$ ${priceValue.toFixed(2).replace('.', ',')})`
      : `(R$ ${priceValue.toFixed(2).replace('.', ',')})`;
    const label = item.isPizza
      ? `a pizza *${item.code ? `${item.code} - ` : ''}${item.name}*`
      : `*${item.name}*`;
    const text = `Olá! Gostaria de pedir ${label} ${priceNote} da Gioia! Pizzeria. Poderia me confirmar o tempo estimado?`;
    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <section
      id="cardapio"
      className="py-24 lg:py-32 bg-[#0E0D11] border-t border-white/[0.04] relative"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header: Editorial Rhythm */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#E31837] font-semibold mb-3">
              <span>Cardápio Oficial</span>
              <span className="text-white/20" aria-hidden="true">·</span>
              <span className="text-[#A19FA8]">Pizzas, Carnes, Massas & Bebidas</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Sabores da <span className="italic text-[#FF6B35]">Gioia! Pizzeria</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#9E9BA8] max-w-md leading-relaxed">
            Explore todo o nosso cardápio completo. Clique em <strong className="text-white">+</strong> em qualquer pizza para combinar vários sabores ou peça direto pelo WhatsApp.
          </p>
        </div>

        {/* Curated 3-Photo Visual Strip (No duplicated thumbnails on 100+ cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {SHOWCASE_PHOTOS.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#151419] group"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-5 right-5">
                <h3 className="font-display text-lg font-bold text-white leading-tight">
                  {photo.title}
                </h3>
                <p className="text-xs text-[#C8C6D0] mt-0.5">{photo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Category Tabs Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-10 border-b border-white/[0.06]">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab.id && normalizedQuery.length === 0;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-[#0C0B0E] font-semibold shadow-md'
                      : 'text-[#A19FA8] hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A7785]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar sabor, prato ou nº..."
              aria-label="Buscar no cardápio"
              className="w-full rounded-full bg-[#151419] border border-white/[0.1] pl-10 pr-9 py-2 text-xs text-white placeholder-[#7A7785] focus:outline-none focus:border-[#E31837] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8795] hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Result Count Indicator when Searching */}
        {normalizedQuery.length > 0 && (
          <div className="mb-6 text-xs text-[#9E9BA8]">
            Exibindo <span className="text-white font-semibold tabular-nums">{filteredItems.length}</span>{' '}
            {filteredItems.length === 1 ? 'resultado' : 'resultados'} para &ldquo;{searchQuery}&rdquo;
          </div>
        )}

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-white/[0.06] bg-[#151419]">
            <p className="text-sm text-[#9E9BA8] mb-3">
              Nenhum item encontrado para &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-[#FF6B35] hover:text-white transition-colors"
            >
              Limpar filtro e voltar ao cardápio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => {
              const displayPrice = item.priceSmall ?? item.priceMedium;
              return (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between rounded-2xl bg-[#151419] border border-white/[0.08] hover:border-white/20 transition-all duration-200 p-6 shadow-md"
                >
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-[#FF6B35]">
                        {item.code && (
                          <>
                            <span className="font-mono tabular-nums text-white/75">
                              Nº {item.code}
                            </span>
                            <span className="text-white/20" aria-hidden="true">·</span>
                          </>
                        )}
                        <span>{item.categoryLabel}</span>
                      </div>

                      {item.isPizza && (
                        <button
                          type="button"
                          onClick={() => setSelectedItemForModal(item)}
                          aria-label={`Ver tamanhos e valores de ${item.name}`}
                          className="text-[#8A8795] hover:text-white transition-colors p-1 rounded-full hover:bg-white/[0.06]"
                        >
                          <Info className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-[#FF6B35] transition-colors mb-2 leading-snug">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#9E9BA8] leading-relaxed mb-5">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Action Strip */}
                  <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-[#7A7785]">
                        {item.isPizza ? 'A partir de' : 'Valor'}
                      </span>
                      <span className="font-mono text-lg font-bold text-white tabular-nums">
                        R$ {displayPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onSelectItemForOrder && item.isPizza && (
                        <button
                          type="button"
                          onClick={() => onSelectItemForOrder(item)}
                          className="p-2.5 rounded-full border border-white/15 text-white/85 hover:text-white hover:border-white/30 hover:bg-white/[0.06] transition-all"
                          title="Adicionar ao montador de sabores"
                          aria-label={`Adicionar ${item.name} ao montador`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleQuickWhatsAppOrder(item)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#E31837] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#E31837]/20 transition-all hover:bg-[#C2132D] active:scale-95 whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Pedir</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Kicker for custom pizza builder below */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[#9E9BA8] mb-3">
            Quer combinar até 6 sabores no mesmo disco e escolher sua borda recheada?
          </p>
          <a
            href="#pedido"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B35] hover:text-[#FFA07A] transition-colors"
          >
            <span>Ir para o Montador de Sabores</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Item Detail Modal (for Pizzas showing all 4 size prices) */}
      <AnimatePresence>
        {selectedItemForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#151419] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setSelectedItemForModal(null)}
                className="absolute top-4 right-4 rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar modal"
              >
                ✕
              </button>

              <div className="text-xs uppercase tracking-wider text-[#FF6B35] font-semibold mb-1">
                {selectedItemForModal.code ? `Nº ${selectedItemForModal.code} · ` : ''}
                {selectedItemForModal.categoryLabel}
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {selectedItemForModal.name}
              </h3>
              <p className="text-sm text-[#B5B3BE] leading-relaxed mb-6">
                {selectedItemForModal.description}
              </p>

              {/* Price Table by Size */}
              {selectedItemForModal.isPizza && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-[#1B1A20] border border-white/[0.06]">
                    <span className="block text-[11px] text-[#8A8795]">
                      Pequena (6 fatias · até 2 sabores)
                    </span>
                    <span className="font-mono text-base font-bold text-white tabular-nums">
                      R$ {(selectedItemForModal.priceSmall ?? 68).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1B1A20] border border-white/[0.06]">
                    <span className="block text-[11px] text-[#8A8795]">
                      Média (12 fatias · até 4 sabores)
                    </span>
                    <span className="font-mono text-base font-bold text-white tabular-nums">
                      R$ {selectedItemForModal.priceMedium.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1B1A20] border border-white/[0.06]">
                    <span className="block text-[11px] text-[#8A8795]">
                      Grande (16 fatias · até 5 sabores)
                    </span>
                    <span className="font-mono text-base font-bold text-white tabular-nums">
                      R$ {(selectedItemForModal.priceLarge ?? 135).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1B1A20] border border-white/[0.06]">
                    <span className="block text-[11px] text-[#8A8795]">
                      Gigante (20 fatias · até 6 sabores)
                    </span>
                    <span className="font-mono text-base font-bold text-white tabular-nums">
                      R$ {(selectedItemForModal.priceGiant ?? 180).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/[0.08]">
                {selectedItemForModal.isPizza && (
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectItemForOrder) onSelectItemForOrder(selectedItemForModal);
                      setSelectedItemForModal(null);
                      const el = document.getElementById('pedido');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Montar Sabores
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    handleQuickWhatsAppOrder(selectedItemForModal);
                    setSelectedItemForModal(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E31837] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#C2132D] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Pedir no WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
