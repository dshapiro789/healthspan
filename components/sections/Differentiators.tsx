'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui';
import { differentiators } from '@/lib/data';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// Sub-component for individual card animation
function DifferentiatorCard({ item, index, scrollYProgress, icon }: { item: any, index: number, scrollYProgress: MotionValue<number>, icon: React.ReactNode }) {
  // Calculate staggered ranges based on index
  // Row 1 (indexes 0,1,2) enters early, Row 2 (3,4,5) enters later
  const row = Math.floor(index / 3);
  const col = index % 3;

  // Refined entrance timing for smoother cascade
  const start = 0.1 + (row * 0.1) + (col * 0.05);
  const end = start + 0.2;

  // Combined exit timing
  const exitStart = 0.8 + (row * 0.05);
  const exitEnd = 1.0;

  const opacity = useTransform(
    scrollYProgress,
    [start, end, exitStart, exitEnd],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, end, exitStart, exitEnd],
    [100, 0, 0, -100]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, end, exitStart, exitEnd],
    [0.85, 1, 1, 0.9]
  );

  // Blur effect for that "out of focus" entry
  // Optimized: Reduced max blur to 5px for better performance
  const blur = useTransform(
    scrollYProgress,
    [start, end, exitStart, exitEnd],
    [5, 0, 0, 5]
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        willChange: "opacity, transform, filter"
      }}
      className="h-full transform-gpu"
    >
      <Card
        className="group relative h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-coral/50 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,20,147,0.25),0_0_30px_rgba(255,20,147,0.15)]"
      >
        {/* Gradient Border effect - Always Visible */}
        <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-periwinkle/20 to-coral/20" />
        </div>

        {/* Glow Orb - Always Visible */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-periwinkle/30 rounded-full blur-3xl transition-opacity duration-500" />
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-coral/20 rounded-full blur-3xl transition-opacity duration-500 delay-75" />

        <CardContent className="relative p-8 flex flex-col h-full z-10">
          {/* Icon Container */}
          <div className="mb-6 inline-flex relative">
            <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-coral/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(255,20,147,0.4)]">
              <div className="text-periwinkle-light group-hover:text-coral transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,20,147,0.8)]">
                {icon}
              </div>
            </div>
            {/* Icon Glow Behind - Always Visible */}
            <div className="absolute inset-0 bg-periwinkle/20 blur-xl rounded-full transition-opacity duration-500" />
          </div>

          {/* Title with pink gradient on hover - layered approach for smooth transition */}
          <h3 className="font-display text-2xl font-semibold mb-4 relative">
            {/* Base layer - solid white text always visible */}
            <span className="text-white">{item.title}</span>
            {/* Overlay layer - gradient text that fades in on hover */}
            <span
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-white via-coral/90 to-periwinkle-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            >
              {item.title}
            </span>
          </h3>

          {/* Description */}
          <p className="text-text-light/70 leading-relaxed group-hover:text-text-light/90 transition-colors duration-300">
            {item.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Differentiators() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Header Animation
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [50, 0, 0, -50]);
  // Optimized: Reduced max blur to 5px
  const headerBlur = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [5, 0, 0, 5]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.95, 1, 1, 0.95]);

  // Icons for each differentiator
  const icons = [
    // Science - microscope/DNA
    <svg key="science" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.75 3v6.75m0 0L6 17.25h12L14.25 9.75m-4.5 0h4.5m0 0V3M6 21h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Investment - chart/growth
    <svg key="investment" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Community - people
    <svg key="community" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Nature - leaf/sun
    <svg key="nature" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Experiential - sparkles
    <svg key="experiential" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Innovation - lightbulb
    <svg key="innovation" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ];

  return (
    <section
      ref={containerRef}
      className="section-padding bg-midnight-purple relative overflow-hidden"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft moving gradient blob - Top Right (Coral) */}
        <motion.div
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-coral/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Soft moving gradient blob - Bottom Left (Periwinkle) */}
        <motion.div
          className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] bg-periwinkle/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-purple via-transparent to-midnight-purple z-10" />
      </div>

      <div className="container-custom relative z-20">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            style={{
              opacity: headerOpacity,
              y: headerY,
              scale: headerScale,
              filter: useTransform(headerBlur, (v) => `blur(${v}px)`),
              willChange: "opacity, transform, filter"
            }}
          >
            <h2 className="font-display text-section text-white mb-6 tracking-tight">
              Why Our Events Are{' '}
              <span className="text-gradient-animated bg-clip-text text-transparent bg-gradient-to-r from-coral via-periwinkle to-royal-purple">
                Different
              </span>
            </h2>
            <p className="text-text-light/80 text-lg md:text-xl font-light leading-relaxed">
              We've reimagined what a health and longevity event can be.
              <span className="block mt-2">Here's what sets Healthspan Productions apart.</span>
            </p>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {differentiators.map((item, index) => (
            <DifferentiatorCard
              key={item.id}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
              icon={icons[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
