import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './cn';


interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export function Modal({ open, onClose, children, size = 'md', className }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade"
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-white rounded-2xl shadow-2xl w-full',
          sizes[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  onClose?: () => void;
}

export function ModalHeader({ icon, title, description, onClose, className }: ModalHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between p-6 pb-4', className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-jakarta font-semibold text-xl text-slate-900">{title}</h3>
          {description && (
            <p className="font-manrope text-sm text-slate-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-900 transition-colors -mr-1 -mt-1"
        >
          <iconify-icon icon="solar:close-circle-linear" width="24" />
        </button>
      )}
    </div>
  );
}


interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-2', className)} {...props}>
      {children}
    </div>
  )
);
ModalContent.displayName = 'ModalContent';


interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-4 flex gap-2', className)} {...props}>
      {children}
    </div>
  )
);
ModalFooter.displayName = 'ModalFooter';
