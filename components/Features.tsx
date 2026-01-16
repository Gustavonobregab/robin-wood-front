interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

const FeatureCard = ({ icon, title, desc, color }: FeatureCardProps) => (
  <div className={`${color} border-2 border-ink p-8 rounded-2xl shadow-hard hover:-translate-y-1 hover:translate-x-1 hover:shadow-none hover:rotate-1 transition-all cursor-default h-full`}>
    <div className="w-12 h-12 bg-white border-2 border-ink rounded-full flex items-center justify-center text-2xl mb-6 shadow-hard-sm">
      {icon}
    </div>
    <h3 className="font-serif font-bold text-2xl mb-3 text-ink">{title}</h3>
    <p className="font-sans font-medium text-ink/90 leading-snug">{desc}</p>
  </div>
);

export const Features = () => {
  return (
    // CORREÇÃO: Usando bg-robin-red-600 (vermelho) 
    <section className="py-24 px-6 bg-robin-red-600 border-y-2 border-ink relative">
      
      {/* Label decorativa no topo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink text-parchment px-4 py-1 font-mono text-xs font-bold border-2 border-parchment rotate-2 shadow-hard-sm z-10">
        THE ARMORY
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            color="bg-parchment" 
            icon="✂️"
            title="Silence Slaughter"
            desc="We detect dead air and pauses in audio files and chop them out. Whisper API charges by the second. Don't pay for silence."
          />
          <FeatureCard 
            color="bg-parchment" 
            icon="🏎️"
            title="Smart Speedup"
            desc="Time-stretch audio without the 'chipmunk effect'. Keep the intelligibility, cut the duration (and the bill) in half."
          />
          <FeatureCard 
            color="bg-parchment" 
            icon="📜"
            title="Text Shredder"
            desc="We replace polite corporate words with efficient synonyms. JSON minification on steroids. Your prompt, but skinnier."
          />
        </div>
      </div>
    </section>
  );
};