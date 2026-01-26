'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useState } from 'react';

const compressionLevels = [
  { id: 'low', name: 'Low Compression', description: 'Best quality, minimal reduction', reduction: '20-30%' },
  { id: 'medium', name: 'Medium Compression', description: 'Balanced quality and size', reduction: '40-50%' },
  { id: 'high', name: 'High Compression', description: 'Maximum reduction, semantic preservation', reduction: '60-70%' },
];

const outputFormats = [
  { id: 'txt', name: 'Plain Text', description: 'Simple text file' },
  { id: 'md', name: 'Markdown', description: 'Preserves formatting' },
  { id: 'json', name: 'JSON', description: 'Structured data format' },
];

export default function TextCompressPage() {
  const [activeTab, setActiveTab] = useState<'settings' | 'history'>('settings');
  const [selectedLevel, setSelectedLevel] = useState(compressionLevels[1]);
  const [selectedFormat, setSelectedFormat] = useState(outputFormats[0]);
  const [inputText, setInputText] = useState('');
  const [compressedText, setCompressedText] = useState<string | null>(null);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    setWordCount(text.trim().split(/\s+/).filter((word) => word.length > 0).length);
    setCharCount(text.length);
  };

  const handleCompress = () => {
    // Mock compression
    const reduction = selectedLevel.id === 'low' ? 0.25 : selectedLevel.id === 'medium' ? 0.45 : 0.65;
    const compressed = inputText.substring(0, Math.floor(inputText.length * (1 - reduction)));
    setCompressedText(compressed);
  };

  return (
    <>
      <Script
        src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
        strategy="afterInteractive"
      />

      <div className="max-w-7xl animate-fade">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <iconify-icon icon="solar:arrow-left-linear" width="20" className="text-slate-600" />
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="font-jakarta font-semibold text-xl text-slate-900">Compress Text</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-slate-50 transition-colors">
              <span className="font-manrope text-sm font-medium text-slate-700">Feedback</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-slate-50 transition-colors">
              <span className="font-manrope text-sm font-medium text-slate-700">Docs</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Text Input Area */}
          <div className="lg:col-span-2">
            <div className="min-h-[500px] rounded-2xl border border-neutral-200 bg-white flex flex-col">
              {compressedText ? (
                <div className="flex flex-col h-full">
                  {/* Tabs for Input/Output */}
                  <div className="flex items-center gap-6 border-b border-neutral-200 px-6 pt-4">
                    <button
                      onClick={() => setCompressedText(null)}
                      className="pb-3 font-manrope text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Original
                    </button>
                    <button className="pb-3 font-manrope text-sm font-medium text-slate-900 relative">
                      Compressed
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
                    </button>
                  </div>

                  {/* Compressed Text Display */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-manrope text-xs font-semibold">
                          {Math.round((1 - compressedText.length / inputText.length) * 100)}% reduction
                        </div>
                        <span className="font-manrope text-xs text-slate-500">
                          {compressedText.length.toLocaleString()} characters
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(compressedText);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-slate-50 transition-colors"
                      >
                        <iconify-icon icon="solar:copy-linear" width="16" className="text-slate-600" />
                      </button>
                    </div>
                    <div className="prose max-w-none">
                      <p className="font-manrope text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {compressedText}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border-t border-neutral-200 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setCompressedText(null)}
                      className="px-4 py-2 rounded-lg border border-neutral-200 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-manrope text-sm font-medium text-slate-700">Compress Again</span>
                    </button>
                    <button
                      onClick={() => {
                        setInputText('');
                        setCompressedText(null);
                        setWordCount(0);
                        setCharCount(0);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors"
                    >
                      <span className="font-manrope text-sm font-medium text-white">New Text</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 p-6">
                    <textarea
                      value={inputText}
                      onChange={handleTextChange}
                      placeholder="Paste or type your text here..."
                      className="w-full h-full min-h-[400px] resize-none border-none outline-none font-manrope text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="p-4 border-t border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-manrope text-xs text-slate-500">
                        {wordCount.toLocaleString()} words
                      </span>
                      <span className="font-manrope text-xs text-slate-500">
                        {charCount.toLocaleString()} characters
                      </span>
                    </div>
                    <button
                      onClick={handleCompress}
                      disabled={!inputText.trim()}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="font-manrope text-sm font-medium text-white">Compress Text</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-neutral-200">
              <button
                onClick={() => setActiveTab('settings')}
                className={`pb-3 font-manrope text-sm font-medium transition-colors relative ${
                  activeTab === 'settings' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Settings
                {activeTab === 'settings' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`pb-3 font-manrope text-sm font-medium transition-colors relative ${
                  activeTab === 'history' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                History
                {activeTab === 'history' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
                )}
              </button>
            </div>

            {activeTab === 'settings' ? (
              <>
                {/* Promo Card */}
                <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-red-500 rounded-2xl p-4 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                    <iconify-icon icon="solar:magic-stick-3-linear" width="24" className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-manrope text-sm font-semibold text-white mb-1">Try Batch Mode</p>
                        <p className="font-manrope text-xs text-white/80">
                          Compress multiple texts at once with our batch processor.
                        </p>
                      </div>
                      <button className="p-1 rounded hover:bg-white/10 transition-colors">
                        <iconify-icon icon="solar:close-circle-linear" width="18" className="text-white/60" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Compression Level */}
                <div>
                  <label className="font-manrope text-sm font-medium text-slate-900 mb-3 block">
                    Compression Level
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                      className="w-full flex items-center justify-between p-3 rounded-xl border border-neutral-200 hover:border-slate-300 transition-colors bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <iconify-icon icon="solar:tuning-2-linear" width="18" className="text-slate-600" />
                        </div>
                        <span className="font-manrope text-sm font-medium text-slate-800">{selectedLevel.name}</span>
                      </div>
                      <iconify-icon icon="solar:alt-arrow-down-linear" width="18" className="text-slate-400" />
                    </button>

                    {showLevelDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-neutral-200 shadow-lg z-10 overflow-hidden">
                        {compressionLevels.map((level) => (
                          <button
                            key={level.id}
                            onClick={() => {
                              setSelectedLevel(level);
                              setShowLevelDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                              <iconify-icon icon="solar:tuning-2-linear" width="18" className="text-slate-600" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-manrope text-sm font-medium text-slate-800">{level.name}</p>
                              <p className="font-manrope text-xs text-slate-500">{level.description}</p>
                            </div>
                            <span className="font-manrope text-xs font-medium text-brand-primary-hover bg-brand-primary-bg px-2 py-1 rounded-full">
                              {level.reduction}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Output Format */}
                <div>
                  <label className="font-manrope text-sm font-medium text-slate-900 mb-3 block">
                    Output Format
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                      className="w-full flex items-center justify-between p-3 rounded-xl border border-neutral-200 hover:border-slate-300 transition-colors bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                          <span className="font-manrope text-xs font-bold text-white">{selectedFormat.id.toUpperCase()}</span>
                        </div>
                        <span className="font-manrope text-sm font-medium text-slate-800">{selectedFormat.name}</span>
                      </div>
                      <iconify-icon icon="solar:alt-arrow-down-linear" width="18" className="text-slate-400" />
                    </button>

                    {showFormatDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-neutral-200 shadow-lg z-10 overflow-hidden">
                        {outputFormats.map((format) => (
                          <button
                            key={format.id}
                            onClick={() => {
                              setSelectedFormat(format);
                              setShowFormatDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                              <span className="font-manrope text-xs font-bold text-white">{format.id.toUpperCase()}</span>
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-manrope text-sm font-medium text-slate-800">{format.name}</p>
                              <p className="font-manrope text-xs text-slate-500">{format.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* History Tab */
              <div className="space-y-3">
                {[
                  { name: 'product-description.txt', from: '2.4KB', to: '1.1KB', date: '2 hours ago' },
                  { name: 'article-draft.md', from: '15KB', to: '7KB', date: 'Yesterday' },
                  { name: 'api-docs.json', from: '8KB', to: '3.2KB', date: '3 days ago' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-200 flex items-center justify-center flex-shrink-0">
                        <iconify-icon icon="solar:text-square-linear" width="18" className="text-green-800" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-manrope text-sm font-medium text-slate-900 truncate">{item.name}</p>
                        <p className="font-manrope text-xs text-slate-500">
                          {item.from} → {item.to}
                        </p>
                      </div>
                      <span className="font-manrope text-xs text-slate-400">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
