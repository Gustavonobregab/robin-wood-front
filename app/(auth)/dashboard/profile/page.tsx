'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { useProfile } from '../../../hooks/use-profile';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, isLoading, mutate } = useProfile();
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) return;
    setIsSaving(true);
    
    try {
      const res = await fetch('http://localhost:3000/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      if (!res.ok) throw new Error('Failed to update');

      await mutate(); // Revalida os dados
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-slate-500 font-manrope">Loading profile...</div>;
  }

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
          <p className="font-manrope text-lg text-slate-500 mt-2">Manage your personal information.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content: Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-primary-bg flex items-center justify-center">
                  <iconify-icon icon="solar:user-linear" width="20" className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-jakarta font-semibold text-xl text-slate-900">Personal Information</h3>
                  <p className="font-manrope text-sm text-slate-500">Update your basic details</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Nome (Editável) */}
                <div>
                  <label className="font-manrope text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors font-manrope text-slate-900"
                  />
                </div>

                {/* Email (Read Only - Veio do Google/Auth) */}
                <div>
                  <label className="font-manrope text-sm font-medium text-slate-700 mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-slate-100 text-slate-500 cursor-not-allowed font-manrope"
                  />
                  <p className="text-xs text-slate-400 mt-1 ml-1">Email managed by Google Auth</p>
                </div>

                <button 
                  onClick={handleSave}
                  disabled={isSaving || name === user?.name}
                  className="font-manrope font-semibold bg-slate-900 text-white px-6 py-3 rounded-full shadow-md hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar: Stats & Avatar */}
          <div className="space-y-6">
            {/* Avatar Card */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
              <div className="flex flex-col items-center text-center">
                {user?.image ? (
                   <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-slate-50" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-jakarta font-semibold text-3xl mb-4">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                
                <h3 className="font-jakarta font-semibold text-xl text-slate-900 mb-1">{user?.name}</h3>
                <p className="font-manrope text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            {/* Account Stats Card */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <iconify-icon icon="solar:graph-up-linear" width="20" className="text-emerald-600" />
                </div>
                <h3 className="font-jakarta font-semibold text-xl text-slate-900">Usage Stats</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-neutral-200 bg-slate-50">
                  <p className="font-manrope text-sm text-slate-500 mb-1">Member Since</p>
                  <p className="font-jakarta font-semibold text-slate-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </p>
                </div>
                
                <div className="p-4 rounded-xl border border-neutral-200 bg-slate-50">
                  <p className="font-manrope text-sm text-slate-500 mb-1">Total Requests</p>
                  <p className="font-jakarta font-semibold text-slate-900">
                    {/* Formatação compacta: 1.2k, 1M */}
                    {Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(user?.stats?.totalRequests || 0)}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 bg-slate-50">
                  <p className="font-manrope text-sm text-slate-500 mb-1">Tokens Used</p>
                  <div className="flex items-center justify-between">
                    <p className="font-jakarta font-semibold text-slate-900">
                      {Intl.NumberFormat('en-US').format(user?.stats?.tokensUsed || 0)}
                    </p>
                    <span className="text-xs text-slate-400">of {Intl.NumberFormat('en-US', { notation: "compact" }).format(user?.stats?.tokensLimit || 0)}</span>
                  </div>
                  {/* Barra de progresso de tokens */}
                  <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${Math.min(100, ((user?.stats?.tokensUsed || 0) / (user?.stats?.tokensLimit || 1)) * 100)}%` }} 
                    />
                  </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}