import { Navbar } from './Navbar';
import { FeaturePreview } from './FeaturePreview';
import { CompressingTitle } from './CompressingTitle';

export function HeroSection() {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-neutral-200 overflow-hidden relative animate-fade flex flex-col items-center">
      <Navbar />

      {/* Hero Content */}
      <div className="w-full px-4 pt-12 pb-12 md:pt-14 md:pb-16 flex flex-col items-center text-center relative z-20">
        <CompressingTitle />

        <p className="font-manrope text-lg text-slate-500 max-w-xl mb-6 mt-4">
          Reduce bandwidth costs by up to 60% with context-aware semantic compression.
        </p>

        <FeaturePreview />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:200px_200px] pointer-events-none z-0" />
      
      {/* Fade overlay - starts at 50% and fades to white */}
      <div className="absolute inset-0 pointer-events-none z-10" 
           style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, white 100%)' }} />
    </div>
  );
}
