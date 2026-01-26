import { cn } from '@/components/utils';

interface CodeBlockProps {
  className?: string;
}

export function CodeBlock({ className }: CodeBlockProps) {
  return (
    <div
      className={cn(
        'w-full max-w-3xl bg-[#0B0F19] rounded-2xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden group text-left mx-auto transform transition-transform hover:scale-[1.01] duration-500',
        className
      )}
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Window Controls */}
      <div className="flex items-center justify-between mb-6 border-b border-slate-800/50 pb-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex gap-4">
          <span className="text-xs font-mono text-green-500 border-b border-green-500/50 cursor-pointer">
            usage.js
          </span>
        </div>
      </div>

      {/* Code Content */}
      <div className="font-mono text-sm md:text-base leading-relaxed overflow-x-auto no-scrollbar">
        <div className="text-slate-500 mb-2">{'// Initialize the compressor'}</div>
        <div>
          <span className="text-purple-400">import</span> {`{ `}
          <span className="text-yellow-200">RobinWood</span>
          {` }`} <span className="text-purple-400">from</span>{' '}
          <span className="text-green-400">&apos;@robinwood/sdk&apos;</span>;
        </div>
        <br />
        <div className="text-slate-500 mb-2">{'// Compress stream in real-time'}</div>
        <div>
          <span className="text-purple-400">const</span> <span className="text-blue-400">stream</span> ={' '}
          <span className="text-purple-400">await</span> <span className="text-yellow-200">RobinWood</span>.
          <span className="text-blue-300">shrink</span>({`{`}
        </div>
        <div className="pl-4">
          <span className="text-blue-300">source</span>: <span className="text-blue-400">inputStream</span>,
        </div>
        <div className="pl-4">
          <span className="text-blue-300">mode</span>: <span className="text-green-400">&apos;lossless&apos;</span>,
        </div>
        <div className="pl-4">
          <span className="text-blue-300">intelligent</span>: <span className="text-orange-400">true</span>
        </div>
        <div>{`});`}</div>
      </div>
    </div>
  );
}
