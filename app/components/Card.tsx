import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';
import { cn } from './cn';

// ============================================
// BASE CARD COMPONENT
// Standard container for content
// ============================================

type CardVariant = 'default' | 'elevated' | 'bordered';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

const cardVariants: Record<CardVariant, string> = {
  default: 'bg-white',
  elevated: 'bg-white shadow-sm',
  bordered: 'bg-white border border-slate-200',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-2xl overflow-hidden', cardVariants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

// ============================================
// CARD HEADER
// ============================================

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

// ============================================
// CARD CONTENT
// ============================================

export const CardContent = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

// ============================================
// FEATURE CARD - Grid card for features
// Based on dashboard grid: bg-slate-100 hover:bg-slate-200/80
// ============================================

interface FeatureGridCardProps {
  href: string;
  icon?: ReactNode;
  iconPlaceholder?: boolean;
  name: string;
  className?: string;
}

export function FeatureGridCard({
  href,
  icon,
  iconPlaceholder = true,
  name,
  className,
}: FeatureGridCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col items-center p-6 rounded-2xl bg-slate-100 hover:bg-slate-200/80 transition-all',
        className
      )}
    >
      {icon ? (
        <div className="w-16 h-16 rounded-2xl bg-slate-200 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
          {icon}
        </div>
      ) : iconPlaceholder ? (
        <div className="w-16 h-16 rounded-2xl bg-slate-400 mb-4 group-hover:scale-105 transition-transform" />
      ) : null}
      <span className="font-manrope text-sm font-medium text-slate-700 text-center">
        {name}
      </span>
    </Link>
  );
}

// ============================================
// SETTINGS CARD - Card for settings/presets
// Based on audio page preset cards
// ============================================

interface SettingsCardProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  title: string;
  description: string;
  selected?: boolean;
}

export const SettingsCard = forwardRef<HTMLButtonElement, SettingsCardProps>(
  ({ icon, title, description, selected = false, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3',
          selected
            ? 'border-brand bg-brand-bg ring-1 ring-brand/20'
            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              'mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
              selected ? 'bg-brand-muted text-brand' : 'bg-slate-100 text-slate-500'
            )}
          >
            {icon}
          </div>
        )}
        <div>
          <span
            className={cn(
              'font-medium text-sm',
              selected ? 'text-brand-dark' : 'text-slate-900'
            )}
          >
            {title}
          </span>
          <p className="text-xs text-slate-500 leading-snug">{description}</p>
        </div>
      </button>
    );
  }
);
SettingsCard.displayName = 'SettingsCard';

// ============================================
// UPLOAD CARD - Drag & drop upload area
// Based on audio page upload zone
// ============================================

interface UploadCardProps extends HTMLAttributes<HTMLDivElement> {
  isDragging?: boolean;
  children: ReactNode;
}

export const UploadCard = forwardRef<HTMLDivElement, UploadCardProps>(
  ({ isDragging = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-[400px] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 relative overflow-hidden',
          isDragging
            ? 'border-brand bg-brand-bg'
            : 'border-slate-200 bg-white',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
UploadCard.displayName = 'UploadCard';
