'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'coral' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center
      font-body font-semibold tracking-wide
      rounded-lg overflow-hidden
      transition-all duration-300 ease-smooth
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-periwinkle focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-purple
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
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

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        <span className={cn(isLoading && 'invisible')}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
