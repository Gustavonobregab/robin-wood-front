import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './cn';

// ============================================
// BADGE COMPONENT
// Status indicators and labels
// ============================================

type BadgeVariant = 'status' | 'label' | 'success' | 'muted';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  status: 'bg-brand-bg border border-brand-muted',
  label: 'bg-slate-100 text-slate-500',
  success: 'bg-brand-muted text-brand-dark',
  muted: 'bg-slate-100 text-slate-600',
};

export function Badge({ variant = 'label', className, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold',
        variants[variant],
        className
      )}
      {...props}
    >
      {variant === 'status' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-light opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
        </span>
      )}
      {children}
    </div>
  );
}
