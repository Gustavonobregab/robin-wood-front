'use client';

import Script from 'next/script';

export default function ProfilePage() {
  return (
    <>
      <Script
        src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
        strategy="afterInteractive"
      />

      <div className="space-y-6 animate-fade">
        {/* Header */}
        <div>
          <h1 className="font-jakarta font-semibold text-4xl md:text-5xl tracking-tight text-slate-900">
            Profile
          </h1>
          <p className="font-manrope text-lg text-slate-500 mt-2">Manage your personal information and account settings.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                  <iconify-icon icon="solar:user-linear" width="20" className="text-brand-primary-hover" />
                </div>
                <div>
                  <h3 className="font-jakarta font-semibold text-xl text-slate-900">Personal Information</h3>
                  <p className="font-manrope text-sm text-slate-500">Update your personal details</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-manrope text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-slate-50 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors font-manrope text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-manrope text-sm font-medium text-slate-700 mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    defaultValue="john.doe@acme.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-slate-50 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors font-manrope text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-manrope text-sm font-medium text-slate-700 mb-1.5 block">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-slate-50 focus:bg-white focus:border-brand-primary focus:outline-none transition-colors font-manrope text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-manrope text-sm font-medium text-slate-700 mb-1.5 block">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Senior Developer at Acme Corporation. Passionate about building scalable applications."
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-slate-50 focus:bg-white focus:border-green-500 focus:outline-none transition-colors font-manrope text-slate-900 resize-none"
                  />
                </div>
                <button className="font-manrope font-semibold bg-slate-900 text-white px-6 py-3 rounded-full shadow-md hover:bg-slate-800 transition-transform active:scale-95">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                  <iconify-icon icon="solar:shield-check-linear" width="20" className="text-brand-primary-hover" />
                </div>
                <div>
                  <h3 className="font-jakarta font-semibold text-xl text-slate-900">Security</h3>
                  <p className="font-manrope text-sm text-slate-500">Manage your account security</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 bg-slate-50">
                  <div>
                    <p className="font-jakarta font-medium text-slate-900">Password</p>
                    <p className="font-manrope text-sm text-slate-500">Last updated 3 months ago</p>
                  </div>
                  <button className="font-manrope font-medium text-brand-primary-hover hover:text-brand-primary-dark px-4 py-2 rounded-full hover:bg-brand-primary-bg transition-colors">
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 bg-slate-50">
                  <div>
                    <p className="font-jakarta font-medium text-slate-900">Two-Factor Authentication</p>
                    <p className="font-manrope text-sm text-slate-500">Add an extra layer of security</p>
                  </div>
                  <button className="font-manrope font-medium text-brand-primary-hover hover:text-brand-primary-dark px-4 py-2 rounded-full hover:bg-brand-primary-bg transition-colors">
                    Enable 2FA
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 bg-slate-50">
                  <div>
                    <p className="font-jakarta font-medium text-slate-900">Active Sessions</p>
                    <p className="font-manrope text-sm text-slate-500">3 devices currently signed in</p>
                  </div>
                  <button className="font-manrope font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full hover:bg-slate-100 transition-colors">
                    View All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Sidebar */}
          <div className="space-y-6">
            {/* Avatar & Stats */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-brand-primary flex items-center justify-center text-white font-jakarta font-semibold text-3xl mb-4">
                  JD
                </div>
                <h3 className="font-jakarta font-semibold text-xl text-slate-900 mb-1">John Doe</h3>
                <p className="font-manrope text-sm text-slate-500 mb-4">john.doe@acme.com</p>
                <div className="w-full h-1 bg-slate-100 rounded-full mb-4">
                  <div className="h-full bg-brand-primary rounded-full" style={{ width: '75%' }} />
                </div>
                <p className="font-manrope text-xs text-slate-500">Profile 75% complete</p>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                  <iconify-icon icon="solar:graph-up-linear" width="20" className="text-brand-primary-hover" />
                </div>
                <h3 className="font-jakarta font-semibold text-xl text-slate-900">Account Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-neutral-200 bg-slate-50">
                  <p className="font-manrope text-sm text-slate-500 mb-1">Member Since</p>
                  <p className="font-jakarta font-semibold text-slate-900">January 2024</p>
                </div>
                <div className="p-4 rounded-xl border border-neutral-200 bg-slate-50">
                  <p className="font-manrope text-sm text-slate-500 mb-1">Total API Requests</p>
                  <p className="font-jakarta font-semibold text-slate-900">1.2M</p>
                </div>
                <div className="p-4 rounded-xl border border-neutral-200 bg-slate-50">
                  <p className="font-manrope text-sm text-slate-500 mb-1">Organizations</p>
                  <p className="font-jakarta font-semibold text-slate-900">3 active</p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-red-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <iconify-icon icon="solar:danger-triangle-linear" width="20" className="text-red-600" />
                </div>
                <h3 className="font-jakarta font-semibold text-xl text-slate-900">Danger Zone</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full font-manrope font-medium bg-red-50 text-red-700 px-4 py-2.5 rounded-full hover:bg-red-100 transition-colors">
                  Delete Account
                </button>
                <p className="font-manrope text-xs text-slate-500 text-center">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
