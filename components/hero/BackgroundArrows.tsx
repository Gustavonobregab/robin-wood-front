import React from 'react';

// Ícone de flecha simples (SVG inline)
const ArrowIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export const BackgroundArrows = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-20">
      {/* Flecha 1 - Rápida, topo */}
      <div className="absolute top-[10%] left-0 animate-arrow-fly-1 text-ink w-16 h-16">
        <ArrowIcon />
      </div>
      
      {/* Flecha 2 - Média, meio */}
      <div className="absolute top-[40%] left-0 animate-arrow-fly-2 text-ink w-12 h-12 animation-delay-[2000ms]" style={{ animationDelay: '2s' }}>
        <ArrowIcon />
      </div>

      {/* Flecha 3 - Lenta, baixo */}
      <div className="absolute top-[70%] left-0 animate-arrow-fly-3 text-ink w-20 h-20 animation-delay-[5000ms]" style={{ animationDelay: '5s' }}>
        <ArrowIcon />
      </div>
       {/* Flecha 4 - Extra */}
       <div className="absolute top-[25%] left-0 animate-arrow-fly-1 text-robin-green w-10 h-10 animation-delay-[7000ms]" style={{ animationDelay: '7s' }}>
        <ArrowIcon />
      </div>
    </div>
  );
};