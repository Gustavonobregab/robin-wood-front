import { cn } from '@/components/utils';

interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { icon: 'mdi:twitter', href: '#', label: 'Twitter' },
  { icon: 'mdi:github', href: '#', label: 'GitHub' },
  { icon: 'mdi:discord', href: '#', label: 'Discord' },
];

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn('flex gap-4', className)}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="text-slate-400 hover:text-slate-900 transition-colors"
        >
          <iconify-icon icon={link.icon} width={20} />
        </a>
      ))}
    </div>
  );
}
