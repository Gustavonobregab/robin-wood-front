'use client';

import Script from 'next/script';
import { useState, useEffect, useCallback } from 'react';
import { getApiKeys, deleteApiKey } from '../../../http/keys';
import { PageTitle, Label, SectionTitle, Button } from '@/app/components';
import { CreateKeyModal } from '@/app/components/CreateKeyModal';
import { ConfirmModal } from '@/app/components/ConfirmModal';
import { toast } from 'sonner';
import type { ApiKey } from '@/types';

export default function KeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [keyToRevoke, setKeyToRevoke] = useState<{ id: string; name: string } | null>(null);

  const fetchApiKeys = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getApiKeys();
      const normalizedKeys = (response.data.keys || []).map((key: any) => ({
        ...key,
        id: String(key.id || key._id), 
        createdAt: String(key.createdAt), 
      }));
      setApiKeys(normalizedKeys);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      toast.error('Failed to load API keys');
      setApiKeys([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = async (keyValue: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(keyValue);
      setCopiedKey(keyId);
      toast.success('API key copied to clipboard');
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleKeyCreated = () => {
    fetchApiKeys(); 
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleRevokeKey = async () => {
    if (!keyToRevoke) return;
    
    try {
      await deleteApiKey(keyToRevoke.id);
      toast.success('API key revoked successfully');
      fetchApiKeys();
    } catch (err) {
      toast.error('Failed to revoke API key');
      console.error('Error revoking API key:', err);
      throw err;
    }
  };

  const activeKeys = apiKeys.filter((k) => k.status === 'active').length;
  const revokedKeys = apiKeys.filter((k) => k.status === 'revoked').length;
  const totalRequests = apiKeys.reduce((acc, k) => acc + (k.requestCount || 0), 0);

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
            <Label>API Management</Label>
            <PageTitle>API Keys</PageTitle>
          </div>
          <Button
            variant="black"
            icon={<iconify-icon icon="solar:add-circle-linear" width="18" />}
            onClick={() => setShowCreateModal(true)}
          >
            Create New Key
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Active Keys</h3>
            <div className="font-jakarta font-bold text-2xl text-slate-900">
              {isLoading ? '...' : activeKeys}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Total Requests</h3>
            <div className="font-jakarta font-bold text-2xl text-slate-900">
              {isLoading ? '...' : new Intl.NumberFormat('en-US', { notation: 'compact' }).format(totalRequests)}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-manrope text-sm font-medium text-slate-500 mb-2">Revoked Keys</h3>
            <div className="font-jakarta font-bold text-2xl text-slate-900">
              {isLoading ? '...' : revokedKeys}
            </div>
          </div>
        </div>

        {/* API Keys List */}
        <div>
          <SectionTitle className="mb-3">Your API Keys</SectionTitle>
          
          {isLoading ? (
            <div className="text-center py-12 text-slate-500">Loading API keys...</div>
          ) : activeKeys === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <iconify-icon icon="solar:key-linear" width="48" className="text-slate-300 mb-4" />
              <p className="font-manrope text-slate-600 mb-2">No API keys yet</p>
              <p className="font-manrope text-sm text-slate-500">
                Create your first API key to start using the Robin Wood API
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {apiKeys.filter((k) => k.status === 'active').map((key, index) => {
                const keyId = String(key.id || index);
                const createdDate = key.createdAt 
                  ? new Date(key.createdAt).toLocaleDateString()
                  : 'N/A';
                
                return (
                  <div
                    key={keyId}
                    className="flex items-center gap-4 px-3 py-3 rounded-lg transition-colors hover:bg-slate-100"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-manrope text-sm font-medium text-slate-900 truncate">
                        {key.name}
                      </p>
                      <p className="font-manrope text-xs text-slate-500 truncate">
                        {visibleKeys.has(keyId) ? key.key : '•'.repeat(Math.min(key.key?.length || 20, 32))}
                        {' • '}
                         {createdDate}
                        {key.requestCount !== undefined && ` • ${new Intl.NumberFormat('en-US').format(key.requestCount)} requests`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleKeyVisibility(keyId)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
                        title={visibleKeys.has(keyId) ? 'Hide key' : 'Show key'}
                      >
                        <iconify-icon
                          icon={visibleKeys.has(keyId) ? 'solar:eye-closed-linear' : 'solar:eye-linear'}
                          width="16"
                        />
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.key, keyId)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedKey === keyId ? (
                          <iconify-icon icon="solar:check-circle-linear" width="16" className="text-brand" />
                        ) : (
                          <iconify-icon icon="solar:copy-linear" width="16" />
                        )}
                      </button>
                      <button
                        onClick={() => setKeyToRevoke({ id: keyId, name: key.name })}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors font-manrope text-xs font-medium"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Key Modal */}
      <CreateKeyModal
        open={showCreateModal}
        onClose={closeCreateModal}
        onSuccess={handleKeyCreated}
      />

      {/* Revoke Key Confirmation Modal */}
      <ConfirmModal
        open={!!keyToRevoke}
        onClose={() => setKeyToRevoke(null)}
        onConfirm={handleRevokeKey}
        title="Revoke API Key"
        description={keyToRevoke?.name}
        message="Are you sure you want to revoke this API key? This action cannot be undone and any applications using this key will stop working."
        confirmText="Revoke Key"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
}
