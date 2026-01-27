'use client';

import { useState, useEffect } from 'react';

const COMPRESSION_STEPS = [
  `Smart data compression and optimization technology for artificial intelligence applications.`,
  `Smart compression and optimization for AI applications.`,
  `Intelligent compression for AI systems.`,
  `Intelligent compression for the AI era.`,
];

const INITIAL_LENGTH = COMPRESSION_STEPS[0].length;
const FINAL_TEXT = COMPRESSION_STEPS[COMPRESSION_STEPS.length - 1];

export function CompressingTitle() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompressing, setIsCompressing] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (!isCompressing) return;

    const stepDelay = currentStep === 0 ? 1000 : 450;

    if (currentStep < COMPRESSION_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, stepDelay);
      return () => clearTimeout(timer);
    } else {
      setIsCompressing(false);
      setTimeout(() => {
        setShowCursor(false);
        setShowStats(true);
      }, 400);
    }
  }, [currentStep, isCompressing]);

  const currentText = COMPRESSION_STEPS[currentStep];
  const currentLength = currentText.length;
  const compressionRatio = Math.round(
    ((INITIAL_LENGTH - currentLength) / INITIAL_LENGTH) * 100
  );

  return (
    <div className="flex flex-col items-center">
      {/* Compression indicator */}
      <div
        className={`mb-4 flex items-center gap-2 font-mono text-xs transition-all duration-300 ${
          isCompressing ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-slate-400">compressing</span>
        <span className="text-emerald-600 font-semibold">-{compressionRatio}%</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-400">
          {INITIAL_LENGTH} → {currentLength} chars
        </span>
      </div>

      <h1 className="font-jakarta font-semibold text-4xl md:text-7xl tracking-tighter text-slate-900 leading-[1.1] max-w-4xl mb-6 min-h-[2.4em] md:min-h-[2.4em]">
        <span className="inline transition-all duration-300 ease-out">
          {currentText.split(' ').map((word, i, arr) => {
            const isInFinal = FINAL_TEXT.toLowerCase().includes(
              word.toLowerCase()
            );
            const isFinalStep = currentStep === COMPRESSION_STEPS.length - 1;

            return (
              <span
                key={`${currentStep}-${i}`}
                className={`inline-block transition-all duration-200 ${
                  isFinalStep
                    ? 'animate-in fade-in slide-in-from-bottom-1 text-slate-900'
                    : isInFinal
                      ? 'text-slate-900'
                      : 'text-slate-400'
                }`}
                style={{
                  animationDelay: isFinalStep ? `${i * 40}ms` : '0ms',
                }}
              >
                {word}
                {i < arr.length - 1 ? ' ' : ''}
              </span>
            );
          })}
          {showCursor && (
            <span className="inline-block w-[3px] h-[0.7em] bg-emerald-500 ml-1 animate-pulse align-middle" />
          )}
        </span>
      </h1>

      {/* Final stats badge */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full transition-all duration-500 ${
          showStats
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="font-mono text-xs text-emerald-700 font-medium">
          {compressionRatio}% smaller • Same meaning
        </span>
      </div>
    </div>
  );
}
