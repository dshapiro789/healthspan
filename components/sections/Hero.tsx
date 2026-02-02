'use client';

import { ReactNode, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, ParticleText } from '@/components/ui';

interface HeroProps {
  title: string | ReactNode;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  backgroundVideo?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  fullHeight?: boolean;
  alignment?: 'left' | 'center';
  showScrollIndicator?: boolean;
  children?: ReactNode;
}

// Animation variants for staggered fade-in
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// 3D tilt card animation for premium entry effect
const cardVariants = {
  hidden: {
    opacity: 0,
    rotateX: 15,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Blur-to-sharp text reveal
const blurRevealVariants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// CTA button animation with glow
const ctaVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const scrollIndicatorVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1, duration: 0.5 },
  },
};

export function Hero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundVideo,
  backgroundImage,
  overlayOpacity = 60,
  fullHeight = true,
  alignment = 'center',
  showScrollIndicator = true,
  children,
}: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if video is already ready (e.g. from cache)
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
    }
  }, []);

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        fullHeight ? 'min-h-screen' : 'min-h-[70vh]',
        'flex items-center justify-center'
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-midnight-purple">
        {backgroundVideo ? (
          // Video background with fade-in
          <div className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            videoLoaded ? "opacity-100" : "opacity-0"
          )}>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        ) : backgroundImage ? (
          // Optimized image background with blur placeholder
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
        ) : (
          <div className="absolute inset-0 bg-hero-gradient" />
        )}


        {/* Overlay: Subtle Pinkish/Purple Tint */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-transparent to-coral/30 mix-blend-overlay"
          style={{ opacity: 0.6 }}
        />

        {/* Overlay: Cinematic Vignette */}
        <div
          className={cn(
            "absolute inset-0 cinematic-vignette",
            "transition-opacity duration-700"
          )}
          style={{ opacity: overlayOpacity / 100 }}
        />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-mesh-gradient" />

        {/* Creative Coral/Purple Gradient Blend */}
        {/* Coral radial from bottom-left corner */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 0% 100%, rgba(255, 111, 97, 0.45) 0%, rgba(255, 111, 97, 0.2) 35%, transparent 70%)',
            mixBlendMode: 'soft-light',
          }}
        />
        {/* Deep purple radial from top-right */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 90% at 100% 0%, rgba(129, 118, 242, 0.5) 0%, rgba(100, 80, 180, 0.25) 40%, transparent 75%)',
            mixBlendMode: 'overlay',
          }}
        />
        {/* Center gradient wash for cohesion */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(129, 118, 242, 0.15) 0%, transparent 60%)',
            mixBlendMode: 'color-dodge',
          }}
        />
        {/* Full dark overlay - deep purple-black */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(10, 5, 20, 0.72)',
          }}
        />
        {/* Dark base for text readability - subtle */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
      </div>



      {/* Content */}
      <motion.div
        className={cn(
          'relative z-10 container-custom flex flex-col items-center justify-center min-h-screen',
          alignment === 'center' ? 'text-center' : 'text-left'
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={cn(
          'max-w-5xl',
          alignment === 'center' && 'mx-auto'
        )}>
          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-white/80 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-8 font-sans drop-shadow-lg"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title - Clean Bold Style */}
          <motion.h1
            className={cn(
              "text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.05]",
              "tracking-tight font-bold",
              alignment === 'center' ? 'text-center' : 'text-left'
            )}
            variants={itemVariants}
          >
            <span className="block text-white mb-1" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Extend Your
            </span>
            <ParticleText
              text="Healthspan"
              particleCount={55}
              duration={1.4}
              delay={0.4}
              colors={['#FF6F61', '#FF8A80', '#FFB4AB', '#8176F2', '#B4A8FF', '#FFFFFF']}
            />
          </motion.h1>

          {/* Description with Blur-to-Sharp Reveal */}
          {description && (
            <motion.p
              className={cn(
                'text-lg md:text-xl text-white/90 max-w-2xl mb-12 font-medium leading-relaxed drop-shadow-lg',
                alignment === 'center' && 'mx-auto'
              )}
              variants={blurRevealVariants}
            >
              {description}
            </motion.p>
          )}

          {/* CTAs with Glow Effect */}
          {(primaryCta || secondaryCta) && (
            <motion.div
              className={cn(
                'flex flex-wrap gap-6',
                alignment === 'center' && 'justify-center'
              )}
              variants={ctaVariants}
            >
              {primaryCta && (
                <motion.button
                  className="relative group overflow-hidden rounded-full py-4 px-10 font-bold text-white shadow-[0_0_20px_rgba(107,92,231,0.5)] transition-all"
                  onClick={() => {
                    if (primaryCta.external) {
                      window.open(primaryCta.href, '_blank');
                    } else {
                      window.location.href = primaryCta.href;
                    }
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(107,92,231,0.8)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Liquid Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-periwinkle via-pink-500 to-royal-purple bg-[length:200%_auto] animate-gradient-xy opacity-90 group-hover:opacity-100 transition-opacity" />

                  {/* Sheen Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shine" />

                  <span className="relative flex items-center gap-2 tracking-wider uppercase text-sm">
                    {primaryCta.label}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </motion.button>
              )}

              {secondaryCta && (
                <motion.button
                  className="relative group overflow-hidden rounded-full py-4 px-10 font-bold text-white border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (secondaryCta.external) {
                      window.open(secondaryCta.href, '_blank');
                    } else {
                      window.location.href = secondaryCta.href;
                    }
                  }}
                >
                  {/* Subtle Shimmer Background on Hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />

                  <span className="relative tracking-wider uppercase text-sm">
                    {secondaryCta.label}
                  </span>
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Custom children */}
          {children}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      {showScrollIndicator && fullHeight && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate="visible"
        >
          <button
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
              });
            }}
            className="flex flex-col items-center gap-2 text-text-light/60 hover:text-white transition-colors duration-300 group"
            aria-label="Scroll to content"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </button>
        </motion.div>
      )}
    </section>
  );
}
