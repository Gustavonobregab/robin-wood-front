'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { processAudio } from '../../../http/audio';
import type { AudioPreset, AudioOperation } from '@/types';
import { toast } from 'sonner';

const audioPresets = [
  { id: 'podcast', name: 'Podcast', description: 'Voice optimized, removes silence.', icon: 'solar:microphone-3-linear' },
  { id: 'lecture', name: 'Lecture', description: '1.5x speed + Cleanup.', icon: 'solar:book-2-linear' },
  { id: 'chill', name: 'Chill', description: 'Light cleanup, preserves dynamics.', icon: 'solar:cup-linear' },
  { id: 'medium', name: 'Medium', description: 'Balanced quality and size.', icon: 'solar:soundwave-square-linear' },
  { id: 'aggressive', name: 'Aggressive', description: 'Max loudness & compression.', icon: 'solar:bolt-linear' },
  { id: 'custom', name: 'Custom', description: 'Select specific operations.', icon: 'solar:tuning-2-linear' },
];

const availableOperations = [
  { id: 'trim-silence', name: 'Trim Silence', desc: 'Remove silent parts' },
  { id: 'normalize', name: 'Normalize', desc: 'Even volume levels' },
  { id: 'speedup', name: 'Speed Up (1.25x)', desc: 'Faster playback' },
  { id: 'compress', name: 'Compressor', desc: 'Reduce dynamic range' },
];

export default function AudioCompressPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  
  const [selectedPreset, setSelectedPreset] = useState(audioPresets[0]);
  const [customOps, setCustomOps] = useState<string[]>(['trim-silence', 'normalize']);
  
  const [isDragging, setIsDragging] = useState(false);
  const [metrics, setMetrics] = useState<{ saved: string; ratio: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { trigger, isMutating } = useSWRMutation(
    '/audio',
    async (_, { arg }: { arg: { file: File; preset: string; ops: AudioOperation[] } }) => {
      return processAudio(arg.file, arg.preset as AudioPreset, arg.ops);
    }
  );

  // --- HANDLERS ---
  
  const handleFile = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      toast.error('Please upload an audio file');
      return;
    }
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    setResultUrl(null);
    setMetrics(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!uploadedFile) return;

    let ops: AudioOperation[] = [];
    if (selectedPreset.id === 'custom') {
      ops = customOps.map(id => {
        if (id === 'speedup') return { type: 'speedup', params: { rate: 1.25 } };
        return { type: id as any };
      });
    }

    try {
      const result = await trigger({
        file: uploadedFile,
        preset: selectedPreset.id === 'custom' ? 'custom' : selectedPreset.id,
        ops
      });

      const bufferData = new Uint8Array(result.data.file.data);
      const blob = new Blob([bufferData], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      
      setResultUrl(url);
      setMetrics({
        saved: formatBytes(result.data.metrics.savedBytes),
        ratio: result.data.metrics.compressionRatio
      });
      
      toast.success('Audio processed successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to process audio. Check console.');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [previewUrl, resultUrl]);

  return (
    <>
      <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" />
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="audio/*" 
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} 
      />

      <div className="max-w-7xl animate-fade">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <iconify-icon icon="solar:arrow-left-linear" width="20" className="text-slate-600" />
            </Link>
            <h1 className="font-jakarta font-semibold text-xl text-slate-900">Compress Audio</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* LEFT: Upload & Player */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`min-h-[500px] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 relative overflow-hidden ${
                isDragging ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white'
              }`}
            >
              {uploadedFile ? (
                <div className="text-center w-full max-w-lg z-10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <iconify-icon icon="solar:music-note-2-bold" width="32" className="text-red-500" />
                  </div>
                  <h3 className="font-manrope text-lg font-semibold text-slate-900 truncate px-4">{uploadedFile.name}</h3>
                  <p className="font-manrope text-sm text-slate-500 mb-8">{formatBytes(uploadedFile.size)}</p>

                  {/* Player Container */}
                  <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                    <div className="flex flex-col gap-4">
                      {/* Original Player */}
                      <div className="flex items-center gap-3">
                         <span className="text-xs font-bold text-slate-400 uppercase w-12 text-right">Raw</span>
                         <audio controls src={previewUrl!} className="w-full h-8" />
                      </div>

                      {/* Result Player (Only if processed) */}
                      {resultUrl && (
                        <div className="flex items-center gap-3 animate-fade-in">
                           <span className="text-xs font-bold text-slate-900 uppercase w-12 text-right">New</span>
                           <audio controls src={resultUrl} className="w-full h-8" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-3">
                     {resultUrl ? (
                       <>
                         <button 
                           onClick={() => { setUploadedFile(null); setPreviewUrl(null); setResultUrl(null); }}
                           className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                         >
                           Reset
                         </button>
                         <a 
                          href={resultUrl} 
                          download={`processed_${uploadedFile.name}.mp3`}
                          className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2"
                        >
                          <iconify-icon icon="solar:download-linear" />
                          Download MP3
                        </a>
                       </>
                     ) : (
                       <>
                         <button onClick={() => setUploadedFile(null)} className="px-4 py-2.5 text-slate-500 hover:text-red-500 transition-colors font-medium">
                           Remove
                         </button>
                         <button 
                           onClick={handleProcess}
                           disabled={isMutating}
                           className="px-8 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                         >
                           {isMutating ? <iconify-icon icon="svg-spinners:ring-resize" /> : <iconify-icon icon="solar:magic-stick-3-linear" />}
                           {isMutating ? 'Processing...' : 'Compress Audio'}
                         </button>
                       </>
                     )}
                  </div>

                  {/* Metrics Badge */}
                  {metrics && (
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold animate-bounce-in">
                      <iconify-icon icon="solar:graph-down-linear" />
                      Reduced by {metrics.ratio} ({metrics.saved} saved)
                    </div>
                  )}

                </div>
              ) : (
                /* Empty State */
                <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="text-center cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <iconify-icon icon="solar:upload-minimalistic-linear" width="28" className="text-slate-400 group-hover:text-slate-600" />
                  </div>
                  <h3 className="font-manrope text-lg font-semibold text-slate-900 mb-1">Upload Audio</h3>
                  <p className="font-manrope text-sm text-slate-500">Drag & drop or click to browse</p>
                  <p className="text-xs text-slate-400 mt-4">Supports MP3, WAV, M4A up to 50MB</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Settings */}
          <div className="space-y-6">
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-jakarta font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <iconify-icon icon="solar:tuning-2-linear" className="text-slate-400" />
                Target Preset
              </h3>
              <div className="space-y-2">
                {audioPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      selectedPreset.id === preset.id
                        ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900/10'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        selectedPreset.id === preset.id ? 'bg-slate-200 text-slate-900' : 'bg-slate-100 text-slate-500'
                    }`}>
                        <iconify-icon icon={preset.icon} width="18" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className={`font-medium text-sm ${selectedPreset.id === preset.id ? 'text-slate-900' : 'text-slate-900'}`}>
                                {preset.name}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-snug">{preset.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Ops */}
            {selectedPreset.id === 'custom' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
                <h3 className="font-jakarta font-semibold text-slate-900 mb-4">Pipeline Operations</h3>
                <div className="space-y-3">
                  {availableOperations.map((op) => (
                    <label key={op.id} className="flex items-start gap-3 cursor-pointer group select-none">
                      <div className="relative flex items-center mt-0.5">
                        <input 
                          type="checkbox" 
                          checked={customOps.includes(op.id)}
                          onChange={() => {
                             setCustomOps(prev => prev.includes(op.id) ? prev.filter(id => id !== op.id) : [...prev, op.id])
                          }}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-slate-900 checked:bg-slate-900 hover:border-slate-400"
                        />
                        <iconify-icon icon="solar:check-read-linear" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" width="14" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 transition-colors">{op.name}</p>
                        <p className="text-xs text-slate-500">{op.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}