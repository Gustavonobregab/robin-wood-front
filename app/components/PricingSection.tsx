import { Button } from './Button';

export function PricingSection() {
  return (
    <div className="animate-fade-delay-2 py-8">
      <div className="bg-black rounded-[3rem] p-8 md:p-16 border border-black text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-jakarta font-medium text-3xl md:text-5xl tracking-tight text-white mb-6">
            We only make money <br /> <span className="text-green-500">when you save money.</span>
          </h2>

          <p className="font-manrope text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            No tiers. No hidden fees. Our pricing model is simple: If you save 60% on your AI infrastructure
            costs, we take 20% of those savings.
          </p>

          {/* Comparison Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
            {/* Traditional */}
            <div className="bg-white/5 rounded-3xl p-6 border border-white/10 flex flex-col items-center">
              <span className="text-sm font-manrope font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Standard AI Cost
              </span>
              <div className="w-full h-48 bg-black rounded-xl relative flex items-end justify-center p-4">
                <div className="w-24 bg-red-400/80 h-full rounded-t-lg flex items-center justify-center text-white font-bold font-jakarta relative group">
                  <span className="z-10">$1000</span>
                  <div className="absolute inset-0 bg-red-400 blur opacity-20" />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-400">Full infrastructure cost</p>
            </div>

            {/* With Robin Wood */}
            <div className="bg-white/5 rounded-3xl p-6 border border-green-600/30 flex flex-col items-center relative">
              <div className="absolute -top-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Your Net Savings: $480
              </div>
              <span className="text-sm font-manrope font-semibold text-white uppercase tracking-wider mb-4">
                With Robin Wood
              </span>
              <div className="w-full h-48 bg-black rounded-xl relative flex items-end justify-center gap-1 p-4">
                {/* Base Cost */}
                <div className="w-24 bg-green-600 h-[40%] rounded-b-sm rounded-t-lg flex items-center justify-center text-white font-bold font-jakarta text-xs">
                  $400
                </div>
                {/* Fee */}
                <div className="w-24 bg-green-800 h-[12%] rounded-t-lg flex items-center justify-center text-green-100 font-bold font-jakarta text-xs border-b border-green-900">
                  $120
                </div>
              </div>
              <p className="mt-4 text-sm text-green-500">Reduced Cost + Performance Fee</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button variant="secondary" size="lg">
              Start Saving Today
            </Button>
            <Button variant="outline" size="lg">
              Calculate ROI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
