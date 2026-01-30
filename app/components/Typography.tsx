import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './cn';

// ============================================
// PAGE TITLE - Main page headings
// Based on dashboard: font-jakarta font-semibold text-4xl tracking-tight text-slate-900
// ============================================
interface PageTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const PageTitle = forwardRef<HTMLHeadingElement, PageTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        'font-jakarta font-semibold text-4xl tracking-tight text-slate-900',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
);
PageTitle.displayName = 'PageTitle';

// ============================================
// SECTION TITLE - Section headings (h2)
// Based on: font-jakarta font-semibold text-xl text-slate-900
// ============================================
interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'font-jakarta font-semibold text-xl text-slate-900',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
);
SectionTitle.displayName = 'SectionTitle';

// ============================================
// LABEL - Small labels above sections
// Based on: font-manrope text-sm text-slate-500
// ============================================
interface LabelProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const Label = forwardRef<HTMLParagraphElement, LabelProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('font-manrope text-sm text-slate-500', className)}
      {...props}
    >
      {children}
    </p>
  )
);
Label.displayName = 'Label';

// ============================================
// TEXT - Body text
// Based on: font-manrope text-sm text-slate-700
// ============================================
type TextVariant = 'default' | 'muted' | 'small';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  children: ReactNode;
}

const textVariants: Record<TextVariant, string> = {
  default: 'text-sm text-slate-700',
  muted: 'text-sm text-slate-500',
  small: 'text-xs text-slate-500',
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant = 'default', className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('font-manrope', textVariants[variant], className)}
      {...props}
    >
      {children}
    </p>
  )
);
Text.displayName = 'Text';

// ============================================
// ITEM TITLE - Titles for list items
// Based on: font-manrope text-sm font-medium text-slate-900
// ============================================
interface ItemTitleProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const ItemTitle = forwardRef<HTMLParagraphElement, ItemTitleProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'font-manrope text-sm font-medium text-slate-900',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
);
ItemTitle.displayName = 'ItemTitle';
