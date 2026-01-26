import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/components/utils';

type BadgeVariant = 'status' | 'label' | 'size';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  status: 'bg-green-50 border border-green-100',
  label: 'bg-slate-100 text-slate-500',
  size: 'bg-green-100 text-green-700',
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
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
        </span>
      )}
      {children}
    </div>
  );
}
