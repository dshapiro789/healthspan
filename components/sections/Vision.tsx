'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { companyInfo } from '@/lib/data';

export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 bg-midnight-purple relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-periwinkle/5 via-transparent to-transparent" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-periwinkle/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-coral/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        
        {/* Decorative lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="vision-lines" width="100" height="100" patternUnits="userSpaceOnUse">
              <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vision-lines)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative element */}
          <div
            className={cn(
              'flex items-center justify-center gap-4 mb-8',
              isVisible && 'animate-fade-in'
            )}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-periwinkle" />
            <svg className="w-8 h-8 text-periwinkle" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-periwinkle" />
          </div>

          {/* Quote */}
          <blockquote>
            <p
              className={cn(
                'font-display text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed',
                isVisible && 'animate-fade-in-up'
              )}
              style={{ animationDelay: '0.1s' }}
            >
              "{companyInfo.vision}"
            </p>
          </blockquote>

          {/* Stats row */}
          <div
            className={cn(
              'mt-16 grid grid-cols-2 md:grid-cols-4 gap-8',
              isVisible && 'animate-fade-in-up'
            )}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-periwinkle mb-2">100+</div>
              <div className="text-text-muted text-sm uppercase tracking-wider">Years Goal</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-periwinkle mb-2">20+</div>
              <div className="text-text-muted text-sm uppercase tracking-wider">Speakers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-periwinkle mb-2">9+</div>
              <div className="text-text-muted text-sm uppercase tracking-wider">Partner Brands</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-periwinkle mb-2">4+</div>
              <div className="text-text-muted text-sm uppercase tracking-wider">Events</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
