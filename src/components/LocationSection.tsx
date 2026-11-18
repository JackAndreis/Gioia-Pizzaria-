import { MapPin, Phone, MessageCircle, Clock, ExternalLink } from 'lucide-react';
import { 
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY, 
  ADDRESS_TEXT, 
  GOOGLE_MAPS_URL, 
  createWhatsAppUrl 
} from '../data/menu';

export function LocationSection() {
  const whatsappUrl = createWhatsAppUrl('Olá! Gostaria de informações ou fazer uma reserva na Gioia! Pizzeria.');

  return (
    <section id="localizacao" className="py-24 lg:py-32 bg-[#0C0B0E] relative border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#E31837] font-semibold mb-3">
            <span>Visita & Atendimento</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span className="text-[#A19FA8]">Centro de Santa Rosa</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Venha Sentir o Aroma do <span className="italic text-[#FF6B35]">Fogo a Lenha</span>
          </h2>
        </div>

        {/* 2-Column Grid: Contact Information & Interactive Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address Card */}
            <div className="p-8 rounded-2xl bg-[#151419] border border-white/[0.08] hover:border-white/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E31837]/10 text-[#E31837] border border-[#E31837]/20">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-[#FF6B35] font-semibold mb-1">
                    Endereço
                  </h3>
                  <p className="text-base font-medium text-white mb-3">
                    {ADDRESS_TEXT}
                  </p>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B35] hover:text-[#FFA07A] transition-colors"
                  >
                    <span>Abrir no Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-8 rounded-2xl bg-[#151419] border border-white/[0.08] hover:border-white/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-[#FF6B35] font-semibold mb-1">
                    Telefone & WhatsApp
                  </h3>
                  <a 
                    href={`tel:+${WHATSAPP_NUMBER}`} 
                    className="block text-xl font-mono font-bold text-white hover:text-[#E31837] transition-colors tabular-nums mb-3"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#E31837] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[#C2132D] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Conversar no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Service Hours Card */}
            <div className="p-8 rounded-2xl bg-[#151419] border border-white/[0.08]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-[#A19FA8] border border-white/[0.08]">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-[#A19FA8] font-semibold mb-1">
                    Horário de Atendimento
                  </h3>
                  <p className="text-sm text-white font-medium">
                    Terça a Domingo: <span className="font-mono text-[#FF6B35]">18h00 às 23h00</span>
                  </p>
                  <p className="text-xs text-[#7A7785] mt-1">
                    Segunda-feira: Fechado para manutenção do forno e maturação das massas
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Map Preview & Santa Rosa Highlight */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-[#151419] border border-white/[0.08] overflow-hidden p-8 sm:p-10 relative group">
            
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-[#FF6B35] font-semibold block mb-2">
                Localização Privilegiada
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                No Centro de Santa Rosa
              </h3>
              <p className="text-sm text-[#9E9BA8] max-w-lg leading-relaxed">
                Estacionamento facilitado na Rua Minas Gerais, salão acolhedor à luz de velas e vista panorâmica para o forno a lenha napolitano.
              </p>
            </div>

            {/* Styled Map Graphic Container */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#1E1D24] flex items-center justify-center">
              
              {/* Background stylised dark map grid */}
              <div 
                className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" 
                aria-hidden="true" 
              />
              
              <div className="relative z-10 flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-full bg-[#E31837] text-white flex items-center justify-center shadow-xl shadow-[#E31837]/40 animate-bounce">
                  <MapPin className="h-8 w-8" />
                </div>
                <div className="mt-4 font-display text-lg font-bold text-white">
                  Gioia! Pizzeria
                </div>
                <div className="text-xs text-[#B5B3BE] mt-1">
                  R. Minas Gerais, 96 - Centro, Santa Rosa - RS
                </div>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-colors"
                >
                  <span>Como Chegar via GPS</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-[#7A7785] pt-4 border-t border-white/[0.06]">
              <span>Delivery em toda Santa Rosa</span>
              <span className="text-white/20" aria-hidden="true">·</span>
              <span>Retiradas rápidas no balcão</span>
              <span className="text-white/20" aria-hidden="true">·</span>
              <span>Mesas por ordem de chegada ou reserva</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
