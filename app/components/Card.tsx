import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';

type CardVariant = 'default' | 'feature' | 'dark';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  children: ReactNode;
}

const variants: Record<CardVariant, string> = {
  default: 'bg-white border-neutral-200',
  feature: 'bg-white border-neutral-200',
  dark: 'bg-slate-900 border-slate-800 text-white',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[2.5rem] border overflow-hidden',
          variants[variant],
          hover && 'hover:border-green-300 transition-colors',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 md:p-8', className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

// Card Content
export const CardContent = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';
