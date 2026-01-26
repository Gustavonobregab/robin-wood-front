import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';
import { IconBox } from './IconBox';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  size?: 'small' | 'large';
  visual?: ReactNode;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  size = 'small',
  visual,
  className,
}: FeatureCardProps) {
  if (size === 'large') {
    return (
      <div
        className={cn(
          'md:col-span-2 md:row-span-2 bg-white rounded-[2.5rem] p-8 border border-neutral-200 overflow-hidden relative group hover:border-green-300 transition-all duration-300',
          className
        )}
      >
        <div className="flex flex-col h-full justify-between relative z-10">
          <div>
            <IconBox icon={icon} size="lg" className="mb-6" />
            <h3 className="font-jakarta font-medium text-2xl tracking-tight text-slate-900 mb-3">
              {title}
            </h3>
            <p className="font-manrope text-slate-500 leading-relaxed max-w-md">
              {description}
            </p>
          </div>
          {visual && <div className="mt-10">{visual}</div>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white rounded-[2.5rem] p-6 border border-neutral-200 hover:border-green-300 transition-colors group',
        className
      )}
    >
      <iconify-icon
        icon={icon}
        className="text-slate-400 group-hover:text-brand-primary-hover transition-colors text-3xl mb-4"
      />
      <h3 className="font-jakarta font-medium text-lg text-slate-900 mb-1">{title}</h3>
      <p className="font-manrope text-sm text-slate-500">{description}</p>
      {visual && <div className="mt-4">{visual}</div>}
    </div>
  );
}
