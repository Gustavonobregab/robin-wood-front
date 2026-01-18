import Image from 'next/image';
import { Button } from '@/components/ui/Button';

const ArrowIcon = ({ className }: { className?: string }) => (
  <Image 
    src="/arrow.svg" 
    alt="Flying Arrow" 
    width={400} 
    height={100} 
    className={`${className} w-full h-auto drop-shadow-sm`} 
    priority 
  />
);

const BackgroundArrows = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-60">
      <div className="absolute top-[10%] -left-96 animate-arrow-fly-1 w-64 h-auto" style={{ animationDelay: '-5s' }}>
        <ArrowIcon />
      </div>
      <div className="absolute top-[40%] -left-96 animate-arrow-fly-2 w-48 h-auto" style={{ animationDelay: '-12s' }}>
        <ArrowIcon />
      </div>
      <div className="absolute top-[70%] -left-96 animate-arrow-fly-3 w-80 h-auto" style={{ animationDelay: '-2s' }}>
        <ArrowIcon />
      </div>
      <div className="absolute top-[25%] -left-96 animate-arrow-fly-1 w-56 h-auto" style={{ animationDelay: '-18s' }}>
        <ArrowIcon />
      </div>
    </div>
  );
};

export const Hero = () => {
  return (
    // MUDANÇA AQUI: Adicionei 'pb-20'
    // Isso cria um colchão de 80px (5rem) na parte de baixo do Hero.
    // No mobile, isso separa o botão do Marquee. 
    // No desktop, não atrapalha o alinhamento central.
    <section className="relative w-full flex-1 flex flex-col justify-center items-center px-6 pb-20 overflow-hidden bg-parchment">
      
      <BackgroundArrows />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        <div className="inline-block bg-robin-red-600 border-2 border-ink px-3 py-2.5 rounded-full font-mono text-xs font-bold shadow-hard-sm mb-6 -rotate-2 hover:rotate-0 transition-transform duration-600 cursor-default text-parchment">
          Beta Tester Discount
        </div>

        <h1 className="font-serif font-black text-6xl md:text-8xl leading-[0.9] mb-8 text-ink">
          They dont care<br />
          <span className="font-serif bg-clip-text font-black text-ink">
            About your <span className="text-robin-neon">Money</span>
          </span>
        </h1>

        <p className="font-sans text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-12 text-ink/80 leading-relaxed">
          Compress prompts. Save tokens. Keep your money. 
          We optimize your AI requests to reduce costs by up to 76% without losing quality.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button variant="primary" className="text-lg w-full md:w-auto min-w-[200px]">
            Start Stealing
          </Button>
        </div>

      </div>
    </section>
  );
};