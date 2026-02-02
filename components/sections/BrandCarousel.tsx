'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { brands } from '@/lib/data';
import Link from 'next/link';

export function BrandCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Double the brands array for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-midnight-purple relative overflow-hidden"
    >
      {/* Enhanced background decoration with animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-periwinkle/8 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-coral/8 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Enhanced Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Animated badge */}
          <motion.div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6',
              isVisible && 'animate-fade-in-up'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
              Trusted Partners
            </span>
          </motion.div>

          <motion.h2
            className="font-display text-section text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Ecosystem of{' '}
            <span className="relative inline-block">
              <span className="text-gradient-coral">Brands</span>
              {/* Underline accent */}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-coral via-coral-light to-transparent rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={isVisible ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
          </motion.h2>
          <motion.p
            className="text-text-muted text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Partner with science-backed companies leading the longevity revolution
          </motion.p>
        </div>
      </div>

      {/* Enhanced Infinite scroll carousel */}
      <motion.div
        className="relative overflow-hidden py-8"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Enhanced Gradient masks with longer fade */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-midnight-purple via-midnight-purple/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-midnight-purple via-midnight-purple/80 to-transparent z-10 pointer-events-none" />

        {/* Pause indicator */}
        {isPaused && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-xs text-white/80 font-medium">Paused</span>
            </div>
          </motion.div>
        )}

        {/* Scrolling container */}
        <div
          className={cn(
            'flex items-center gap-6',
            isPaused ? '' : 'animate-marquee'
          )}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            animationDuration: '40s'
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <a
              key={`${brand.id}-${index}`}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group"
              aria-label={`Visit ${brand.name}`}
            >
              {/* Premium glass card */}
              <div className="relative px-8 py-5 min-w-[180px]">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-periwinkle/30 via-coral/20 to-periwinkle/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

                {/* Card background */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-500 px-6 py-4">
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>

                  {/* Brand name */}
                  <span className="relative text-white/70 text-sm font-medium group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-periwinkle/20 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Enhanced CTA */}
      <div className="container-custom relative z-10 mt-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-periwinkle/50 hover:bg-white/10 transition-all duration-500"
          >
            <span className="text-white font-medium">Become a Partner</span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-periwinkle/20 group-hover:bg-periwinkle/40 transition-colors duration-300">
              <svg
                className="w-4 h-4 text-periwinkle group-hover:translate-x-0.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

