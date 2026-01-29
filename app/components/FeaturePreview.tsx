'use client';

import { useState } from 'react';
import { cn } from '@/components/utils';
import { CodeBlock } from './CodeBlock';

type Feature = 'audio' | 'text' | 'api';

const features: { id: Feature; label: string; icon: React.ReactNode }[] = [
  {
    id: 'audio',
    label: 'COMPRESS AUDIO',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    id: 'text',
    label: 'COMPRESS TEXT',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    id: 'api',
    label: 'API Integration',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

export function FeaturePreview() {
  const [activeFeature, setActiveFeature] = useState<Feature>('text');
  const [text, setText] = useState(
    'It is important to note that Robin Wood utilizes advanced semantic compression technology in order to drastically reduce the size of your message. Please be advised that due to the fact that we analyze sentence structure, we are able to remove any and all characters that serve no functional purpose. Consequently, at this point in time, you can optimize your application bandwidth without losing the original meaning for the purpose of maximum efficiency.'
  );
  const [compressedText, setCompressedText] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [audioCompressed, setAudioCompressed] = useState(false);

  const handleTextCompress = () => {
    setIsCompressing(true);
    // Simulate compression
    setTimeout(() => {
    // 👇 AQUI: Coloque a string fixa que você quer que apareça
    const fixedResult = "note: Robin Wood utilizes advanced semantic compression tech to drastically reduce the size of ur msg. note: bc we analyze sentence structure, we can remove all chars that r useless. Consequently, now, u can optimize ur app bandwidth w/o losing the orig meaning for max efficiency.";
    
    setCompressedText(fixedResult);
    setIsCompressing(false);
  }, 1500);
  };

  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => {
              setActiveFeature(feature.id);
              setCompressedText(null);
              setAudioCompressed(false);
              setIsCompressing(false);
            }}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-manrope transition-all',
              activeFeature === feature.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            {feature.icon}
            {feature.label}
          </button>
        ))}
      </div>

      {/* PREMIUM CARD WRAPPER */}
      <div className="relative px-[6px] pt-[6px] pb-4 rounded-[28px] bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 shadow-xl overflow-hidden">

      {/* Gradient glow decorativo - subtle corner accent */}
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-[200px] h-[200px] opacity-30 blur-3xl"
        style={{
          background:
            'linear-gradient(230deg, rgb(34,197,94), rgb(16,185,129))',
        }}
      />

      {/* CARD REAL */}
      <div className="relative bg-white rounded-[22px] overflow-hidden">

        {/* CONTENT */}
        {activeFeature === 'text' && (
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6">

              {/* LEFT */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-3">
                  Enter your text
                </label>

                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value)
                    setCompressedText(null)
                  }}
                  className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm resize-none
                            focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  placeholder="Type or paste your text here..."
                />

                <div className="mt-2 text-xs text-slate-400">
                  {text.length} characters
                </div>
              </div>

              {/* DIVIDER */}
              <div className="hidden md:block w-px bg-slate-200" />

              {/* RIGHT */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-3">
                  Compressed output
                </label>

                <div className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm overflow-auto">
                  {isCompressing ? (
                    <div className="flex items-center justify-center h-full gap-2 text-green-600">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span className="font-medium">Compressing…</span>
                    </div>
                  ) : compressedText ? (
                    <p className="text-slate-700">{compressedText}</p>
                  ) : (
                    <p className="text-slate-400 italic">
                      Compressed text will appear here…
                    </p>
                  )}
                </div>

                {compressedText && (
                  <div className="mt-2 flex items-center gap-4 text-xs">
                    <span className="text-slate-400">
                      {compressedText.length} characters
                    </span>
                    <span className="text-green-600 font-semibold">
                      {Math.round((1 - compressedText.length / text.length) * 100)}% smaller
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* BUTTON */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleTextCompress}
                disabled={isCompressing || !text}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full font-semibold
                          hover:bg-green-500 transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)]
                          hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isCompressing ? 'Compressing…' : 'Compress'}
              </button>
            </div>
          </div>
        )}

        {activeFeature === 'audio' && (
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6">

              {/* LEFT - Original Audio */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-3">
                  Original audio
                </label>
                <div className="flex flex-col items-center justify-center h-40">
                  <svg className="w-10 h-10 mb-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <p className="text-sm text-slate-600 font-medium">medical-audio-example.mp3</p>
                  <p className="text-xs text-slate-400 mt-1">2.4 MB • Medical transcription</p>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="hidden md:block w-px bg-slate-200" />

              {/* RIGHT - Compressed Output */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-3">
                  Compressed output
                </label>
                <div className="flex flex-col items-center justify-center h-40">
                  {isCompressing ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span className="font-medium">Compressing…</span>
                    </div>
                  ) : audioCompressed ? (
                    <>
                      <svg className="w-10 h-10 mb-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      <p className="text-sm text-green-700 font-medium">medical-audio_compressed.mp3</p>
                      <p className="text-xs text-green-600 mt-1">960 KB • <span className="font-semibold">60% smaller</span></p>
                    </>
                  ) : (
                    <p className="text-slate-400 italic text-sm">
                      Compressed audio will appear here…
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  if (!audioCompressed) {
                    setIsCompressing(true);
                    setTimeout(() => {
                      setAudioCompressed(true);
                      setIsCompressing(false);
                    }, 2000);
                  }
                }}
                disabled={isCompressing || audioCompressed}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full font-semibold
                          hover:bg-green-500 transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)]
                          hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isCompressing ? 'Compressing…' : audioCompressed ? 'Compressed' : 'Compress Audio'}
              </button>
            </div>
          </div>
        )}

        {activeFeature === 'api' && (
          <div className="p-6 md:p-8">
            <CodeBlock />
          </div>
        )}

      </div>

      {/* FOOTER - Outside the card, in the border area */}
      <div className="mt-2 flex justify-center">
        <span className="text-xs text-slate-500">
          Powered by <span className="font-semibold text-brand-primary-dark">
            Robin Wood Compression Engine
          </span>
        </span>
      </div>
      </div>

    </div>
  );
}
