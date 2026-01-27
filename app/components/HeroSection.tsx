import { Badge } from './Badge';
import { Navbar } from './Navbar';
import { FeaturePreview } from './FeaturePreview';

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

        <h1 className="font-jakarta font-semibold text-5xl md:text-7xl tracking-tighter text-slate-900 leading-[1.1] max-w-4xl mb-6">
          Intelligent compression <br className="hidden md:block" /> for the AI era.
        </h1>

        <p className="font-manrope text-lg text-slate-500 max-w-xl mb-12">
          Reduce bandwidth costs by up to 60% with context-aware semantic compression.
        </p>

        <FeaturePreview />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0" />
    </div>
  );
}
