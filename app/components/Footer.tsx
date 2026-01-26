import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';

const productLinks = [
  { label: 'Features', href: '#' },
  { label: 'Integrations', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Changelog', href: '#' },
];

const companyLinks = [
  { label: 'About', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Legal', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-white rounded-[2.5rem] border border-neutral-200 p-8 md:p-12 animate-fade-delay-2">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="max-w-xs">
          <Logo size="sm" variant="dark" className="mb-4" />
          <p className="font-manrope text-sm text-slate-500">
            Making the internet faster, one byte at a time. Designed for developers who care about performance.
          </p>
        </div>

        <div className="flex gap-12 md:gap-20">
          <div className="flex flex-col gap-3">
            <h4 className="font-jakarta font-semibold text-sm text-slate-900">Product</h4>
            {productLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-manrope text-sm text-slate-500 hover:text-brand-primary-dark transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-jakarta font-semibold text-sm text-slate-900">Company</h4>
            {companyLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-manrope text-sm text-slate-500 hover:text-brand-primary-dark transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-manrope text-xs text-slate-400">
          &copy; 2024 Robin Wood Inc. All rights reserved.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
