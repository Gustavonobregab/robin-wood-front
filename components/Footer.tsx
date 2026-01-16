export const Footer = () => {
  return (
    // MUDANÇA AQUI: bg-ink e text-parchment
    <footer className="bg-ink text-parchment border-t-2 border-ink py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Lado Esquerdo */}
        <div className="text-left md:w-1/3">
          <span className="font-serif font-black text-3xl flex items-center gap-2 text-robin-green">
            <div className="w-6 h-6 bg-robin-green border-2 border-parchment rounded-full"></div> 
            RobinWood
          </span>
          <p className="font-mono text-xs mt-4 leading-relaxed text-gray-400">
            Made in the deep forest, not a cubicle. <br/>
            We steal back the internet, one byte at a time.
            <br/><br/>
            <span className="text-sheriff-gold">WARNING:</span> Not affiliated with Robin Hood™ (the thief) or Robinhood™ (the app). We just like optimized wood.
          </p>
        </div>
        
        {/* Links */}
        <div className="flex gap-8 font-bold text-sm font-mono tracking-widest uppercase">
          <a href="#" className="hover:text-robin-green hover:underline decoration-2 underline-offset-4 decoration-robin-green transition-colors">Twitter</a>
          <a href="#" className="hover:text-robin-green hover:underline decoration-2 underline-offset-4 decoration-robin-green transition-colors">Github</a>
          <a href="#" className="hover:text-robin-green hover:underline decoration-2 underline-offset-4 decoration-robin-green transition-colors">Discord</a>
        </div>

        {/* Copyright */}
        <div className="font-mono text-xs text-gray-500 md:text-right md:w-1/3">
          © 2026 RobinWood Inc.<br/>
          All taxes evaded successfully.
        </div>
      </div>
    </footer>
  );
};