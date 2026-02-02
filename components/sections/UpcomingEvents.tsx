'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { EventCard } from '@/components/events';
import { MagneticButton, SpotlightCard } from '@/components/ui';
import { useDecodedText } from '@/hooks/useDecodedText';
import { externalLinks } from '@/lib/data';
import type { Event } from '@/types';

interface UpcomingEventsProps {
    featuredEvent: Event;
    upcomingEvent?: Event;
}

function DecodedHeader({ text, className }: { text: string, className?: string }) {
    const { displayText, ref } = useDecodedText(text);
    // Ensure we render a motion component to attach the ref properly formatting/animation props if needed
    return <motion.span ref={ref} className={className}>{displayText}</motion.span>;
}

export function UpcomingEvents({ featuredEvent, upcomingEvent }: UpcomingEventsProps) {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 });

    // Scroll-linked animation for the header text
    const headerOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
    const headerY = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [50, 0, 0, -50]);
    const headerBlur = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [10, 0, 0, 10]);

    return (
        <section
            ref={containerRef}
            className="section-padding relative overflow-hidden bg-midnight-purple selection:bg-[#FF1493]/30"
        >
            {/* 1. Living Breath Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a1b5c] via-midnight-purple to-midnight-purple opacity-80" />

                {/* Breathing Hot Pink Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FF1493]/10 rounded-full blur-[80px] mix-blend-screen"
                    style={{ contain: 'paint' }}
                />

                {/* Breathing Periwinkle Accent */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute top-1/3 right-[-10%] w-[600px] h-[600px] bg-periwinkle/10 rounded-full blur-[70px]"
                    style={{ contain: 'paint' }}
                />
            </div>

            {/* 4. Leading Spark Scroll Tracer */}
            {/* A subtle line tracing the left edge that glows based on scroll */}
            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block">
                <motion.div
                    style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                    className="w-full bg-gradient-to-b from-transparent via-[#FF1493] to-transparent shadow-[0_0_15px_#FF1493]"
                />
            </div>

            <div className="container-custom relative z-10">
                {/* Header Section with Decoded Text */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        style={{
                            opacity: headerOpacity,
                            y: headerY,
                            filter: useTransform(headerBlur, (v) => `blur(${v}px)`),
                            willChange: "opacity, transform, filter"
                        }}
                        className="transform-gpu"
                    >
                        <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl min-h-[1.2em]">
                            {/* 3. Kinetic Decoded Typography */}
                            <DecodedHeader text={upcomingEvent ? 'Upcoming Event' : 'Featured Event'} />
                        </h2>
                        <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed">
                            {upcomingEvent
                                ? 'Join us for our next transformative experience'
                                : 'Explore our most recent event'}
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <EventCard event={featuredEvent} variant="featured" />
                </div>

                {/* 2. Holographic "Prism" Glass Card & 5. Magnetic Button */}
                <div className="text-center mt-20 flex justify-center">
                    <SpotlightCard className="p-1 max-w-2xl w-full" spotlightColor="rgba(255, 20, 147, 0.2)">
                        <div className="relative flex flex-col items-center gap-5 p-10 bg-midnight-purple/50">
                            <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                                Apply to Participate in a Future Event
                            </h3>
                            <p className="text-white/70 max-w-lg text-lg leading-relaxed">
                                Whether you're a brand, speaker, or attendee—we'd love to have you join us.
                            </p>
                            <div className="mt-4">
                                <MagneticButton
                                    variant="coral"
                                    href={externalLinks.eventApplication}
                                    external
                                    size="lg"
                                    strength={0.3}
                                    className="shadow-[0_0_20px_rgba(255,127,80,0.3)] hover:shadow-[0_0_30px_rgba(255,127,80,0.5)]"
                                >
                                    Apply Now
                                </MagneticButton>
                            </div>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
}
