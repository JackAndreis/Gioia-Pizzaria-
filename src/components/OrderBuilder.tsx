import { useState, useId, useEffect, useRef, useMemo } from 'react';
import { MessageCircle, Check, X, RotateCcw, Search } from 'lucide-react';
import {
  CRUST_OPTIONS,
  MENU_ITEMS,
  PIZZA_SIZES,
  createWhatsAppUrl,
  getCrustPriceForSize,
  getPizzaPriceForSize,
} from '../data/menu';
import { CrustOptionId, MenuCategory, MenuItem, PizzaSize } from '../types';

interface OrderBuilderProps {
  selectedItem?: { item: MenuItem; key: number } | null;
}

type BuilderFlavorFilter =
  | 'all'
  | 'tradicionais'
  | 'lancamentos'
  | 'novidades'
  | 'nobres'
  | 'especialissimas'
  | 'vegetarianas'
  | 'agridoces-tropicais'
  | 'doces';

const BUILDER_FLAVOR_FILTERS: { id: BuilderFlavorFilter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'tradicionais', label: 'Tradicionais' },
  { id: 'lancamentos', label: 'Lançamentos' },
  { id: 'novidades', label: 'Novidades' },
  { id: 'nobres', label: 'Nobres' },
  { id: 'especialissimas', label: 'Especialíssimas' },
  { id: 'vegetarianas', label: 'Vegetarianas' },
  { id: 'agridoces-tropicais', label: 'Agridoces & Tropicais' },
  { id: 'doces', label: 'Doces' },
];

const SLICE_COLORS = [
  '#E31837',
  '#FF6B35',
  '#C68B59',
  '#B8233C',
  '#E8874A',
  '#9E2A2B',
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function createSlicePath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M',
    cx,
    cy,
    'L',
    start.x,
    start.y,
    'A',
    r,
    r,
    0,
    largeArc,
    0,
    end.x,
    end.y,
    'Z',
  ].join(' ');
}

function matchesBuilderFilter(
  category: MenuCategory,
  filter: BuilderFlavorFilter
): boolean {
  if (filter === 'all') return true;
  if (filter === 'agridoces-tropicais') {
    return category === 'agridoces' || category === 'tropicais';
  }
  return category === filter;
}

export function OrderBuilder({ selectedItem }: OrderBuilderProps) {
  const pizzas = useMemo(
    () => MENU_ITEMS.filter((item) => item.isPizza),
    []
  );

  const [size, setSize] = useState<PizzaSize>('grande');
  const [selectedFlavorIds, setSelectedFlavorIds] = useState<string[]>([
    pizzas.find((p) => p.name.toLowerCase().includes('calabresa da casa'))?.id ||
      pizzas[0]?.id ||
      'pizza-8831',
  ]);
  const [flavorFilter, setFlavorFilter] =
    useState<BuilderFlavorFilter>('tradicionais');
  const [flavorSearch, setFlavorSearch] = useState('');
  const [crust, setCrust] = useState<CrustOptionId>('tradicional');
  const [orderType, setOrderType] = useState<'entrega' | 'retirada'>('entrega');
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [limitNotice, setLimitNotice] = useState<string | null>(null);

  const nameInputId = useId();
  const addressInputId = useId();
  const notesInputId = useId();

  const currentSizeOption =
    PIZZA_SIZES.find((s) => s.id === size) || PIZZA_SIZES[2];
  const maxFlavors = currentSizeOption.maxFlavors;

  const lastHandledKeyRef = useRef<number>(0);

  // Sync when user clicks "+" on a pizza card in MenuSection
  useEffect(() => {
    if (!selectedItem || selectedItem.key === lastHandledKeyRef.current) return;
    lastHandledKeyRef.current = selectedItem.key;

    const item = selectedItem.item;
    if (!item || !item.isPizza) return;

    setSelectedFlavorIds((prev) => {
      if (prev.includes(item.id)) return prev;
      if (prev.length < maxFlavors) {
        setLimitNotice(null);
        return [...prev, item.id];
      }
      setLimitNotice(
        `Limite de ${maxFlavors} sabores atingido para ${currentSizeOption.label}. O último sabor foi substituído.`
      );
      return [...prev.slice(0, maxFlavors - 1), item.id];
    });
  }, [selectedItem, maxFlavors, currentSizeOption.label]);

  const handleSizeChange = (newSize: PizzaSize) => {
    const targetSize = PIZZA_SIZES.find((s) => s.id === newSize);
    setSize(newSize);
    if (targetSize && selectedFlavorIds.length > targetSize.maxFlavors) {
      setSelectedFlavorIds((prev) => prev.slice(0, targetSize.maxFlavors));
      setLimitNotice(
        `Ajustado para ${targetSize.maxFlavors} sabores (limite da pizza ${targetSize.label}).`
      );
    } else {
      setLimitNotice(null);
    }
  };

  const handleToggleFlavor = (pizzaId: string) => {
    setSelectedFlavorIds((prev) => {
      if (prev.includes(pizzaId)) {
        setLimitNotice(null);
        return prev.filter((id) => id !== pizzaId);
      }
      if (prev.length >= maxFlavors) {
        setLimitNotice(
          `A pizza ${currentSizeOption.label} permite até ${maxFlavors} sabores. Remova um sabor ou escolha um tamanho maior.`
        );
        return prev;
      }
      setLimitNotice(null);
      return [...prev, pizzaId];
    });
  };

  const handleResetFlavors = () => {
    setSelectedFlavorIds([]);
    setLimitNotice(null);
  };

  const filteredBuilderPizzas = useMemo(() => {
    const q = flavorSearch.trim().toLowerCase();
    if (q.length > 0) {
      return pizzas.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.code && p.code.includes(q))
      );
    }
    return pizzas.filter((p) => matchesBuilderFilter(p.category, flavorFilter));
  }, [pizzas, flavorFilter, flavorSearch]);

  const selectedPizzas = selectedFlavorIds
    .map((id) => pizzas.find((p) => p.id === id))
    .filter((p): p is MenuItem => Boolean(p));

  // Gioia's official pricing behavior: highest value among selected flavors for the chosen size
  const basePrice =
    selectedPizzas.length > 0
      ? Math.max(
          ...selectedPizzas.map((p) => getPizzaPriceForSize(p, size))
        )
      : 0;
  const crustPrice = getCrustPriceForSize(crust, size);
  const currentCrustOption =
    CRUST_OPTIONS.find((c) => c.id === crust) || CRUST_OPTIONS[0];
  const totalPrice = selectedPizzas.length > 0 ? basePrice + crustPrice : 0;

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPizzas.length === 0) {
      setLimitNotice('Selecione pelo menos 1 sabor para enviar seu pedido.');
      return;
    }

    const sizeLabel = `${currentSizeOption.label} (${currentSizeOption.gioiaLabel})`;
    const crustLabel =
      crustPrice > 0
        ? `${currentCrustOption.label} (+R$ ${crustPrice.toFixed(2).replace('.', ',')})`
        : currentCrustOption.label;

    const fraction =
      selectedPizzas.length === 1
        ? 'Inteira'
        : `1/${selectedPizzas.length}`;
    const flavorsList = selectedPizzas
      .map(
        (p) =>
          `• ${fraction} ${p.code ? `${p.code} - ` : ''}${p.name}`
      )
      .join('\n');

    const clientStr = customerName.trim() ? customerName.trim() : 'Cliente';
    const typeStr =
      orderType === 'entrega'
        ? `Entrega (${deliveryAddress.trim() || 'Endereço a confirmar'})`
        : 'Retirada no balcão';
    const notesStr = notes.trim() ? `\n*Observações:* ${notes.trim()}` : '';

    const message =
      `🍕 *PEDIDO GIOIA! PIZZERIA*\n\n` +
      `*Cliente:* ${clientStr}\n` +
      `*Modalidade:* ${typeStr}\n\n` +
      `*Tamanho:* ${sizeLabel}\n` +
      `*Sabores (${selectedPizzas.length}/${maxFlavors}):*\n${flavorsList}\n` +
      `*Borda:* ${crustLabel}` +
      `${notesStr}\n\n` +
      `*Valor Total Estimado:* R$ ${totalPrice.toFixed(2).replace('.', ',')}\n\n` +
      `Olá! Gostaria de confirmar meu pedido e saber o tempo previsto!`;

    window.open(createWhatsAppUrl(message), '_blank');
  };

  const flavorCount = selectedPizzas.length;
  const isAtLimit = flavorCount >= maxFlavors;

  return (
    <section
      id="pedido"
      className="py-24 lg:py-32 bg-[#0E0D11] border-t border-white/[0.06] relative"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#FF6B35] font-semibold mb-3">
            <span>Pedido Direto no WhatsApp</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 text-balance">
            Monte sua <span className="italic text-[#E31837]">Pizza Artesanal</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9E9BA8] leading-relaxed">
            Escolha o tamanho, combine os sabores do nosso cardápio oficial e selecione a borda recheada antes de enviar direto para a cozinha.
          </p>
        </div>

        {/* Builder Container */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#151419] border border-white/[0.08] shadow-2xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <form onSubmit={handleSendOrder} className="space-y-10">
            {/* Step 1: Escolha do Tamanho & Limite de Sabores */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <label className="block text-xs uppercase tracking-wider text-[#FF6B35] font-semibold">
                  1. Escolha o Tamanho da Pizza
                </label>
                <span className="text-xs text-[#8A8795]">
                  Cada tamanho libera uma quantidade máxima de sabores
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {PIZZA_SIZES.map((option) => {
                  const isSelected = size === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSizeChange(option.id)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-[#E31837] bg-[#E31837]/10 text-white shadow-md'
                          : 'border-white/[0.06] bg-[#1B1A20] text-[#A19FA8] hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-base text-white">
                          {option.label}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-[#E31837] shrink-0" />
                        )}
                      </div>
                      <span className="block text-xs text-[#8A8795] tabular-nums">
                        {option.gioiaLabel}
                      </span>
                      <span
                        className={`mt-2 inline-block text-xs font-semibold ${
                          isSelected ? 'text-[#FF6B35]' : 'text-[#C8C6D0]'
                        }`}
                      >
                        {option.flavorRuleLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Escolha dos Sabores + Visualizador */}
            <div className="pt-6 border-t border-white/[0.06]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#FF6B35] font-semibold">
                    2. Escolha os Sabores ({flavorCount} de {maxFlavors})
                  </label>
                  <p className="text-xs text-[#8A8795] mt-1">
                    Pizza {currentSizeOption.label}: selecione de 1 até{' '}
                    <span className="text-white font-semibold">
                      {maxFlavors} sabores diferentes
                    </span>{' '}
                    entre as {pizzas.length} opções do cardápio.
                  </p>
                </div>

                {flavorCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFlavors}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A19FA8] hover:text-white transition-colors whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Limpar sabores</span>
                  </button>
                )}
              </div>

              {/* Live Visual Pizza Division & Slots Bar */}
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#1B1A20] border border-white/[0.06] flex flex-col sm:flex-row items-center gap-6">
                {/* Geometric SVG Pizza Diagram */}
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-24 h-24 drop-shadow-lg"
                    aria-hidden="true"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="47"
                      fill="#2A221D"
                      stroke="#C68B59"
                      strokeWidth="3"
                    />
                    {flavorCount === 0 && (
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="#151419"
                        stroke="rgba(255,255,255,0.1)"
                        strokeDasharray="4 4"
                      />
                    )}
                    {flavorCount === 1 && (
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill={SLICE_COLORS[0]}
                        opacity="0.85"
                      />
                    )}
                    {flavorCount > 1 &&
                      selectedPizzas.map((pizza, idx) => {
                        const angle = 360 / flavorCount;
                        const startAngle = idx * angle;
                        const endAngle = (idx + 1) * angle;
                        return (
                          <path
                            key={pizza.id}
                            d={createSlicePath(50, 50, 42, startAngle, endAngle)}
                            fill={SLICE_COLORS[idx % SLICE_COLORS.length]}
                            opacity="0.88"
                            stroke="#151419"
                            strokeWidth="2"
                          />
                        );
                      })}
                    <circle cx="50" cy="50" r="4" fill="#151419" />
                  </svg>
                </div>

                {/* Selected Slots Summary */}
                <div className="flex-1 w-full">
                  <div className="text-xs font-medium text-[#A19FA8] mb-2.5 flex items-center justify-between">
                    <span>
                      Composição atual{' '}
                      {flavorCount > 1 && (
                        <span className="text-[#8A8795]">
                          · Fração 1/{flavorCount} por sabor
                        </span>
                      )}
                    </span>
                    <span className="font-mono tabular-nums text-[#FF6B35]">
                      {flavorCount}/{maxFlavors}
                    </span>
                  </div>

                  {flavorCount === 0 ? (
                    <div className="text-xs text-[#7A7785] py-2">
                      Nenhum sabor selecionado ainda. Escolha abaixo os sabores da sua pizza.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedPizzas.map((pizza, idx) => (
                        <div
                          key={pizza.id}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#151419] border border-white/10 pl-2.5 pr-1.5 py-1.5 text-xs text-white"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{
                              backgroundColor:
                                SLICE_COLORS[idx % SLICE_COLORS.length],
                            }}
                          />
                          <span className="font-medium truncate max-w-[180px]">
                            {pizza.code ? `${pizza.code} - ` : ''}
                            {pizza.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleFlavor(pizza.id)}
                            aria-label={`Remover ${pizza.name}`}
                            className="p-0.5 rounded text-[#8A8795] hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Filter Tabs & Search inside Builder */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {BUILDER_FLAVOR_FILTERS.map((cat) => {
                    const active =
                      flavorFilter === cat.id && flavorSearch.trim().length === 0;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setFlavorFilter(cat.id);
                          setFlavorSearch('');
                        }}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-white text-[#0C0B0E] font-semibold'
                            : 'bg-[#1B1A20] text-[#9E9BA8] hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full md:w-64 shrink-0">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#7A7785]" />
                  <input
                    type="text"
                    value={flavorSearch}
                    onChange={(e) => setFlavorSearch(e.target.value)}
                    placeholder="Buscar sabor ou nº..."
                    aria-label="Filtrar sabores de pizza"
                    className="w-full rounded-full bg-[#1B1A20] border border-white/[0.08] pl-8 pr-8 py-1.5 text-xs text-white placeholder-[#6A6775] focus:outline-none focus:border-[#E31837]"
                  />
                  {flavorSearch && (
                    <button
                      type="button"
                      onClick={() => setFlavorSearch('')}
                      aria-label="Limpar busca de sabores"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8795] hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Limit Feedback Notice */}
              {limitNotice && (
                <div
                  role="status"
                  className="mb-4 px-4 py-2.5 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-xs text-[#FFB188]"
                >
                  {limitNotice}
                </div>
              )}

              {/* Scrollable Flavor Cards Grid */}
              <div className="max-h-[420px] overflow-y-auto pr-1">
                {filteredBuilderPizzas.length === 0 ? (
                  <div className="py-10 text-center text-xs text-[#8A8795]">
                    Nenhum sabor encontrado para &ldquo;{flavorSearch}&rdquo;.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredBuilderPizzas.map((pizza) => {
                      const selectedIndex = selectedFlavorIds.indexOf(pizza.id);
                      const isSelected = selectedIndex !== -1;
                      const priceForSize = getPizzaPriceForSize(pizza, size);
                      const isDisabled = !isSelected && isAtLimit;

                      return (
                        <button
                          key={pizza.id}
                          type="button"
                          onClick={() => handleToggleFlavor(pizza.id)}
                          aria-pressed={isSelected}
                          className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 ${
                            isSelected
                              ? 'border-[#E31837] bg-[#E31837]/10 text-white shadow-md'
                              : isDisabled
                              ? 'border-white/[0.04] bg-[#18171C] text-[#6A6775] opacity-60 hover:opacity-80 cursor-not-allowed'
                              : 'border-white/[0.06] bg-[#1B1A20] text-[#A19FA8] hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 w-full mb-1">
                            <span className="font-display font-bold text-sm text-white leading-snug">
                              {pizza.code ? `${pizza.code} · ` : ''}
                              {pizza.name}
                            </span>
                            {isSelected ? (
                              <span
                                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                style={{
                                  backgroundColor:
                                    SLICE_COLORS[
                                      selectedIndex % SLICE_COLORS.length
                                    ],
                                }}
                              >
                                {selectedIndex + 1}
                              </span>
                            ) : (
                              <span className="text-[10px] uppercase tracking-wider text-[#7A7785] shrink-0">
                                {pizza.categoryLabel.replace('Pizzas ', '')}
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-[#8A8795] line-clamp-2 leading-relaxed mb-2">
                            {pizza.description}
                          </p>

                          <div className="flex items-center justify-between w-full mt-auto pt-1">
                            <span className="font-mono text-xs tabular-nums text-[#FF6B35]">
                              R$ {priceForSize.toFixed(2).replace('.', ',')}
                            </span>
                            <span className="text-[11px] text-[#8A8795]">
                              {isSelected
                                ? 'Selecionado'
                                : isDisabled
                                ? 'Limite atingido'
                                : '+ Adicionar'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Tipo de Borda (all 6 real Gioia crusts with size pricing) */}
            <div className="pt-6 border-t border-white/[0.06]">
              <label className="block text-xs uppercase tracking-wider text-[#FF6B35] font-semibold mb-4">
                3. Tipo de Borda ({currentSizeOption.label})
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CRUST_OPTIONS.map((option) => {
                  const optionPrice = option.prices[size];
                  const isSelected = crust === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setCrust(option.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-[#E31837] bg-[#E31837]/10 text-white'
                          : 'border-white/[0.06] bg-[#1B1A20] text-[#A19FA8] hover:text-white'
                      }`}
                    >
                      <span className="text-left">{option.label}</span>
                      {optionPrice === 0 ? (
                        <span className="text-[#8A8795] shrink-0 ml-2">
                          Inclusa
                        </span>
                      ) : (
                        <span className="text-[#FF6B35] font-mono tabular-nums shrink-0 ml-2">
                          + R$ {optionPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Dados de Entrega / Retirada */}
            <div className="pt-6 border-t border-white/[0.06] space-y-6">
              <label className="block text-xs uppercase tracking-wider text-[#FF6B35] font-semibold">
                4. Dados para o Pedido
              </label>

              {/* Modalidade */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setOrderType('entrega')}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    orderType === 'entrega'
                      ? 'bg-white text-black font-semibold'
                      : 'bg-[#1B1A20] text-[#A19FA8] hover:text-white'
                  }`}
                >
                  Entrega em Domicílio
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('retirada')}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    orderType === 'retirada'
                      ? 'bg-white text-black font-semibold'
                      : 'bg-[#1B1A20] text-[#A19FA8] hover:text-white'
                  }`}
                >
                  Retirada no Balcão
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={nameInputId}
                    className="block text-xs text-[#A19FA8] mb-1.5"
                  >
                    Seu Nome (opcional)
                  </label>
                  <input
                    id={nameInputId}
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl bg-[#1B1A20] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-[#5A5765] focus:outline-none focus:border-[#E31837] transition-colors"
                  />
                </div>

                {orderType === 'entrega' ? (
                  <div>
                    <label
                      htmlFor={addressInputId}
                      className="block text-xs text-[#A19FA8] mb-1.5"
                    >
                      Endereço em Santa Rosa (Rua, Nº, Bairro)
                    </label>
                    <input
                      id={addressInputId}
                      type="text"
                      placeholder="Ex: R. Minas Gerais, 120 - Centro"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full rounded-xl bg-[#1B1A20] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-[#5A5765] focus:outline-none focus:border-[#E31837] transition-colors"
                    />
                  </div>
                ) : (
                  <div>
                    <span className="block text-xs text-[#A19FA8] mb-1.5">
                      Ponto de Retirada
                    </span>
                    <div className="w-full rounded-xl bg-[#1B1A20] border border-white/[0.08] px-4 py-3 text-sm text-[#B5B3BE]">
                      R. Minas Gerais, 96 - Centro, Santa Rosa
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor={notesInputId}
                  className="block text-xs text-[#A19FA8] mb-1.5"
                >
                  Observações especiais para a cozinha
                </label>
                <input
                  id={notesInputId}
                  type="text"
                  placeholder="Ex: Sem cebola na metade Calabresa, caprichar no orégano..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl bg-[#1B1A20] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-[#5A5765] focus:outline-none focus:border-[#E31837] transition-colors"
                />
              </div>
            </div>

            {/* Total and Submit Button */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#7A7785]">
                  Valor Estimado
                </span>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold text-white tabular-nums">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs text-[#8A8795]">
                    ({currentSizeOption.label} · {flavorCount}{' '}
                    {flavorCount === 1 ? 'sabor' : 'sabores'})
                  </span>
                </div>
                {flavorCount > 1 && (
                  <span className="block text-[11px] text-[#7A7785] mt-1">
                    Valor calculado pelo maior sabor selecionado
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={flavorCount === 0}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#E31837] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-xl shadow-[#E31837]/30 transition-all hover:bg-[#C2132D] hover:shadow-2xl active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Conversar no WhatsApp e Enviar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
