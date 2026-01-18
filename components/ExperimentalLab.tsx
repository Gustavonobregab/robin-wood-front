'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { processAudioAction } from '@/app/actions/wood-chipper';

export const ExperimentalLab = () => {
  const [file, setFile] = useState<File | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ size: string; savings: string } | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Debug para ver se o evento disparou
    console.log("📁 Arquivo selecionado:", e.target.files); 
    
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);
    setResult(null);
    setIsProcessing(false);

    const url = URL.createObjectURL(selectedFile);
    const audio = new Audio(url);

    audio.onloadedmetadata = () => {
      if (audio.duration > 10) {
        setError("⚠️ Audio too long! The Sheriff is watching. Keep it under 10s.");
        setFile(null);
        setAudioSrc(null);
        URL.revokeObjectURL(url);
      } else {
        setFile(selectedFile);
        setAudioSrc(url);
      }
    };
  };

  const handleOptimize = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Chama a Server Action
      const data = await processAudioAction(formData);

      if (!data.success) {
        throw new Error(data.error || "Unknown error");
      }

      setResult({
        size: data.size!,
        savings: data.savings!
      });

    } catch (err: any) {
      console.error(err);
      setError(`💥 Erro: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Estilos manuais para a Label parecer um botão (Copiado do seu tema)
  // Adicionei 'flex items-center justify-center' para garantir o clique no texto
  const labelButtonStyle = "cursor-pointer flex items-center justify-center font-sans font-bold border-2 border-ink rounded-lg px-6 py-3 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-[#FFD60A] text-ink shadow-hard hover:bg-[#FFE033] min-w-[200px]";

  return (
    <section className="py-24 px-6 border-b-2 border-ink bg-parchment relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl rotate-12 select-none pointer-events-none">
        🧪
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-ink text-robin-neon px-3 py-1 font-mono text-xs font-bold mb-4 rotate-2">
            BETA ACCESS
          </div>
          <h2 className="font-serif font-black text-5xl mb-4">The Alchemist's Lab</h2>
          <p className="font-sans text-xl max-w-2xl mx-auto">
            Test our compression algorithm (<span className="font-mono font-bold">robin-wood v1.0</span>) right here. <br/>
            <span className="font-bold text-danger-pink">Max 10 seconds</span> (we are paying for the server, relax).
          </p>
        </div>

        <div className="border-4 border-ink border-dashed rounded-xl p-8 bg-white relative shadow-hard transition-all hover:shadow-hard-xl">
          
          {!file ? (
            <div className="flex flex-col items-center justify-center py-12 gap-6 text-center">
              <div className="w-20 h-20 bg-parchment border-2 border-ink rounded-full flex items-center justify-center text-4xl shadow-hard-sm animate-float">
                🎙️
              </div>
              <div>
                <h3 className="font-serif font-bold text-2xl mb-2">Drop your noise here</h3>
                <p className="font-mono text-sm text-gray-500">.mp3, .wav, .m4a (Max 10s)</p>
              </div>
              
              {/* --- SOLUÇÃO INFALÍVEL --- */}
              {/* Input DENTRO da Label. Não precisa de ID, nem htmlFor. O clique propaga. */}
              <label className={labelButtonStyle}>
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  accept="audio/*" 
                  className="hidden" // O input fica escondido, mas a label captura o clique
                />
                <span>Select Audio File</span>
              </label>
              {/* ------------------------- */}

              {error && (
                <div className="bg-danger-pink/20 text-red-600 font-bold font-mono text-sm px-4 py-2 border-2 border-danger-pink -rotate-1">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b-2 border-ink pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-robin-neon border-2 border-ink flex items-center justify-center text-xl font-bold">
                    MP3
                  </div>
                  <div>
                    <p className="font-bold font-sans text-lg">{file.name}</p>
                    <p className="font-mono text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB (Original)</p>
                  </div>
                </div>
                {/* Botão simples de remover (HTML nativo pra garantir) */}
                <button 
                  type="button"
                  onClick={() => setFile(null)} 
                  className="text-sm font-bold underline hover:text-danger-pink cursor-pointer z-50"
                >
                  Remove
                </button>
              </div>

              {audioSrc && (
                <audio controls src={audioSrc} className="w-full border-2 border-ink rounded-lg bg-parchment" />
              )}

              {!result ? (
                <div className="flex flex-col items-center gap-4">
                  <Button 
                    onClick={handleOptimize} 
                    disabled={isProcessing}
                    className={`w-full md:w-auto ${isProcessing ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {isProcessing ? 'Brewing Potions...' : 'Run robin-wood'}
                  </Button>
                  
                  {isProcessing && (
                    <div className="w-full h-4 bg-gray-200 border-2 border-ink rounded-full overflow-hidden">
                      <div className="h-full bg-robin-neon animate-[marquee_1s_linear_infinite]" style={{ width: '100%' }}></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-ink text-parchment p-6 rounded-lg border-2 border-ink relative overflow-hidden animate-accordion-down">
                  <div className="absolute top-0 right-0 bg-robin-neon text-ink text-xs font-bold px-3 py-1 border-b-2 border-l-2 border-ink">
                    SUCCESS
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <div>
                      <p className="text-gray-500 text-xs font-mono mb-1">NEW SIZE</p>
                      <p className="text-4xl font-serif font-black text-robin-neon">{result.size}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-mono mb-1">SAVINGS</p>
                      <p className="text-4xl font-serif font-black text-sheriff-gold">-{result.savings}</p>
                    </div>
                  </div>

                  <div className="font-mono text-xs space-y-2 border-t border-gray-700 pt-4 text-gray-400">
                    <p> Loading robin-wood... <span className="text-robin-neon">DONE</span></p>
                    <p> Shredding metadata... <span className="text-robin-neon">DONE</span></p>
                    <p> Compressing payload... <span className="text-robin-neon">DONE</span></p>
                  </div>

                  <Button onClick={() => setFile(null)} variant="outline" className="mt-6 w-full text-ink bg-white hover:bg-gray-200">
                    Try Another File
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};