'use client';

import { useState } from 'react';
import { cn } from '@/components/utils';

type FeatureId = 'text' | 'audio' | 'image' | 'api';

interface Feature {
  id: FeatureId;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 'text',
    title: 'Semantic Text Compression',
    description: 'Our AI analyzes sentence structure to strip redundant phrasing while strictly preserving the original meaning, resulting in massive text payload reductions.',
  },
  {
    id: 'audio',
    title: 'Silence Trimming',
    description: 'Auto-removes background noise and silence from audio files, reducing file size while maintaining audio quality.',
  },
  {
    id: 'image',
    title: 'Smart Image Optimization',
    description: 'Perceptual optimization for web assets that reduces file size without noticeable quality loss.',
  },
  {
    id: 'api',
    title: 'Unified API',
    description: 'One simple interface for all media types. Compress text, audio, images, and more with a single API call.',
  },
];

function TextBeforeAfter() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
          <span>Before</span>
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-slate-400">2.4KB</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-[120px] flex items-center">
          <p className="text-sm text-slate-700 leading-relaxed">
            Robin Wood uses advanced semantic compression technology to reduce your data size while preserving meaning. Our intelligent system analyzes sentence structure and removes redundant phrasing without losing the original intent.
          </p>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
          <span>After</span>
          <div className="h-px flex-1 bg-slate-200" />
          <span className="font-semibold">1.1KB (-54%)</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-[120px] flex items-center">
          <p className="text-sm text-slate-700 leading-relaxed">
            Robin Wood uses semantic compression to reduce data size while preserving meaning. Our system analyzes sentence structure and removes redundant phrasing without losing intent.
          </p>
        </div>
      </div>
    </div>
  );
}

function AudioBeforeAfter() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
          <span>Before</span>
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-slate-400">45MB</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-[120px] flex flex-col justify-center">
          <div className="flex gap-1 items-end h-16">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-1 rounded-full',
                  i % 5 === 0 ? 'bg-slate-200 h-1' : 'bg-slate-400',
                  Math.random() > 0.7 ? 'h-8' : Math.random() > 0.5 ? 'h-6' : 'h-4'
                )}
                style={{ height: `${Math.random() * 60 + 20}%` }}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">With silence and noise</p>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
          <span>After</span>
          <div className="h-px flex-1 bg-slate-200" />
          <span className="font-semibold">18MB (-60%)</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-[120px] flex flex-col justify-center">
          <div className="flex gap-1 items-end h-16">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-slate-400"
                style={{ height: `${Math.random() * 60 + 20}%` }}
              />
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-4 text-center font-medium">Silence trimmed</p>
        </div>
      </div>
    </div>
  );
}

function ImageBeforeAfter() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
          <span>Before</span>
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-slate-400">2MB</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-[180px] flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
            <span className="text-slate-500 text-sm">Original Image</span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
          <span>After</span>
          <div className="h-px flex-1 bg-slate-200" />
          <span className="font-semibold">400KB (-80%)</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-[180px] flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
            <span className="text-slate-600 text-sm font-medium">Optimized Image</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiBeforeAfter() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
          <span>Before</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-[120px] flex items-center">
          <div className="space-y-3 font-mono text-xs text-slate-600">
            <div>POST /api/v1/text/compress</div>
            <div>POST /api/v1/audio/compress</div>
            <div>POST /api/v1/image/compress</div>
            <div className="text-slate-400">Multiple endpoints...</div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
          <span>After</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-[120px] flex items-center">
          <div className="font-mono text-xs text-slate-700">
            <div className="font-semibold">rw.compress(file)</div>
            <div className="text-slate-600 mt-2">One unified API</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderBeforeAfter(featureId: FeatureId) {
  switch (featureId) {
    case 'text':
      return <TextBeforeAfter />;
    case 'audio':
      return <AudioBeforeAfter />;
    case 'image':
      return <ImageBeforeAfter />;
    case 'api':
      return <ApiBeforeAfter />;
    default:
      return <TextBeforeAfter />;
  }
}

export function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState<FeatureId>('text');

  return (
    <div className="w-full py-8 md:py-12">
      {/* Title */}
      <h2 className="font-jakarta font-semibold text-4xl md:text-6xl tracking-tighter text-slate-900 leading-[1.1] max-w-4xl mb-12">
        See how our compression works for every media type
      </h2>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Features List */}
        <div>
          <div className="space-y-0">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className="w-full text-left py-2.5 transition-colors"
              >
                <p className={cn(
                  'font-manrope text-base font-semibold mb-0.5 uppercase',
                  activeFeature === feature.id
                    ? 'text-slate-900'
                    : 'text-slate-500'
                )}>
                  {feature.title}
                </p>
                <p className={cn(
                  'font-manrope text-sm leading-relaxed',
                  activeFeature === feature.id
                    ? 'text-slate-900'
                    : 'text-slate-500'
                )}>
                  {feature.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Before/After Preview */}
        <div className="h-fit">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-[400px] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              {renderBeforeAfter(activeFeature)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
