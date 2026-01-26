import { cn } from '@/components/utils';

interface Client {
  name: string;
  shape: 'square' | 'circle' | 'diamond' | 'outline';
}

const clients: Client[] = [
  { name: 'Acme', shape: 'square' },
  { name: 'Sphere', shape: 'circle' },
  { name: 'Kite', shape: 'diamond' },
  { name: 'Box', shape: 'outline' },
];

const shapeStyles: Record<Client['shape'], string> = {
  square: 'w-5 h-5 rounded bg-slate-800',
  circle: 'w-5 h-5 rounded-full bg-slate-800',
  diamond: 'w-5 h-5 rotate-45 bg-slate-800',
  outline: 'w-5 h-5 rounded-sm border-2 border-slate-800',
};

interface ClientsStripProps {
  className?: string;
}

export function ClientsStrip({ className }: ClientsStripProps) {
  return (
    <div
      className={cn(
        'w-full flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-4 animate-fade-delay-1',
        className
      )}
    >
      <p className="text-sm font-manrope text-slate-400 font-medium">
        Powering the next generation of apps
      </p>
      <div className="flex gap-8 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
        {clients.map((client) => (
          <div key={client.name} className="flex items-center gap-2">
            <div className={shapeStyles[client.shape]} />
            <span className="font-jakarta font-bold text-slate-800">{client.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
