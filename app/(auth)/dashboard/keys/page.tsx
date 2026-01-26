'use client';

import Script from 'next/script';
import { useState } from 'react';

const apiKeys = [
  {
    id: 'key_1',
    name: 'Production API Key',
    prefix: 'rw_live_',
    lastChars: '...x7Kp',
    createdAt: '2024-01-15',
    lastUsed: '2 minutes ago',
    status: 'active',
    requests: '456,789',
  },
  {
    id: 'key_2',
    name: 'Development Key',
    prefix: 'rw_test_',
    lastChars: '...m3Qs',
    createdAt: '2024-02-20',
    lastUsed: '1 hour ago',
    status: 'active',
    requests: '12,345',
  },
  {
    id: 'key_3',
    name: 'Staging Environment',
    prefix: 'rw_test_',
    lastChars: '...p9Lw',
    createdAt: '2024-03-10',
    lastUsed: '3 days ago',
    status: 'active',
    requests: '8,921',
  },
  {
    id: 'key_4',
    name: 'Old Production Key',
    prefix: 'rw_live_',
    lastChars: '...k2Rt',
    createdAt: '2023-11-05',
    lastUsed: '30 days ago',
    status: 'revoked',
    requests: '1,234,567',
  },
];

export default function KeysPage() {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (keyId: string) => {
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <>
      <Script
        src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
        strategy="afterInteractive"
      />

      <div className="max-w-6xl space-y-6 animate-fade">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-manrope text-sm text-slate-500 mb-1">API Management</p>
            <h1 className="font-jakarta font-semibold text-4xl tracking-tight text-slate-900">API Keys</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-slate-50 transition-colors">
            <iconify-icon icon="solar:add-circle-linear" width="18" className="text-slate-600" />
            <span className="font-manrope text-sm font-medium text-slate-700">Create New Key</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-neutral-200">
            <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Active Keys</h3>
            <div className="font-jakarta font-bold text-2xl text-slate-900">3</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-neutral-200">
            <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Total Requests</h3>
            <div className="font-jakarta font-bold text-2xl text-slate-900">1.7M</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-neutral-200">
            <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Revoked Keys</h3>
            <div className="font-jakarta font-bold text-2xl text-slate-900">1</div>
          </div>
        </div>

        {/* API Keys List */}
        <div>
          <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-3">Your API Keys</h2>
          <div className="space-y-1">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-colors ${
                  key.status === 'revoked'
                    ? 'opacity-60 hover:bg-slate-50'
                    : 'hover:bg-slate-100 cursor-pointer'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-manrope text-sm font-medium text-slate-900 truncate">
                    {key.name}
                  </p>
                  <p className="font-manrope text-xs text-slate-500 truncate">
                    {visibleKeys.has(key.id)
                      ? `${key.prefix}sk_xxxxxxxxxxxx${key.lastChars}`
                      : `${key.prefix}sk_••••••••••••${key.lastChars}`}
                    {' • '}
                    <span
                      className={`${
                        key.status === 'active' ? 'text-brand-primary-dark' : 'text-slate-400'
                      }`}
                    >
                      {key.status}
                    </span>
                    {' • '}
                    Created {key.createdAt}
                    {' • '}
                    {key.requests} requests
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleKeyVisibility(key.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {visibleKeys.has(key.id) ? (
                      <iconify-icon icon="solar:eye-closed-linear" width="16" />
                    ) : (
                      <iconify-icon icon="solar:eye-linear" width="16" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(key.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {copiedKey === key.id ? (
                      <iconify-icon icon="solar:check-circle-linear" width="16" className="text-brand-primary-hover" />
                    ) : (
                      <iconify-icon icon="solar:copy-linear" width="16" />
                    )}
                  </button>
                  {key.status === 'active' && (
                    <button className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-manrope text-xs font-medium">
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
