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

      <div className="space-y-6 animate-fade">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-jakarta font-semibold text-4xl md:text-5xl tracking-tight text-slate-900">
              API Keys
            </h1>
            <p className="font-manrope text-lg text-slate-500 mt-2">Manage your API keys for authentication.</p>
          </div>
          <button className="font-manrope font-semibold bg-slate-900 text-white px-6 py-3 rounded-full shadow-md hover:bg-slate-800 transition-transform active:scale-95">
            <iconify-icon icon="solar:add-circle-linear" width="18" className="inline mr-2" />
            Create New Key
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white rounded-[2.5rem] p-6 border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-manrope text-sm font-medium text-slate-500">Active Keys</h3>
              <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                <iconify-icon icon="solar:check-circle-linear" width="20" className="text-brand-primary-hover" />
              </div>
            </div>
            <div className="font-jakarta font-semibold text-3xl text-slate-900">3</div>
          </div>
          <div className="bg-white rounded-[2.5rem] p-6 border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-manrope text-sm font-medium text-slate-500">Total Requests</h3>
              <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                <iconify-icon icon="solar:key-linear" width="20" className="text-brand-primary-hover" />
              </div>
            </div>
            <div className="font-jakarta font-semibold text-3xl text-slate-900">1.7M</div>
          </div>
          <div className="bg-white rounded-[2.5rem] p-6 border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-manrope text-sm font-medium text-slate-500">Revoked Keys</h3>
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <iconify-icon icon="solar:danger-triangle-linear" width="20" className="text-red-600" />
              </div>
            </div>
            <div className="font-jakarta font-semibold text-3xl text-slate-900">1</div>
          </div>
        </div>

        {/* API Keys List */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <iconify-icon icon="solar:key-linear" width="20" className="text-green-600" />
            </div>
            <div>
              <h3 className="font-jakarta font-semibold text-xl text-slate-900">Your API Keys</h3>
              <p className="font-manrope text-sm text-slate-500">Keep your API keys secure. Do not share them publicly.</p>
            </div>
          </div>
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className={`p-5 rounded-xl border ${
                  key.status === 'revoked'
                    ? 'bg-slate-50 border-neutral-200 opacity-60'
                    : 'bg-slate-50 border-neutral-200 hover:bg-slate-100 transition-colors'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-jakarta font-semibold text-slate-900">{key.name}</h3>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-manrope ${
                          key.status === 'active'
                            ? 'bg-brand-primary-bg text-brand-primary-dark'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {key.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <code className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-mono text-slate-700">
                        {visibleKeys.has(key.id)
                          ? `${key.prefix}sk_xxxxxxxxxxxx${key.lastChars}`
                          : `${key.prefix}sk_••••••••••••${key.lastChars}`}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        {visibleKeys.has(key.id) ? (
                          <iconify-icon icon="solar:eye-closed-linear" width="18" />
                        ) : (
                          <iconify-icon icon="solar:eye-linear" width="18" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.id)}
                        className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        {copiedKey === key.id ? (
                          <iconify-icon icon="solar:check-circle-linear" width="18" className="text-brand-primary-hover" />
                        ) : (
                          <iconify-icon icon="solar:copy-linear" width="18" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-500 font-manrope">
                      <span className="flex items-center gap-1.5">
                        <iconify-icon icon="solar:calendar-linear" width="16" />
                        Created {key.createdAt}
                      </span>
                      <span>Last used: {key.lastUsed}</span>
                      <span>{key.requests} requests</span>
                    </div>
                  </div>
                  {key.status === 'active' && (
                    <button className="font-manrope font-medium bg-red-50 text-red-700 px-4 py-2 rounded-full hover:bg-red-100 transition-colors ml-4">
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
