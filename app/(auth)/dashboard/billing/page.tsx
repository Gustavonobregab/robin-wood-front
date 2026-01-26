'use client';

import Script from 'next/script';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'For hobby projects',
    features: ['1,000 requests/month', '1 API key', 'Community support'],
    current: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing teams',
    features: ['100,000 requests/month', '10 API keys', 'Email support', 'Analytics dashboard'],
    current: false,
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'For large organizations',
    features: [
      'Unlimited requests',
      'Unlimited API keys',
      'Priority support',
      'Advanced analytics',
      'Custom SLA',
      'Dedicated account manager',
    ],
    current: true,
  },
];

const invoices = [
  { id: 'INV-2024-001', date: 'Jan 1, 2024', amount: '$199.00', status: 'paid' },
  { id: 'INV-2024-002', date: 'Feb 1, 2024', amount: '$199.00', status: 'paid' },
  { id: 'INV-2024-003', date: 'Mar 1, 2024', amount: '$199.00', status: 'paid' },
  { id: 'INV-2024-004', date: 'Apr 1, 2024', amount: '$199.00', status: 'pending' },
];

export default function BillingPage() {
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
            <p className="font-manrope text-sm text-slate-500 mb-1">Subscription</p>
            <h1 className="font-jakarta font-semibold text-4xl tracking-tight text-slate-900">Billing</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-neutral-200">
            <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Current Plan</h3>
            <div className="font-jakarta font-bold text-2xl text-slate-900">Enterprise</div>
            <p className="font-manrope text-xs text-slate-500 mt-1">$199/month</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-neutral-200">
            <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">API Requests</h3>
            <div className="font-jakarta font-bold text-2xl text-slate-900">856K</div>
            <p className="font-manrope text-xs text-slate-500 mt-1">Unlimited</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-neutral-200">
            <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Team Members</h3>
            <div className="font-jakarta font-bold text-2xl text-slate-900">24</div>
            <p className="font-manrope text-xs text-slate-500 mt-1">Unlimited</p>
          </div>
        </div>

        {/* Subscription Plans */}
        <div>
          <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-3">Subscription Plans</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 rounded-2xl border ${
                  plan.current
                    ? 'bg-brand-primary-bg border-brand-primary-light'
                    : 'bg-white border-neutral-200 hover:border-brand-primary-light transition-colors'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-jakarta font-semibold text-lg text-slate-900">{plan.name}</h3>
                  {plan.current && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold font-manrope bg-brand-primary text-white">
                      Current
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <span className="font-jakarta font-semibold text-3xl text-slate-900">{plan.price}</span>
                  <span className="font-manrope text-slate-500">{plan.period}</span>
                </div>
                <p className="font-manrope text-sm text-slate-500 mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-700 font-manrope">
                      <iconify-icon icon="solar:check-circle-linear" width="16" className="text-brand-primary-hover flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <button
                    className={`w-full font-manrope font-semibold px-4 py-2.5 rounded-full transition-all ${
                      plan.name === 'Enterprise'
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {plan.name === 'Free' ? 'Downgrade' : 'Upgrade'}
                    <iconify-icon icon="solar:arrow-right-linear" width="16" className="inline ml-2" />
                  </button>
                )}
                {plan.current && (
                  <button
                    className="w-full font-manrope font-medium bg-slate-100 text-slate-500 px-4 py-2.5 rounded-full cursor-not-allowed"
                    disabled
                  >
                    Current Plan
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-3">Payment Method</h2>
          <div className="p-4 rounded-xl border border-neutral-200 bg-white mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold font-manrope">VISA</span>
                </div>
                <div>
                  <p className="font-jakarta font-semibold text-slate-900">•••• •••• •••• 4242</p>
                  <p className="font-manrope text-sm text-slate-500">Expires 12/2025</p>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-slate-50 transition-colors font-manrope text-sm font-medium text-slate-700">
                Update
              </button>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-neutral-200 bg-white">
            <p className="font-manrope text-sm font-medium text-slate-700 mb-2">Billing Address</p>
            <p className="font-manrope text-sm text-slate-600">
              Acme Corporation<br />
              123 Tech Street<br />
              San Francisco, CA 94102
            </p>
            <button className="font-manrope font-medium text-brand-primary-hover hover:text-brand-primary-dark mt-3 text-sm">
              Edit address
            </button>
          </div>
        </div>

        {/* Invoices */}
        <div>
          <h2 className="font-jakarta font-semibold text-xl text-slate-900 mb-3">Recent Invoices</h2>
          <div className="space-y-1">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-manrope text-sm font-medium text-slate-900 truncate">
                    {invoice.id}
                  </p>
                  <p className="font-manrope text-xs text-slate-500 truncate">
                    {invoice.date} • {invoice.amount}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-manrope ${
                      invoice.status === 'paid'
                        ? 'bg-brand-primary-bg text-brand-primary-dark'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {invoice.status}
                  </span>
                  <button className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors">
                    <iconify-icon icon="solar:download-linear" width="16" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
