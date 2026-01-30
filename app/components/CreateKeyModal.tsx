'use client';

import { useState } from 'react';
import { createApiKey } from '../http/keys';
import { Modal, ModalHeader, ModalContent, ModalFooter } from './Modal';
import { Button, Input } from './index';
import { toast } from 'sonner';

// ============================================
// CREATE API KEY MODAL
// Modal for creating a new API key
// ============================================

interface CreateKeyModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback when key is created successfully
}

export function CreateKeyModal({ open, onClose, onSuccess }: CreateKeyModalProps) {
  const [keyName, setKeyName] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!keyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    setIsCreating(true);
    try {
      const response = await createApiKey({ name: keyName });
      setCreatedKey(response.data.key);
      onSuccess();
      toast.success('API key created successfully');
    } catch (err) {
      toast.error('Failed to create API key');
      console.error('Error creating API key:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopy = async () => {
    if (!createdKey) return;

    try {
      await navigator.clipboard.writeText(createdKey);
      setCopied(true);
      toast.success('API key copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleClose = () => {
    setKeyName('');
    setCreatedKey(null);
    setCopied(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {createdKey ? (
        <>
          <ModalHeader
            icon={
              <iconify-icon icon="solar:check-circle-bold" width="24" className="text-brand" />
            }
            title="Key Created!"
            description="Copy and save this key securely"
          />

          <ModalContent>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
              <p className="font-mono text-sm text-slate-900 break-all">{createdKey}</p>
            </div>

            <div className="bg-brand-bg border border-brand/20 rounded-xl p-3">
              <p className="text-xs text-brand-dark">
                <iconify-icon icon="solar:info-circle-bold" width="14" className="inline mr-1" />
                This is the only time you'll see the full key. Store it securely.
              </p>
            </div>
          </ModalContent>

          <ModalFooter>
            <Button
              variant="white"
              className="flex-1"
              onClick={handleCopy}
              icon={
                copied ? (
                  <iconify-icon icon="solar:check-circle-linear" width="16" />
                ) : (
                  <iconify-icon icon="solar:copy-linear" width="16" />
                )
              }
            >
              {copied ? 'Copied!' : 'Copy Key'}
            </Button>
            <Button variant="black" className="flex-1" onClick={handleClose}>
              Done
            </Button>
          </ModalFooter>
        </>
      ) : (
        // Create form
        <>
          <ModalHeader
            icon={<iconify-icon icon="solar:key-linear" width="24" className="text-slate-600" />}
            title="Create API Key"
            description="Give your key a descriptive name"
            onClose={handleClose}
          />

          <ModalContent>
            <Input
              label="Key Name"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="e.g., Production API Key"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && !isCreating && handleCreate()}
            />
          </ModalContent>

          <ModalFooter>
            <Button
              variant="white"
              className="flex-1"
              onClick={handleClose}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              variant="black"
              className="flex-1"
              onClick={handleCreate}
              disabled={isCreating || !keyName.trim()}
            >
              {isCreating ? 'Creating...' : 'Create Key'}
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
}
