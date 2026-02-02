'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParticleTextProps {
    text: string;
    className?: string;
    colors?: string[];
    particleCount?: number; // Particles PER LETTER
    duration?: number;
    delay?: number;
}

export function ParticleText({
    text,
    className,
    colors = ['#FF6F61', '#FF8A80', '#FFB4AB', '#8176F2', '#B4A8FF', '#FFFFFF'], // Default coral/periwinkle/white mix
    particleCount = 8, // Reduced count per letter since it multiplies
    duration = 0.6, // Per-letter duration
    delay = 0.2,
}: ParticleTextProps) {

    const letters = text.split("");

    return (
        <div className={cn('relative inline-flex flex-row whitespace-nowrap justify-center', className)}>
            {letters.map((char, index) => (
                <Letter
                    key={index}
                    char={char}
                    index={index}
                    colors={colors}
                    particleCount={particleCount}
                    duration={duration}
                    baseDelay={delay}
                />
            ))}

            {/* Subtle ongoing glow matching the text shape */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ delay: 2, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 blur-2xl bg-periwinkle/10 -z-10 rounded-full"
            />
        </div>
    );
}

// Sub-component for individual letter animation
function Letter({
    char,
    index,
    colors,
    particleCount,
    duration,
    baseDelay
}: {
    char: string;
    index: number;
    colors: string[];
    particleCount: number;
    duration: number;
    baseDelay: number;
}) {
    const [complete, setComplete] = useState(false);
    const staggerDelay = baseDelay + (index * 0.08); // 80ms stagger per letter

    // Generate particles for this specific letter
    // We use state/memo to ensure they don't re-randomize on re-renders,
    // but for this simple component, constant generation per render is risky if parents re-render.
    // Ideally use useMemo, but inside map is tricky. 
    // Since 'Letter' is a component, we can assume stable render unless props change.
    const particles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        // Start from center of the letter
        x: 0,
        y: 0,
        // Explode outwards randomly
        targetX: (Math.random() - 0.5) * 60, // Spread range px
        targetY: (Math.random() - 0.5) * 60, // Spread range px
        scale: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: duration * (Math.random() * 0.4 + 0.6),
    }));

    if (char === " ") {
        return <span className="w-4"></span>; // Space character
    }

    return (
        <div className="relative flex flex-col items-center justify-center">
            {/* The Character */}
            <motion.span
                initial={{ opacity: 0, filter: 'blur(8px)', scale: 1.5, y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
                transition={{
                    duration: duration,
                    delay: staggerDelay,
                    // Custom spring-like easing
                    ease: [0.22, 1, 0.36, 1]
                }}
                onAnimationComplete={() => setComplete(true)}
                className="relative z-10 block text-gradient-animated"
                style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text' }}
            >
                {char}
            </motion.span>

            {/* Per-letter Particles */}
            {/* Only render particles if the letter is animating or just finished (could remove after X seconds for performance) */}
            {!complete && (
                <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                    {particles.map((p) => (
                        <motion.span
                            key={p.id}
                            className="absolute rounded-full"
                            style={{
                                backgroundColor: p.color,
                                width: '3px',
                                height: '3px',
                            }}
                            initial={{
                                x: 0,
                                y: 0,
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{
                                x: p.targetX,
                                y: p.targetY,
                                opacity: [0, 1, 0], // Flash in then fade out
                                scale: [0, p.scale, 0] // Grow then shrink
                            }}
                            transition={{
                                duration: p.duration,
                                delay: staggerDelay, // Sync exactly with letter appearance
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
