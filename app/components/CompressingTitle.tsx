'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const COMPRESSION_STEPS = [
//   `Smart data compression and optimization technology for artificial intelligence applications.`,
//   `Smart compression and optimization for AI applications.`,
//   `Intelligent compression for AI systems.`,
//   `Intelligent compression for the AI era.`,
// ];

// const INITIAL_LENGTH = COMPRESSION_STEPS[0].length;

export function CompressingTitle() {
  // const [currentStep, setCurrentStep] = useState(0);
  // const [isCompressing, setIsCompressing] = useState(true);
  // const [showCursor, setShowCursor] = useState(true);
  // const [showStats, setShowStats] = useState(false);

  // useEffect(() => {
  //   if (!isCompressing) return;

  //   const stepDelay = currentStep === 0 ? 1500 : 800;

  //   if (currentStep < COMPRESSION_STEPS.length - 1) {
  //     const timer = setTimeout(() => {
  //       setCurrentStep((prev) => prev + 1);
  //     }, stepDelay);
  //     return () => clearTimeout(timer);
  //   } else {
  //     setIsCompressing(false);
  //     setTimeout(() => {
  //       setShowCursor(false);
  //       setShowStats(true);
  //     }, 600);
  //   }
  // }, [currentStep, isCompressing]);

  // const currentText = COMPRESSION_STEPS[currentStep];
  // const currentLength = currentText.length;
  // const compressionRatio = Math.round(
  //   ((INITIAL_LENGTH - currentLength) / INITIAL_LENGTH) * 100
  // );

  return (
    <div className="flex flex-col items-center w-full">
      {/* Compression indicator - commented out */}
      {/* <motion.div
        className="mb-4 flex items-center gap-2 font-mono text-xs"
        animate={{ opacity: isCompressing ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-slate-400">compressing</span>
        <motion.span
          key={compressionRatio}
          className="text-emerald-600 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          -{compressionRatio}%
        </motion.span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-400">
          {INITIAL_LENGTH} → {currentLength} chars
        </span>
      </motion.div> */}

      {/* Title */}
      <h1 className="font-jakarta font-semibold text-4xl md:text-7xl tracking-tighter leading-[1.1] max-w-4xl text-center px-4 text-slate-900">
        Intelligent compression for the AI era.
      </h1>

      {/* Final stats badge - commented out */}
      {/* <motion.div
        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: showStats ? 1 : 0,
          y: showStats ? 0 : 10
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="font-mono text-xs text-emerald-700 font-medium">
          {compressionRatio}% smaller • Same meaning
        </span>
      </motion.div> */}
    </div>
  );
}
