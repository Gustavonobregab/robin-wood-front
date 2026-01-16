import React from 'react';

export const BackgroundFloating = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* Ícone 1: O Alvo (Canto superior esquerdo) */}
      <div className="absolute top-20 left-[10%] animate-float opacity-10 text-ink">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
        </svg>
      </div>

      {/* Ícone 2: O Dinheiro (Canto inferior direito) */}
      <div className="absolute bottom-20 right-[5%] animate-float opacity-20 text-sheriff-gold" style={{ animationDelay: '-2s' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>
        </svg>
      </div>

       {/* Ícone 3: A Pena/Robin (Meio esquerda) */}
       <div className="absolute top-[40%] left-[5%] animate-float opacity-10 text-robin-green" style={{ animationDelay: '-4s' }}>
       <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
      </div>

    </div>
  );
};