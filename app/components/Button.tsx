import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from './cn';

// ============================================
// BUTTON COMPONENT
// Variants: black (primary), white (secondary), green (accent)
// Based on FeaturePreview.tsx patterns
// ============================================

type ButtonVariant = 'black' | 'white' | 'green' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  // Primary black button - most common action
  black: 'bg-slate-900 text-white hover:bg-slate-800 shadow-md',
  
  // Secondary white button - for secondary actions
  white: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300',
  
  // Accent green button - for main CTA, success actions
  green: 'bg-brand text-white hover:bg-brand-light shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:scale-105',
  
  // Ghost button - minimal style
  ghost: 'text-slate-500 hover:text-slate-900 hover:bg-slate-100',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'black', size = 'md', icon, className, children, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'font-manrope font-semibold rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center justify-center gap-2',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================
// ICON BUTTON - For icon-only buttons
// ============================================

type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: IconButtonSize;
  children: ReactNode;
}

const iconSizes: Record<IconButtonSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'white', size = 'md', className, children, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'font-manrope rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center justify-center',
          variants[variant],
          iconSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
