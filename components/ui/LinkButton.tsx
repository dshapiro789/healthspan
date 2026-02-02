import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface LinkButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'coral' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  children,
}: LinkButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center
    font-body font-semibold tracking-wide
    rounded-lg overflow-hidden
    transition-all duration-300 ease-smooth
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-periwinkle focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-purple
  `;

  const variants = {
    primary: `
      bg-periwinkle text-white
      hover:bg-periwinkle-dark hover:shadow-glow-periwinkle
      active:scale-[0.98]
    `,
    secondary: `
      bg-transparent text-periwinkle
      border-2 border-periwinkle
      hover:bg-periwinkle hover:text-white
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-text-light
      hover:bg-white/10 hover:text-white
      active:scale-[0.98]
    `,
    gold: `
      bg-coral text-white
      hover:bg-coral-dark hover:shadow-glow-coral
      active:scale-[0.98]
    `,
    coral: `
      bg-coral text-white
      hover:bg-coral-dark hover:shadow-glow-coral
      active:scale-[0.98]
    `,
    outline: `
      bg-transparent text-text-light
      border border-white/20
      hover:border-periwinkle hover:text-periwinkle
      active:scale-[0.98]
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
}
