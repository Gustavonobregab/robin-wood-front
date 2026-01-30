'use client';

import Script from 'next/script';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from './cn';
import { useState } from 'react';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  disabled?: boolean;
  badge?: string;
}

const playgroundItems: NavItem[] = [
  { name: 'Compress Text', href: '/dashboard/text', icon: 'solar:text-square-linear' },
  { name: 'Compress Audio', href: '/dashboard/audio', icon: 'solar:microphone-3-linear' },
];

const managementItems: NavItem[] = [
  { name: 'API Keys', href: '/dashboard/keys', icon: 'solar:key-linear' },
  { name: 'Billing', href: '/dashboard/billing', icon: 'solar:wallet-money-linear' },
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
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
          'fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 bg-white border-r border-slate-200',
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
                    ? 'bg-slate-100 text-slate-900 font-medium'
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

                  if (item.disabled) {
                    return (
                      <div
                        key={item.name}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-manrope text-sm text-slate-400 cursor-not-allowed opacity-60'
                        )}
                      >
                        <iconify-icon icon={item.icon} width="20" />
                        {item.name}
                        {item.badge && (
                          <span className="ml-auto px-2 py-0.5 rounded-full bg-brand text-white text-xs font-medium">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-manrope text-sm',
                        isActive
                          ? 'bg-slate-100 text-slate-900 font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      )}
                    >
                      <iconify-icon icon={item.icon} width="20" />
                      {item.name}
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-slate-900 text-white text-xs font-medium">
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
                          ? 'bg-slate-100 text-slate-900 font-medium'
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
        </div>
      </aside>
    </>
  );
}
