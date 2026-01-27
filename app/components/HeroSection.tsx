import { Badge } from './Badge';
import { Navbar } from './Navbar';
import { FeaturePreview } from './FeaturePreview';
import { CompressingTitle } from './CompressingTitle';

export function HeroSection() {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-neutral-200 overflow-hidden relative animate-fade flex flex-col items-center">
      <Navbar />

      {/* Hero Content */}
      <div className="w-full px-4 pt-16 pb-12 md:pt-20 md:pb-16 flex flex-col items-center text-center relative z-10">
        <Badge variant="status" className="mb-6">
          <span className="text-xs font-semibold font-manrope text-green-700 uppercase tracking-wide">
            BETA DISCOUNT
          </span>
        </Badge>

        <CompressingTitle />

        <p className="font-manrope text-lg text-slate-500 max-w-xl mb-12 mt-8">
          Reduce bandwidth costs by up to 60% with context-aware semantic compression.
        </p>

        <FeaturePreview />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:200px_200px] pointer-events-none z-0" />
    </div>
  );
}
