import { motion } from 'motion/react';
import { MessageCircle, ArrowDownRight, Flame } from 'lucide-react';
import { createWhatsAppUrl } from '../data/menu';
import heroWoodfiredPizza from '../assets/images/hero_woodfired_pizza_1794436385292.jpg';

export function Hero() {
  const whatsappUrl = createWhatsAppUrl('Olá! Gostaria de fazer um pedido na Gioia! Pizzeria.');

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center py-20 lg:py-28 overflow-hidden bg-[#0C0B0E]"
    >
      {/* Full-bleed Background Photography */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroWoodfiredPizza}
          alt="Pizza artesanal da Gioia! Pizzeria saindo fumegante do forno a lenha napolitano"
          className="h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {/* Measured directional & vignette scrims for high text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0C0B0E]/95 via-[#0C0B0E]/75 to-[#0C0B0E]/30 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0C0B0E] via-transparent to-[#0C0B0E]/50 pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* Subtle warm ember ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 z-0 h-[480px] w-[480px] rounded-full bg-[#E31837]/15 blur-[140px]"
        aria-hidden="true"
      />

      {/* Overlaid Editorial Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 w-full">
        <div className="max-w-2xl">
          {/* Unboxed editorial kicker with subtle separator */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#FF6B35] font-semibold mb-6"
          >
            <span className="flex items-center gap-1.5 text-[#FF6B35]">
              <Flame className="w-3.5 h-3.5 text-[#E31837]" />
              Santa Rosa · RS
            </span>
            <span className="text-white/25" aria-hidden="true">/</span>
            <span className="text-white/80">Forno a 450°C</span>
            <span className="text-white/25" aria-hidden="true">/</span>
            <span className="text-white/80">Massa Viva 48h</span>
          </motion.div>

          {/* Monumental Headline (Playfair Display) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold leading-[1.03] tracking-tight text-white mb-6 text-balance drop-shadow-sm"
          >
            Fogo a lenha, fermentação lenta e{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E31837] via-[#FF6B35] to-[#FF8C42]">
              pura paixão.
            </span>
          </motion.h1>

          {/* Single crisp supporting sentence */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#E0DEE6] leading-relaxed max-w-xl font-normal mb-10 text-balance"
          >
            Pizzas napolitanas autênticas com farinha italiana 00, molho San Marzano D.O.P. e queijos nobres assadas na brasa viva em segundos.
          </motion.p>

          {/* Primary Action Button & Secondary Route */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#E31837] px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-xl shadow-[#E31837]/35 transition-all duration-200 hover:bg-[#C2132D] hover:shadow-2xl hover:shadow-[#E31837]/50 active:scale-95"
            >
              <MessageCircle className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              <span className="whitespace-nowrap">Conversar no WhatsApp</span>
            </a>

            <a
              href="#cardapio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-black/35 px-7 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:border-white/45 hover:bg-black/55 active:scale-95"
            >
              <span>Ver Cardápio</span>
              <ArrowDownRight className="h-4 w-4 text-[#FF6B35]" />
            </a>
          </motion.div>

          {/* Quiet trust markers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-white/75"
          >
            <div>
              <span className="font-semibold text-white tabular-nums">48 Horas</span> de Maturação Natural
            </div>
            <span className="text-white/30" aria-hidden="true">·</span>
            <div>
              <span className="font-semibold text-white tabular-nums">4.9★</span> no Google
            </div>
            <span className="hidden sm:inline text-white/30" aria-hidden="true">·</span>
            <div className="hidden sm:block font-mono text-[#FFB188] tabular-nums">
              Forno a Lenha 450°C · 90s
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
