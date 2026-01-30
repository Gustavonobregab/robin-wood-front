'use client';

import { useState } from 'react';
import { Modal, ModalHeader, ModalContent, ModalFooter } from './Modal';
import { Button } from './index';


interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  description?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'default';
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
}: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      console.error('Confirm action failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const iconConfig = {
    danger: {
      icon: 'solar:trash-bin-trash-linear',
      iconClass: 'text-slate-600',
      bgClass: 'bg-slate-100',
    },
    warning: {
      icon: 'solar:danger-triangle-linear',
      iconClass: 'text-slate-600',
      bgClass: 'bg-slate-100',
    },
    default: {
      icon: 'solar:question-circle-linear',
      iconClass: 'text-slate-600',
      bgClass: 'bg-slate-100',
    },
  };

  const config = iconConfig[variant];

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <ModalHeader
        icon={
          <iconify-icon icon={config.icon} width="24" className={config.iconClass} />
        }
        title={title}
        description={description}
      />

      <ModalContent>
        <p className="text-sm text-slate-600">{message}</p>
      </ModalContent>

      <ModalFooter>
        <Button
          variant="white"
          className="flex-1"
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          variant="black"
          className="flex-1"
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
