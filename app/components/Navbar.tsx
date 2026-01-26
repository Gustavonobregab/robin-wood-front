'use client';

import { Logo } from './Logo';
import { Button } from './Button';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <div className={`w-full px-8 pt-8 md:px-12 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-6 z-20 ${className}`}>
      <Logo />
      <div className="flex items-center gap-4">
        <Button variant="ghost">Documentation</Button>
        <Button variant="primary" size="md">Get API Key</Button>
      </div>
    </div>
  );
}
