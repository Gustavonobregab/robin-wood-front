'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useState } from 'react';

const compressionLevels = [
  { id: 'low', name: 'Low Compression', description: 'Best quality, larger file size', reduction: '20-30%' },
  { id: 'medium', name: 'Medium Compression', description: 'Balanced quality and size', reduction: '40-50%' },
  { id: 'high', name: 'High Compression', description: 'Smaller file, reduced quality', reduction: '60-70%' },
];

const outputFormats = [
  { id: 'mp3', name: 'MP3', description: 'Most compatible format' },
  { id: 'aac', name: 'AAC', description: 'Better quality at same bitrate' },
  { id: 'ogg', name: 'OGG', description: 'Open source format' },
  { id: 'opus', name: 'OPUS', description: 'Best compression efficiency' },
];

export default function AudioCompressPage() {
  const [activeTab, setActiveTab] = useState<'settings' | 'history'>('settings');
  const [selectedLevel, setSelectedLevel] = useState(compressionLevels[1]);
  const [selectedFormat, setSelectedFormat] = useState(outputFormats[0]);
  const [bitrate, setBitrate] = useState(50);
  const [sampleRate, setSampleRate] = useState(70);
  const [channels, setChannels] = useState<'stereo' | 'mono'>('stereo');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Mock file upload
    setUploadedFile({ name: 'podcast-episode-42.mp3', size: '45.2 MB' });
  };

  const handleFileSelect = () => {
    // Mock file selection
    setUploadedFile({ name: 'podcast-episode-42.mp3', size: '45.2 MB' });
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
              <h1 className="font-jakarta font-semibold text-xl text-slate-900">Compress Audio</h1>
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
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`min-h-[500px] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 ${
                isDragging
                  ? 'border-slate-400 bg-slate-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {uploadedFile ? (
                <div className="text-center w-full max-w-md">
                  <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <iconify-icon icon="solar:music-note-2-linear" width="32" className="text-red-600" />
                  </div>
                  <p className="font-manrope text-lg font-medium text-slate-900 mb-1">{uploadedFile.name}</p>
                  <p className="font-manrope text-sm text-slate-500 mb-6">{uploadedFile.size}</p>

                  {/* Audio Preview */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-4">
                      <button className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 flex items-center justify-center transition-colors flex-shrink-0">
                        <iconify-icon icon="solar:play-bold" width="16" className="text-white" />
                      </button>
                      <div className="flex-1">
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full w-0 bg-slate-900 rounded-full" />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="font-manrope text-xs text-slate-400">0:00</span>
                          <span className="font-manrope text-xs text-slate-400">12:34</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="px-4 py-2 rounded-lg border border-neutral-200 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-manrope text-sm font-medium text-slate-700">Remove</span>
                    </button>
                    <button className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors">
                      <span className="font-manrope text-sm font-medium text-white">Compress Audio</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-xl border border-slate-200 bg-white flex items-center justify-center mb-4">
                    <iconify-icon icon="solar:upload-minimalistic-linear" width="24" className="text-slate-400" />
                  </div>
                  <p className="font-manrope text-base font-medium text-slate-900 mb-1">
                    Click to upload, or drag and drop
                  </p>
                  <p className="font-manrope text-sm text-slate-500 mb-6">
                    Audio files up to 100MB each
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="font-manrope text-sm text-slate-400">or</span>
                  </div>
                  <button
                    onClick={handleFileSelect}
                    className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <iconify-icon icon="solar:microphone-large-linear" width="18" className="text-slate-600" />
                    <span className="font-manrope text-sm font-medium text-slate-700">Record audio</span>
                  </button>
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
                          Compress multiple files at once with our batch processor.
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
                            <span className="font-manrope text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
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

                {/* Sliders */}
                <div className="space-y-6 pt-2">
                  {/* Bitrate */}
                  <div>
                    <label className="font-manrope text-sm font-medium text-slate-900 mb-3 block">Bitrate</label>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-manrope text-xs text-slate-400">Lower</span>
                      <span className="font-manrope text-xs text-slate-400">Higher</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={bitrate}
                      onChange={(e) => setBitrate(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Sample Rate */}
                  <div>
                    <label className="font-manrope text-sm font-medium text-slate-900 mb-3 block">Sample Rate</label>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-manrope text-xs text-slate-400">22kHz</span>
                      <span className="font-manrope text-xs text-slate-400">48kHz</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sampleRate}
                      onChange={(e) => setSampleRate(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Channels */}
                  <div>
                    <label className="font-manrope text-sm font-medium text-slate-900 mb-3 block">Channels</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setChannels('stereo')}
                        className={`flex-1 py-2.5 rounded-xl font-manrope text-sm font-medium transition-colors ${
                          channels === 'stereo'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Stereo
                      </button>
                      <button
                        onClick={() => setChannels('mono')}
                        className={`flex-1 py-2.5 rounded-xl font-manrope text-sm font-medium transition-colors ${
                          channels === 'mono'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Mono
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* History Tab */
              <div className="space-y-3">
                {[
                  { name: 'interview-raw.mp3', from: '48MB', to: '18MB', date: '2 hours ago' },
                  { name: 'podcast-ep41.mp3', from: '52MB', to: '21MB', date: 'Yesterday' },
                  { name: 'voice-memo.m4a', from: '12MB', to: '4MB', date: '3 days ago' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                        <iconify-icon icon="solar:music-note-2-linear" width="18" className="text-red-600" />
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
