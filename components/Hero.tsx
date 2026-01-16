import Image from 'next/image';
import { Button } from './ui/Button';

// --- Componente da Flecha usando a Imagem ---
const ArrowIcon = ({ className }: { className?: string }) => (
  // O Image do Next.js exige width/height para saber a proporção,
  // mas a classe w-full h-auto permite que o pai controle o tamanho real.
  <Image 
    src="/arrow.svg" 
    alt="Robin Wood Arrow" 
    width={400} 
    height={80} 
    className={`${className} w-full h-auto`} 
    priority // Carrega rápido pois está na primeira dobra (Hero)
  />
);

const BackgroundArrows = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-40">
      
      {/* Flecha 1 - Topo, Rápida */}
      <div className="absolute top-[10%] -left-96 animate-arrow-fly-1 w-64 h-auto">
        <ArrowIcon />
      </div>
      
      {/* Flecha 2 - Meio, Média (Delay 2s) */}
      <div className="absolute top-[40%] -left-96 animate-arrow-fly-2 w-48 h-auto" style={{ animationDelay: '0s' }}>
        <ArrowIcon />
      </div>

      {/* Flecha 3 - Baixo, Lenta (Delay 5s) */}
      <div className="absolute top-[70%] -left-96 animate-arrow-fly-3 w-80 h-auto" style={{ animationDelay: '3s' }}>
        <ArrowIcon />
      </div>
      
      {/* Flecha 4 - Extra (Delay 7s) */}
      <div className="absolute top-[25%] -left-96 animate-arrow-fly-1 w-56 h-auto" style={{ animationDelay: '5s' }}>
        <ArrowIcon />
      </div>
    </div>
  );
};

// --- Componente Principal ---
export const Hero = () => {
  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      
      {/* 1. Animação de Fundo */}
      <BackgroundArrows />

      {/* 2. Conteúdo Principal */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-block bg-sheriff-gold border-2 border-ink px-4 py-1 rounded-full font-mono text-xs font-bold shadow-hard-sm mb-8 -rotate-2 hover:rotate-0 transition-transform cursor-default">
          🏹 WANTED: BLOATED FILES
        </div>

        {/* Headline */}
        <h1 className="font-serif font-black text-6xl md:text-8xl leading-[0.9] mb-8 text-ink">
          Steal from the bloat.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C16C] to-emerald-700">
            Give to the dev.
          </span>
        </h1>

        {/* Subhead */}
        <p className="font-sans text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-12 text-ink/80 leading-relaxed">
          The Sheriff of Tokenham (AWS & OpenAI) charges you for every useless byte. 
          We act as the middleware outlaw that <span className="bg-danger-pink/30 px-1 border-b-2 border-danger-pink">shreds the fat</span> before you pay the tax.
        </p>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button variant="primary" className="text-lg w-full md:w-auto min-w-[200px]">
            Launch the Heist
          </Button>
          
          <div className="font-mono text-sm bg-ink text-parchment px-6 py-3 rounded-lg border-2 border-ink shadow-hard flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
            <span>$</span> npm install robin-wood
          </div>
        </div>

      </div>
    </section>
  );
};