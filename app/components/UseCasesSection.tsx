'use client';

import { cn } from '@/components/utils';

interface UseCase {
  id: string;
  description: string;
  highlight: string;
  label: string;
  visual: React.ReactNode;
}

function PromptVisual() {
  return (
    <div className="w-full h-full bg-slate-200 rounded-2xl" />
  );
}

function MemoryVisual() {
  return (
    <div className="w-full h-full bg-slate-200 rounded-2xl" />
  );
}

function PodcastVisual() {
  return (
    <div className="w-full h-full bg-slate-200 rounded-2xl" />
  );
}

function DocumentVisual() {
  return (
    <div className="w-full h-full bg-slate-200 rounded-2xl" />
  );
}

const useCases: UseCase[] = [
  {
    id: 'prompts',
    description: 'Reduce prompts',
    highlight: 'before sending to AI',
    label: 'AI Cost Reduction',
    visual: <PromptVisual />,
  },
  {
    id: 'memory',
    description: 'Save memory',
    highlight: 'with compressed context',
    label: 'Memory Optimization',
    visual: <MemoryVisual />,
  },
  {
    id: 'podcast',
    description: 'Compress podcasts',
    highlight: 'before transcribing',
    label: 'Transcription Prep',
    visual: <PodcastVisual />,
  },
  {
    id: 'docs',
    description: 'Optimize documents',
    highlight: 'for faster APIs',
    label: 'API Efficiency',
    visual: <DocumentVisual />,
  },
];

export function UseCasesSection() {
  return (
    <section className="py-8 md:py-12">
      <h2 className="font-jakarta font-semibold text-4xl md:text-6xl tracking-tighter text-end text-slate-900 leading-[1.1] mb-12">
        Built for real-world use cases
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {useCases.map((useCase) => (
          <div key={useCase.id} className="flex flex-col">
            {/* Description */}
            <p className="font-manrope text-base text-slate-600 mb-4">
              {useCase.description}
              <br />
              with <span className="font-semibold text-slate-900">{useCase.highlight}</span>
            </p>

            {/* Visual Card */}
            <div className="aspect-square w-full mb-4">
              {useCase.visual}
            </div>

            {/* Label */}
            <div className="flex items-center gap-2">
              <span className="font-manrope text-sm font-medium text-slate-700">
                {useCase.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
