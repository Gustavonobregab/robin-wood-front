import Image from 'next/image';

export const Footer = () => {
  return (
    // MUDANÇA AQUI: bg-robin-red-600 e text-parchment
    <footer className="bg-robin-red-600 text-parchment border-t-2 border-ink py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Lado Esquerdo */}
        <div className="text-left md:w-1/3">
          <span className="font-serif font-black text-3xl flex items-center gap-2 text-parchment">
            <Image 
              src="/robin-logo.png" 
              alt="Robin Wood Logo" 
              width={32} 
              height={32}
            />
            RobinWood
          </span>
          <p className="font-mono text-xs mt-4 leading-relaxed text-parchment/80">
            Made in the deep forest, not a cubicle. <br/>
            We steal back the internet, one byte at a time.
            <br/><br/>
            <span className="text-parchment">WARNING:</span> Not affiliated with Robin Hood™ (the thief) or Robinhood™ (the app). We just like optimized wood.
          </p>
        </div>
        
        {/* Links */}
        <div className="flex gap-8 font-bold text-sm font-mono tracking-widest uppercase">
          <a href="#" className="text-parchment hover:text-parchment/80 hover:underline decoration-2 underline-offset-4 decoration-parchment transition-colors">Twitter</a>
          <a href="#" className="text-parchment hover:text-parchment/80 hover:underline decoration-2 underline-offset-4 decoration-parchment transition-colors">Github</a>
          <a href="#" className="text-parchment hover:text-parchment/80 hover:underline decoration-2 underline-offset-4 decoration-parchment transition-colors">Discord</a>
        </div>

        {/* Copyright */}
        <div className="font-mono text-xs text-parchment/70 md:text-right md:w-1/3">
          © 2026 RobinWood Inc.<br/>
          All taxes evaded successfully.
        </div>
      </div>
    </footer>
  );
};