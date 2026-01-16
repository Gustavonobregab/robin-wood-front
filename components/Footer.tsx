export const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-ink py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-left">
          <span className="font-serif font-black text-2xl flex items-center gap-2">
            <div className="w-6 h-6 bg-ink rounded-full"></div> RobinWood
          </span>
          <p className="font-mono text-xs mt-2 max-w-xs text-gray-600">
            Made in the forest, not a cubicle. <br/>
            Stealing back the internet, one byte at a time.
          </p>
        </div>
        
        <div className="flex gap-6 font-bold text-sm underline decoration-2 underline-offset-4 font-mono">
          <a href="#" className="hover:text-robin-green hover:decoration-robin-green">Twitter</a>
          <a href="#" className="hover:text-robin-green hover:decoration-robin-green">Github</a>
          <a href="#" className="hover:text-robin-green hover:decoration-robin-green">Discord</a>
        </div>

        <div className="font-mono text-xs text-gray-500">
          © 2026 RobinWood Inc.
        </div>
      </div>
    </footer>
  );
};