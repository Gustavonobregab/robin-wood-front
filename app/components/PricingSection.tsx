import { Button } from './Button';

export function PricingSection() {
  return (
    <div className="animate-fade-delay-2 py-8 md:py-12">
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
