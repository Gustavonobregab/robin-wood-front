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

const usageStats = {
  requests: { used: 856000, limit: 'Unlimited' },
  keys: { used: 4, limit: 'Unlimited' },
  members: { used: 24, limit: 'Unlimited' },
};

export default function BillingPage() {
  return (
    <>
      <Script
        src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
        strategy="afterInteractive"
      />

      <div className="space-y-6 animate-fade">
        {/* Header */}
        <div>
          <h1 className="font-jakarta font-semibold text-4xl md:text-5xl tracking-tight text-slate-900">Billing</h1>
          <p className="font-manrope text-lg text-slate-500 mt-2">Manage your subscription and billing information.</p>
        </div>

        {/* Current Plan Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white rounded-[2.5rem] p-6 border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-manrope text-sm font-medium text-slate-500">Current Plan</h3>
              <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                <iconify-icon icon="solar:bolt-linear" width="20" className="text-brand-primary-hover" />
              </div>
            </div>
            <div className="font-jakarta font-semibold text-3xl text-slate-900">Enterprise</div>
            <p className="font-manrope text-sm text-slate-500 mt-1">$199/month</p>
          </div>
          <div className="bg-white rounded-[2.5rem] p-6 border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-manrope text-sm font-medium text-slate-500">API Requests</h3>
              <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                <iconify-icon icon="solar:graph-up-linear" width="20" className="text-brand-primary-hover" />
              </div>
            </div>
            <div className="font-jakarta font-semibold text-3xl text-slate-900">856K</div>
            <p className="font-manrope text-sm text-slate-500 mt-1">Unlimited</p>
          </div>
          <div className="bg-white rounded-[2.5rem] p-6 border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-manrope text-sm font-medium text-slate-500">Team Members</h3>
              <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                <iconify-icon icon="solar:users-group-rounded-linear" width="20" className="text-brand-primary-hover" />
              </div>
            </div>
            <div className="font-jakarta font-semibold text-3xl text-slate-900">24</div>
            <p className="font-manrope text-sm text-slate-500 mt-1">Unlimited</p>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
          <div className="mb-6">
            <h3 className="font-jakarta font-semibold text-xl text-slate-900 mb-2">Subscription Plans</h3>
            <p className="font-manrope text-sm text-slate-500">Choose the plan that best fits your needs</p>
          </div>
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
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold font-manrope bg-brand-primary-bg text-brand-primary-dark">
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

        {/* Payment Method & Invoices */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Payment Method */}
          <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                <iconify-icon icon="solar:card-linear" width="20" className="text-brand-primary-hover" />
              </div>
              <div>
                <h3 className="font-jakarta font-semibold text-xl text-slate-900">Payment Method</h3>
                <p className="font-manrope text-sm text-slate-500">Your default payment method</p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200 bg-slate-50 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-manrope">VISA</span>
                  </div>
                  <div>
                    <p className="font-jakarta font-semibold text-slate-900">•••• •••• •••• 4242</p>
                    <p className="font-manrope text-sm text-slate-500 font-mono">Expires 12/2025</p>
                  </div>
                </div>
                <button className="font-manrope font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                  Update
                </button>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200 bg-slate-50">
              <p className="font-manrope text-sm font-medium text-slate-700 mb-2">Billing Address</p>
              <p className="font-manrope text-sm text-slate-600 font-mono">
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
          <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                <iconify-icon icon="solar:receipt-linear" width="20" className="text-brand-primary-hover" />
              </div>
              <div>
                <h3 className="font-jakarta font-semibold text-xl text-slate-900">Recent Invoices</h3>
                <p className="font-manrope text-sm text-slate-500">Download your past invoices</p>
              </div>
            </div>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <iconify-icon icon="solar:receipt-linear" width="20" className="text-slate-400" />
                    <div>
                      <p className="font-jakarta font-semibold text-slate-900">{invoice.id}</p>
                      <p className="font-manrope text-sm text-slate-500 font-mono">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-jakarta font-semibold text-slate-900">{invoice.amount}</span>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-manrope ${
                        invoice.status === 'paid'
                          ? 'bg-brand-primary-bg text-brand-primary-hover'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {invoice.status}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                      <iconify-icon icon="solar:download-linear" width="18" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 font-manrope font-medium bg-slate-100 text-slate-700 px-4 py-2.5 rounded-full hover:bg-slate-200 transition-colors">
              View All Invoices
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
