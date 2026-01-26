import { cn } from '@/components/utils';

type ProgressVariant = 'horizontal' | 'vertical';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'horizontal',
  className,
  barClassName,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  if (variant === 'vertical') {
    return (
      <div className={cn('w-1 bg-slate-200 rounded-full', className)}>
        <div
          className={cn('w-full bg-green-600 rounded-full', barClassName)}
          style={{ height: `${percentage}%` }}
        />
      </div>
    );
  }

  return (
    <div className={cn('w-full bg-slate-100 h-1.5 rounded-full overflow-hidden', className)}>
      <div
        className={cn('bg-green-600 h-full transition-all', barClassName)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
