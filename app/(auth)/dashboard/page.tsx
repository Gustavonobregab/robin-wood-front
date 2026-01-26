'use client';

import Script from 'next/script';
import Link from 'next/link';

const features = [
  {
    name: 'Compress Text',
    href: '/dashboard/compress',
    icon: 'solar:text-square-linear',
    color: 'bg-green-200',
    iconColor: 'text-green-800',
  },
  {
    name: 'Compress Image',
    href: '/dashboard/image',
    icon: 'solar:gallery-linear',
    color: 'bg-amber-200',
    iconColor: 'text-amber-800',
  },
  {
    name: 'Compress Audio',
    href: '/dashboard/audio',
    icon: 'solar:microphone-3-linear',
    color: 'bg-red-200',
    iconColor: 'text-red-800',
  },
  {
    name: 'Batch Process',
    href: '/dashboard/batch',
    icon: 'solar:layers-linear',
    color: 'bg-lime-200',
    iconColor: 'text-lime-800',
  },
  {
    name: 'API Playground',
    href: '/dashboard/playground',
    icon: 'solar:code-square-linear',
    color: 'bg-yellow-200',
    iconColor: 'text-yellow-800',
  },
  {
    name: 'Analytics',
    href: '/dashboard/usage',
    icon: 'solar:graph-up-linear',
    color: 'bg-red-200',
    iconColor: 'text-red-800',
  },
];

const recentFiles = [
  {
    name: 'product-description.txt',
    description: 'Compressed from 2.4KB to 1.1KB (54% reduction)',
    time: '2 min ago',
  },
  {
    name: 'hero-banner.png',
    description: 'Compressed from 1.2MB to 340KB (72% reduction)',
    time: '15 min ago',
  },
  {
    name: 'podcast-ep42.mp3',
    description: 'Compressed from 45MB to 18MB (60% reduction)',
    time: '1 hour ago',
  },
];

const quickActions = [
  {
    name: 'API Keys',
    description: 'Manage your API authentication keys',
    href: '/dashboard/keys',
    icon: 'solar:key-linear',
  },
  {
    name: 'Documentation',
    description: 'Learn how to integrate our SDK',
    href: '/docs',
    icon: 'solar:book-linear',
  },
  {
    name: 'Upgrade Plan',
    description: 'Get more requests and features',
    href: '/dashboard/billing',
    icon: 'solar:rocket-linear',
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardPage() {
  return (
    <>
      <Script
        src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
        strategy="afterInteractive"
      />

      <div className="max-w-6xl space-y-10 animate-fade">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-manrope text-sm text-slate-500 mb-1">My Workspace</p>
            <h1 className="font-jakarta font-semibold text-4xl tracking-tight text-slate-900">
              {getGreeting()}, Gustavo
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-manrope text-sm text-slate-500">Have a question?</span>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-slate-50 transition-colors">
              <iconify-icon icon="solar:chat-round-linear" width="18" className="text-slate-600" />
              <span className="font-manrope text-sm font-medium text-slate-700">Talk to us</span>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.href}
              className="group flex flex-col items-center p-6 rounded-2xl bg-slate-100 hover:bg-slate-200/80 transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <iconify-icon icon={feature.icon} width="28" className={feature.iconColor} />
              </div>
              <span className="font-manrope text-sm font-medium text-slate-700 text-center">
                {feature.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Two Column Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Recent Files */}
          <div>
            <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-4">
              Latest from your library
            </h2>
            <div className="space-y-1">
              {recentFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-manrope text-sm font-medium text-slate-900 truncate">
                      {file.name}
                    </p>
                    <p className="font-manrope text-xs text-slate-500 truncate">
                      {file.description}
                    </p>
                  </div>
                  <span className="font-manrope text-xs text-slate-400 whitespace-nowrap">
                    {file.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-4">
              Quick actions
            </h2>
            <div className="space-y-1">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200">
                    <iconify-icon icon={action.icon} width="20" className="text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-manrope text-sm font-medium text-slate-900">
                      {action.name}
                    </p>
                    <p className="font-manrope text-xs text-slate-500">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-100 border border-neutral-200">
          <div className="text-center">
            <p className="font-jakarta font-bold text-2xl text-slate-900">1.2M</p>
            <p className="font-manrope text-sm text-slate-500">Total Requests</p>
          </div>
          <div className="text-center">
            <p className="font-jakarta font-bold text-2xl text-brand-primary">62%</p>
            <p className="font-manrope text-sm text-slate-500">Avg. Compression</p>
          </div>
          <div className="text-center">
            <p className="font-jakarta font-bold text-2xl text-slate-900">45ms</p>
            <p className="font-manrope text-sm text-slate-500">Avg. Latency</p>
          </div>
          <div className="text-center">
            <p className="font-jakarta font-bold text-2xl text-slate-900">$847</p>
            <p className="font-manrope text-sm text-slate-500">Saved this month</p>
          </div>
        </div>
      </div>
    </>
  );
}
