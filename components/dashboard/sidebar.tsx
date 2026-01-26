'use client';

import Script from 'next/script';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/components/ui/utils';
import { useState } from 'react';

const playgroundItems = [
  { name: 'Compress Text', href: '/dashboard/compress', icon: 'solar:text-square-linear' },
  { name: 'Compress Image', href: '/dashboard/image', icon: 'solar:gallery-linear' },
  { name: 'Compress Audio', href: '/dashboard/audio', icon: 'solar:microphone-3-linear' },
  { name: 'Batch Process', href: '/dashboard/batch', icon: 'solar:layers-linear', badge: 'New' },
];

const managementItems = [
  { name: 'API Keys', href: '/dashboard/keys', icon: 'solar:key-linear' },
  { name: 'Usage', href: '/dashboard/usage', icon: 'solar:graph-up-linear' },
  { name: 'Billing', href: '/dashboard/billing', icon: 'solar:wallet-money-linear' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'solar:settings-linear' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Script
        src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
        strategy="afterInteractive"
      />

      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white border border-neutral-200 shadow-sm hover:bg-slate-50 transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <iconify-icon
          icon={mobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
          width="24"
          className="text-slate-700"
        />
      </button>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 bg-white border-r border-neutral-200',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Home */}
            <div>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-manrope text-sm',
                  pathname === '/dashboard'
                    ? 'bg-brand-primary-bg text-brand-primary-dark font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                <iconify-icon icon="solar:home-2-linear" width="20" />
                Home
              </Link>
            </div>

            {/* Playground Section */}
            <div>
              <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Playground
              </p>
              <div className="space-y-1">
                {playgroundItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-manrope text-sm',
                        isActive
                          ? 'bg-brand-primary-bg text-brand-primary-dark font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      )}
                    >
                      <iconify-icon icon={item.icon} width="20" />
                      {item.name}
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 rounded-md bg-brand-primary text-white text-xs font-medium">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Management Section */}
            <div>
              <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Management
              </p>
              <div className="space-y-1">
                {managementItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-manrope text-sm',
                        isActive
                          ? 'bg-brand-primary-bg text-brand-primary-dark font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      )}
                    >
                      <iconify-icon icon={item.icon} width="20" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-neutral-100">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-brand-primary-bg flex items-center justify-center">
                <iconify-icon icon="solar:user-linear" width="18" className="text-brand-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-manrope text-sm font-medium text-slate-900 truncate">Gustavo</p>
                <p className="font-manrope text-xs text-slate-500 truncate">Pro Plan</p>
              </div>
              <iconify-icon icon="solar:alt-arrow-right-linear" width="16" className="text-slate-400" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
