import React from 'react';

export const DemoSection = () => {
  return (
    <section className="py-24 border-b-2 border-ink" style={{ backgroundColor: '#00C16C' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif font-black text-6xl mb-4 text-ink">The Wood Chipper</h2>
          <p className="font-sans text-xl text-ink/80">We turn expensive payloads into cheap context.</p>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          
          {/* BEFORE CARD */}
          <div className="relative group">
            {/* Badge Branco - Também aumentei o z-index por garantia */}
            <div className="absolute -top-3 -left-3 bg-parchment border-2 border-ink px-3 py-1 font-mono font-bold text-xs shadow-hard-sm z-50 -rotate-3 text-ink">
              THE SHERIFF'S PRICE
            </div>
            <div className="bg-parchment border-2 border-ink rounded-xl p-6 shadow-hard h-full font-mono text-xs md:text-sm relative">
              <div className="text-gray-500 mb-2">// Original Payload (Fat)</div>
              <div className="space-y-1">
                <p>{"{"}</p>
                <p className="pl-4">"audio": "file_with_silence.mp3",</p>
                <p className="pl-4">"transcript": "Hello, um, I would like..."</p>
                <p className="pl-4 text-red-500 bg-red-100 inline-block">"metadata": {"{ unused: true }"}</p>
                <p>{"}"}</p>
              </div>
              <div className="mt-4 border-t-2 border-dashed border-ink pt-2 font-bold text-red-600">
                COST: $0.050
              </div>
            </div>
          </div>

          {/* ARROW */}
          <div className="flex justify-center text-4xl md:rotate-0 rotate-90">
            🪓
          </div>

          {/* AFTER CARD (Onde estava o problema) */}
          <div className="relative">
            {/* CORREÇÃO AQUI: z-50 e garantindo a cor hex */}
            <div className="absolute -top-3 -right-3 bg-parchment border-2 border-ink px-3 py-1 font-mono font-bold text-xs shadow-hard-sm z-50 rotate-3 text-ink">
              THE OUTLAW'S PRICE
            </div>
            <div className="bg-parchment text-ink border-2 border-ink rounded-xl p-6 shadow-hard-xl h-full font-mono text-xs md:text-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 text-4xl opacity-20">💰</div>
              <div className="text-gray-500 mb-2">// Optimized (Lean)</div>
              <div className="space-y-1">
                <p>{"{"}</p>
                <p className="pl-4">"aud": "opt.mp3", <span className="text-gray-500">// -40% duration</span></p>
                <p className="pl-4">"txt": "Hello,I'd like..."</p>
                <p className="pl-4 text-gray-500">// Bloat removed</p>
                <p>{"}"}</p>
              </div>
              <div className="mt-4 border-t-2 border-dashed border-ink pt-2 font-bold text-robin-green text-lg">
                COST: $0.012 (-76%)
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};