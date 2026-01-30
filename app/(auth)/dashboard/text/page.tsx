'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { processText } from '../../../http/text';
import type { TextOperation, TextOperationType } from '@/types';
import { toast } from 'sonner';

// Definição dos Estilos (Presets Visuais do Front)
// Isso traduz "nomes amigáveis" para "listas de operações"
const compressionStyles = [
  { 
    id: 'chill', 
    name: 'Chill', 
    description: 'Basic cleanup & trimming.', 
    ops: ['trim'] 
  },
  { 
    id: 'medium', 
    name: 'Medium', 
    description: 'Trim + Dictionary Shortening.', 
    ops: ['trim', 'shorten'] 
  },
  { 
    id: 'aggressive', 
    name: 'Aggressive', 
    description: 'Full compression + Minify.', 
    ops: ['trim', 'shorten', 'minify'] 
  },
  { 
    id: 'custom', 
    name: 'Custom', 
    description: 'Build your own pipeline.', 
    ops: [] 
  },
];

// Lista de todas as operações possíveis para o modo Custom
const availableOperations = [
  { id: 'trim', name: 'Trim', desc: 'Remove spaces & fix punctuation' },
  { id: 'shorten', name: 'Shorten', desc: 'Replace words (Dictionary)' },
  { id: 'minify', name: 'Minify', desc: 'Remove logic/code spacing' },
  { id: 'json-to-toon', name: 'JSON 2 Toon', desc: 'Convert JSON to compact format' },
];

export default function TextCompressPage() {
  // --- STATES ---
  const [inputText, setInputText] = useState('');
  const [compressedResult, setCompressedResult] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{ saved: number; ratio: string } | null>(null);
  
  // Configuração
  const [selectedStyle, setSelectedStyle] = useState(compressionStyles[1]); // Default: Medium
  const [language, setLanguage] = useState<'EN' | 'PT'>('EN');
  const [customOps, setCustomOps] = useState<string[]>(['trim', 'shorten']);

  // API Trigger (POST)
  const { trigger, isMutating } = useSWRMutation(
    '/text',
    async (_, { arg }: { arg: { text: string; operations: TextOperation[] } }) => {
      return processText(arg);
    }
  );

  // --- HANDLERS ---
  const handleCompress = async () => {
    if (!inputText.trim()) return;

    // 1. Determina quais operações rodar (do Estilo ou do Custom)
    const opsIds = selectedStyle.id === 'custom' ? customOps : selectedStyle.ops;
    
    // 2. Monta o payload com parâmetros dinâmicos (Lang)
    // Se a operação for 'shorten', injetamos a lingua escolhida pelo user
    const operationsPayload: TextOperation[] = opsIds.map(opId => {
      if (opId === 'shorten') {
        return { type: 'shorten', params: { lang: language } };
      }
      return { type: opId as TextOperationType };
    });

    try {
      const result = await trigger({
        text: inputText,
        operations: operationsPayload
      });

      setCompressedResult(result.data.data);
      setMetrics({
        saved: result.data.metrics.savedChars,
        ratio: result.data.metrics.compressionRatio
      });
      toast.success(`Saved ${result.data.metrics.savedChars} chars!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to compress text');
    }
  };

  const toggleCustomOp = (opId: string) => {
    setCustomOps(prev => 
      prev.includes(opId) ? prev.filter(id => id !== opId) : [...prev, opId]
    );
  };

  return (
    <>
      <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" />

      <div className="max-w-7xl animate-fade">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <iconify-icon icon="solar:arrow-left-linear" width="20" className="text-slate-600" />
            </Link>
            <h1 className="font-jakarta font-semibold text-xl text-slate-900">Text Compression</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: INPUT / OUTPUT */}
          <div className="lg:col-span-2 space-y-4">
            <div className="min-h-[600px] rounded-2xl border border-neutral-200 bg-white flex flex-col shadow-sm overflow-hidden">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 bg-slate-50/50">
                <div className="flex gap-4">
                  <span className={`text-sm font-medium ${!compressedResult ? 'text-slate-900' : 'text-slate-400'}`}>
                    Input
                  </span>
                  {compressedResult && (
                     <div className="flex items-center gap-2">
                       <iconify-icon icon="solar:arrow-right-linear" className="text-slate-400" />
                       <span className="text-sm font-medium text-emerald-600">Result</span>
                       <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                         {metrics?.ratio} SAVED
                       </span>
                     </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  {inputText.length} chars
                </div>
              </div>

              {/* Editor Area */}
              <div className="flex-1 relative">
                 {compressedResult ? (
                    <div className="absolute inset-0 flex flex-col">
                        <textarea
                        readOnly
                        value={compressedResult}
                        className="flex-1 w-full p-6 resize-none border-none outline-none font-mono text-sm text-slate-800 bg-emerald-50/20"
                        />
                    </div>
                 ) : (
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Paste your text here to compress..."
                      className="w-full h-full p-6 resize-none border-none outline-none font-manrope text-sm text-slate-700 placeholder:text-slate-400"
                    />
                 )}
              </div>

              {/* Bottom Action Bar */}
              <div className="p-4 border-t border-neutral-200 bg-white flex justify-between items-center">
                 {compressedResult ? (
                    <>
                      <button onClick={() => setCompressedResult(null)} className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                        Edit Original
                      </button>
                      <button 
                        onClick={() => { navigator.clipboard.writeText(compressedResult); toast.success('Copied!'); }}
                        className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-slate-900/20"
                      >
                        <iconify-icon icon="solar:copy-linear" width="16" />
                        Copy Result
                      </button>
                    </>
                 ) : (
                    <div className="ml-auto">
                      <button
                        onClick={handleCompress}
                        disabled={!inputText.trim() || isMutating}
                        className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-slate-900/20"
                      >
                        {isMutating ? (
                          <>
                            <iconify-icon icon="svg-spinners:ring-resize" width="16" />
                            Compressing...
                          </>
                        ) : (
                          <>
                            <iconify-icon icon="solar:magic-stick-3-linear" width="16" />
                            Compress Now
                          </>
                        )}
                      </button>
                    </div>
                 )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONFIGURATION */}
          <div className="space-y-6">
            
            {/* Style Selector */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
              <h3 className="font-jakarta font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <iconify-icon icon="solar:tuning-2-linear" className="text-slate-400" />
                Compression Style
              </h3>
              <div className="space-y-2">
                {compressionStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedStyle.id === style.id
                        ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500/20'
                        : 'border-neutral-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-medium text-sm ${selectedStyle.id === style.id ? 'text-emerald-700' : 'text-slate-900'}`}>
                        {style.name}
                      </span>
                      {selectedStyle.id === style.id && (
                        <iconify-icon icon="solar:check-circle-bold" className="text-emerald-500" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{style.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Operations (Visible ONLY if Custom is selected) */}
            {selectedStyle.id === 'custom' && (
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm animate-fade-in">
                <h3 className="font-jakarta font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <iconify-icon icon="solar:settings-linear" className="text-slate-400" />
                  Active Operations
                </h3>
                <div className="space-y-3">
                  {availableOperations.map((op) => (
                    <label key={op.id} className="flex items-start gap-3 cursor-pointer group select-none">
                      <div className="relative flex items-center mt-0.5">
                        <input 
                          type="checkbox" 
                          checked={customOps.includes(op.id)}
                          onChange={() => toggleCustomOp(op.id)}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-emerald-500 checked:bg-emerald-500 hover:border-emerald-400"
                        />
                        <iconify-icon icon="solar:check-read-linear" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" width="14" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">{op.name}</p>
                        <p className="text-xs text-slate-500">{op.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Language Selector */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
              <h3 className="font-jakarta font-semibold text-slate-900 mb-4 flex items-center gap-2">
                 <iconify-icon icon="solar:global-linear" className="text-slate-400" />
                 Target Language
              </h3>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                {['EN', 'PT'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      language === lang
                        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {lang === 'EN' ? 'English' : 'Português'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center leading-relaxed">
                Applies to "Shorten" operations.<br/>Ex: <i>"please"</i> → <i>"pls"</i> (EN) vs <i>"por favor"</i> → <i>"pfv"</i> (PT).
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}