import { Button } from './ui/Button';

export const Hero = () => {
  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-block bg-sheriff-gold border-2 border-ink px-4 py-1 rounded-full font-mono text-xs font-bold shadow-hard-sm mb-8 -rotate-2 hover:rotate-0 transition-transform cursor-default">
          🏹 WANTED: BLOATED FILES
        </div>

        {/* Headline */}
        <h1 className="font-serif font-black text-6xl md:text-8xl leading-[0.9] mb-8 text-ink">
          Steal from the bloat.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-robin-green to-emerald-600">
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