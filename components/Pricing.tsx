import { Button } from './ui/Button';

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-parchment border-t-2 border-ink relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif font-black text-6xl mb-16">The Bounty Board</h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 items-end">
          
          {/* FREE TIER */}
          <div className="bg-white border-2 border-ink w-full md:w-80 p-6 shadow-hard text-left relative -rotate-1 hover:rotate-0 transition-transform">
            <div className="border-b-2 border-dashed border-ink pb-4 mb-4">
              <h3 className="font-serif font-bold text-2xl">The Peasant</h3>
              <p className="font-mono text-xs text-gray-500">For side-projects & rebels</p>
            </div>
            <ul className="font-mono text-sm space-y-3 mb-8">
              <li>✅ 10min audio/mo</li>
              <li>✅ 50k chars text</li>
              <li>❌ API Access</li>
            </ul>
            <div className="text-4xl font-black font-serif mb-4">$0 <span className="text-sm font-normal text-gray-500">/mo</span></div>
            <Button variant="outline" className="w-full">Join Layout</Button>
          </div>

          {/* PRO TIER (Merry Men) */}
          {/* Adicionei 'relative' e garanto que o badge esteja visível */}
          <div className="bg-ink text-parchment border-2 border-ink w-full md:w-96 p-8 shadow-hard-xl text-left relative z-10 md:-translate-y-6">
            
            {/* CORREÇÃO DO BADGE: z-50 para ficar na frente de tudo */}
            <div className="absolute -top-4 left-0 right-0 flex justify-center z-50">
              <span className="bg-robin-neon text-ink border-2 border-ink px-4 py-1 font-mono font-bold text-xs shadow-hard-sm uppercase tracking-wider bg-[#00C16C]">
                Most Wanted
              </span>
            </div>

            <div className="border-b-2 border-dashed border-gray-700 pb-4 mb-4">
              <h3 className="font-serif font-bold text-3xl text-sheriff-gold">Merry Men</h3>
              <p className="font-mono text-xs text-gray-400">For startups & heavy hitters</p>
            </div>
            <ul className="font-mono text-sm space-y-3 mb-8 text-gray-300">
              <li>✅ 1,000min audio/mo</li>
              <li>✅ 10M chars text</li>
              <li>✅ High-Speed REST API</li>
              <li>✅ Priority "Heist" Support</li>
            </ul>
            <div className="text-5xl font-black font-serif mb-6">$29 <span className="text-sm font-normal text-gray-400">/mo</span></div>
            <Button variant="primary" className="w-full font-bold">Start the Rebellion</Button>
          </div>

        </div>
      </div>
    </section>
  );
};