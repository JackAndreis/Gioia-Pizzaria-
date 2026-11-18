import { Award, Flame, Clock } from 'lucide-react';
import pizzeriaCraftImg from '../assets/images/pizzeria_craft_story_1794436386724.jpg';

export function TraditionSection() {
  const stats = [
    { value: '12 Anos', label: 'de Tradição & Fogo a Lenha' },
    { value: '4.200+', label: 'Pizzas Artesanais por Mês' },
    { value: '4.9 ★', label: 'Avaliações no Google (850+ Opiniões)' },
  ];

  return (
    <section id="tradicao" className="py-24 lg:py-32 bg-[#0C0B0E] relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#E31837]/5 blur-[130px]" 
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Asymmetric Left: Master Pizzaiolo Craft Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/[0.1] bg-[#16151A] shadow-2xl shadow-black/80 group">
              <img
                src={pizzeriaCraftImg}
                alt="Mestre pizzaiolo da Gioia! Pizzeria abrindo massa artesanal com farinha fina"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" 
                aria-hidden="true" 
              />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-semibold block mb-1">
                  Mestria & Alma
                </span>
                <p className="text-sm font-medium text-white/95">
                  Cada massa é aberta à mão no tempo certo da fermentação natural.
                </p>
              </div>
            </div>

            {/* Small floating craft quote */}
            <div className="mt-4 flex items-center gap-3 text-xs text-[#8A8795] px-2">
              <Flame className="w-4 h-4 text-[#FF6B35]" />
              <span>Lenha nobre selecionada para conferir o defumado ideal.</span>
            </div>
          </div>

          {/* Right: Editorial Narrative & Concrete Proof */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#E31837] font-semibold mb-3">
              <span>Nossa História</span>
              <span className="text-white/20" aria-hidden="true">·</span>
              <span className="text-[#A19FA8]">Santa Rosa - RS</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 text-balance">
              O respeito sagrado pelo <span className="italic text-[#FF6B35]">tempo da massa.</span>
            </h2>

            <p className="text-base text-[#B5B3BE] leading-relaxed mb-8 font-normal text-balance">
              A Gioia! nasceu com o propósito de resgatar o sabor autêntico das pizzarias napolitanas. Nada de fermentos industriais ou pressa: nossas massas descansam por 48 horas em ambiente climatizado, ganhando alvéolos aerados e digestibilidade incomparável.
            </p>

            {/* The 3 Pillars */}
            <div className="space-y-6 mb-12">
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#FF6B35]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">48 Horas de Maturação Lenta</h3>
                  <p className="text-xs sm:text-sm text-[#9E9BA8] leading-relaxed">
                    Fermentação natural que quebra açúcares complexos, deixando a borda extremamente leve, estaladiça e fácil de digerir.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#E31837]">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Forno a Lenha a 450°C</h3>
                  <p className="text-xs sm:text-sm text-[#9E9BA8] leading-relaxed">
                    Assamento em 90 segundos que forma as manchas clássicas "leopardo", mantendo a umidade do queijo e o aroma fresco das ervas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#FF6B35]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Ingredientes de Origem Controlada</h3>
                  <p className="text-xs sm:text-sm text-[#9E9BA8] leading-relaxed">
                    Tomates San Marzano D.O.P. cultivados no solo vulcânico do Vesúvio e queijos artesanais de pequenos produtores.
                  </p>
                </div>
              </div>
            </div>

            {/* Proof Metric Strip in Tabular Figures */}
            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#8A8795] mt-1 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
