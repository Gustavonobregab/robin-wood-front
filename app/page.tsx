'use client';

import Script from 'next/script';
import {
  HeroSection,
  ClientsStrip,
  BentoGrid,
  FeatureCard,
  PricingSection,
  Footer,
  FeaturesShowcase,
  UseCasesSection,
  IntegrationSection,
} from './components';
import { ProgressBar } from './components/';
import { Testimonials } from './components/Testimonials';

// Visual components for feature cards
function SemanticTextVisual() {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
        <span>Input</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full" />
      <div className="h-2 w-5/6 bg-slate-200 rounded-full" />
      <div className="h-2 w-4/6 bg-slate-200 rounded-full" />

      <div className="flex items-center gap-2 text-xs font-mono text-green-600 mt-4 mb-1">
        <span>Output (-65%)</span>
        <div className="h-px flex-1 bg-green-100" />
      </div>
      <div className="h-2 w-1/3 bg-green-500 rounded-full" />
    </div>
  );
}

function SilenceTrimmingVisual() {
  return (
    <div className="flex gap-0.5 items-end h-8 opacity-50">
      <div className="w-1 bg-green-500 h-3 rounded-full" />
      <div className="w-1 bg-green-500 h-6 rounded-full" />
      <div className="w-1 bg-slate-200 h-1 rounded-full" />
      <div className="w-1 bg-green-500 h-5 rounded-full" />
    </div>
  );
}

function SmartImageVisual() {
  return (
    <div className="flex items-center gap-2">
      <div className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded">2MB</div>
      <iconify-icon icon="solar:arrow-right-linear" className="text-slate-300" />
      <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">400KB</div>
    </div>
  );
}

function UnifiedApiVisual() {
  return (
    <div className="text-xs font-mono text-slate-400 bg-slate-50 p-2 rounded border border-slate-100">
      rw.compress(file)
    </div>
  );
}

function BandwidthVisual() {
  return (
    <div className="flex justify-between items-center text-xs font-semibold text-green-600">
      <span>120ms</span>
      <iconify-icon icon="solar:bolt-bold" className="text-amber-400" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      <Script
        src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen text-slate-800 antialiased pb-12">
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-4">
          <HeroSection />
          <ClientsStrip />
          <FeaturesShowcase />
          <Testimonials />
          <IntegrationSection />
          <UseCasesSection />
          <PricingSection />
          <Footer />
        </main>
      </div>
    </>
  );
}
