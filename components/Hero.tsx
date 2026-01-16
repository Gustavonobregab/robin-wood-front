import { Button } from '@/components/ui/button';

// --- Componente Principal ---
export const Hero = () => {
  return (
    <section className="relative pt-24 pb-24 px-6 overflow-hidden bg-parchment">
      
      {/* 2. Conteúdo Principal */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-block bg-robin-red-600 border-2 border-ink px-3 py-2.5 rounded-full font-mono text-xs font-bold shadow-hard-sm mb-2 -rotate-2 hover:rotate-0 transition-transform duration-600 cursor-default text-parchment">
          Beta Tester Discount
        </div>

        {/* Headline */}
        <h1 className="font-serif font-black text-6xl md:text-8xl leading-[0.9] mb-6 text-ink">
          They dont care<br />
          <span className="font-serif bg-clip-text font-black text-ink">
            About your <span className="text-robin-neon">Money</span>
          </span>
        </h1>

        {/* Subhead */}
        <p className="font-sans text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-10 text-ink/80 leading-relaxed">
          Compress prompts. Save tokens. Keep your money. 
          We optimize your AI requests to reduce costs by up to 76% without losing quality.
        </p>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button variant="primary" className="text-lg w-full md:w-auto min-w-[200px]">
            Start Stealing
          </Button>
        </div>

      </div>
    </section>
  );
};