import { Button } from './ui/Button';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-ink bg-parchment/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-robin-green border-2 border-ink rounded-full flex items-center justify-center font-serif font-black text-xl group-hover:rotate-12 transition-transform">
            R
          </div>
          <span className="font-serif font-black text-2xl tracking-tighter">RobinWood</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 font-mono font-bold text-sm uppercase tracking-wider">
          <a href="#mission" className="hover:underline decoration-2 underline-offset-4 decoration-robin-green">The Mission</a>
          <a href="#loot" className="hover:underline decoration-2 underline-offset-4 decoration-robin-green">The Loot</a>
          <a href="#pricing" className="hover:underline decoration-2 underline-offset-4 decoration-robin-green">Bounty</a>
        </div>

        {/* CTA */}
        <Button variant="outline" className="hidden md:block py-2 text-sm rounded-full">
          Join the Rebellion
        </Button>
      </div>
    </nav>
  );
};