import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-delay-1',
        className
      )}
    >
      {children}
    </div>
  );
}
