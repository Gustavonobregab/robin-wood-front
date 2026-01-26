import { cn } from '@/components/utils';

interface LogoProps {
  size?: 'sm' | 'md';
  variant?: 'default' | 'dark';
  className?: string;
}

export function Logo({ size = 'md', variant = 'default', className }: LogoProps) {
  const textSize = size === 'sm' ? 'text-base' : 'text-lg';

  return (
    <div className={cn('flex items-center', className)}>
      <span className={cn('font-jakarta font-semibold tracking-tighter uppercase text-slate-900', textSize)}>
        ROBINWOOD
      </span>
    </div>
  );
}
