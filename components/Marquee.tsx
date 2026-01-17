export const Marquee = () => {
  const items = [
    "Steal your tokens back",
    "Defund the Sheriff",
    "Chop the Deadwood",
    "Silence is Expensive",
    "RobinWood",
    "Loot Secured",
    "Data Diet",
  ];

  return (
    <div className="w-full bg-robin-red-600 border-y-2 border-ink py-4 overflow-hidden flex">
      <div className="animate-marquee whitespace-nowrap flex gap-12 font-mono font-bold text-xl uppercase tracking-widest items-center text-ink">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span>{item}</span>
            <span className="w-2 h-2 bg-ink rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};