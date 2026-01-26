import { type HTMLAttributes } from 'react';
import { cn } from '@/components/utils';

type IconBoxSize = 'sm' | 'md' | 'lg';

interface IconBoxProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  size?: IconBoxSize;
}

const sizes: Record<IconBoxSize, { box: string; icon: number }> = {
  sm: { box: 'w-8 h-8 rounded-lg', icon: 16 },
  md: { box: 'w-10 h-10 rounded-xl', icon: 20 },
  lg: { box: 'w-12 h-12 rounded-2xl', icon: 28 },
};

export function IconBox({ icon, size = 'md', className, ...props }: IconBoxProps) {
  const sizeConfig = sizes[size];

  return (
    <div
      className={cn(
        'bg-green-100 flex items-center justify-center text-green-700',
        sizeConfig.box,
        className
      )}
      {...props}
    >
      <iconify-icon icon={icon} width={sizeConfig.icon} />
    </div>
  );
}
