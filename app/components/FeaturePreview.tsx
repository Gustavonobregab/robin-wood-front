'use client';

import { useState, useRef } from 'react';
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
    label: 'API',
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
    'Robin Wood uses advanced semantic compression to reduce your data size while preserving meaning. Try it now by clicking the compress button to see the magic happen in real-time.'
  );
  const [compressedText, setCompressedText] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioCompressed, setAudioCompressed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextCompress = () => {
    setIsCompressing(true);
    // Simulate compression
    setTimeout(() => {
      const compressed = text
        .split(' ')
        .filter((_, i) => i % 3 !== 2)
        .join(' ');
      setCompressedText(compressed);
      setIsCompressing(false);
    }, 1500);
  };

  const handleAudioCompress = () => {
    if (!audioFile) return;
    setIsCompressing(true);
    setTimeout(() => {
      setAudioCompressed(true);
      setIsCompressing(false);
    }, 2000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioCompressed(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
      <div className="relative px-[6px] pt-[6px] pb-4 rounded-[28px] bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 shadow-xl overflow-hidden">

      {/* Gradient glow decorativo */}
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 w-[460px] h-[260px] opacity-60 blur-2xl"
        style={{
          background:
            'linear-gradient(230deg, rgb(34,197,94), rgb(16,185,129), rgb(5,150,105))',
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
              <div className="hidden md:block w-px bg-[repeating-linear-gradient(
                to_bottom,
                transparent,
                transparent_6px,
                rgb(203_213_225)_6px,
                rgb(203_213_225)_8px
              )]" />

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
            <div className="flex flex-col items-center">
              {!audioFile ? (
                <>
                  <div className="w-full max-w-md">
                    <label className="block text-sm font-medium text-slate-500 mb-3 text-center">
                      Upload audio file
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-all"
                    >
                      <svg className="w-12 h-12 mx-auto mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      <p className="text-slate-600 font-medium mb-2">Click to upload audio</p>
                      <p className="text-xs text-slate-400">MP3, WAV, or other audio formats</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full max-w-md mb-6">
                    <label className="block text-sm font-medium text-slate-500 mb-3">
                      Audio file
                    </label>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{audioFile.name}</p>
                          <p className="text-xs text-slate-500 mt-1">{formatFileSize(audioFile.size)}</p>
                        </div>
                        <button
                          onClick={() => {
                            setAudioFile(null);
                            setAudioCompressed(false);
                          }}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {audioCompressed && (
                    <div className="w-full max-w-md mb-6">
                      <label className="block text-sm font-medium text-slate-500 mb-3">
                        Compressed audio
                      </label>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-green-900">{audioFile.name.replace(/\.[^/.]+$/, '')}_compressed.mp3</p>
                            <p className="text-xs text-green-700 mt-1">{formatFileSize(audioFile.size * 0.4)}</p>
                          </div>
                          <span className="text-green-600 font-semibold text-sm">60% smaller</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleAudioCompress}
                    disabled={isCompressing || audioCompressed}
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full font-semibold
                              hover:bg-green-500 transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)]
                              hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isCompressing ? 'Compressing…' : audioCompressed ? 'Compressed' : 'Compress Audio'}
                  </button>
                </>
              )}
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
