const FeatureCard = ({ icon, title, desc, color }: { icon: string, title: string, desc: string, color: string }) => (
  <div className={`${color} border-2 border-ink p-8 rounded-2xl shadow-hard hover:-translate-y-1 hover:translate-x-1 hover:shadow-none transition-all cursor-default`}>
    <div className="w-12 h-12 bg-white border-2 border-ink rounded-full flex items-center justify-center text-2xl mb-6 shadow-hard-sm">
      {icon}
    </div>
    <h3 className="font-serif font-bold text-2xl mb-3 text-ink">{title}</h3>
    <p className="font-sans font-medium text-ink/90 leading-snug">{desc}</p>
  </div>
);

export const Features = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          color="bg-danger-pink"
          icon="✂️"
          title="Silence Slaughter"
          desc="We detect dead air and pauses in audio files and chop them out. Whisper API charges by the second. Don't pay for silence."
        />
        <FeatureCard 
          color="bg-sheriff-gold"
          icon="🏎️"
          title="Smart Speedup"
          desc="Time-stretch audio without the 'chipmunk effect'. Keep the intelligibility, cut the duration (and the bill) in half."
        />
        <FeatureCard 
          color="bg-robin-green"
          icon="📜"
          title="Text Shredder"
          desc="We replace polite corporate words with efficient synonyms. JSON minification on steroids. Your prompt, but skinnier."
        />
      </div>
    </section>
  );
};