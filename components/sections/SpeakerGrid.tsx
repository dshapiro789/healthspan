'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui';
import { speakers } from '@/lib/data';
import type { Speaker } from '@/types';

interface SpeakerGridProps {
  limit?: number;
  showTitle?: boolean;
  featured?: boolean;
  showViewAll?: boolean;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function SpeakerGrid({
  limit,
  showTitle = true,
  featured = true,
  showViewAll = true,
}: SpeakerGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Filter and limit speakers
  let displaySpeakers = featured
    ? speakers.filter((s) => s.isFeatured)
    : speakers;

  if (limit) {
    displaySpeakers = displaySpeakers.slice(0, limit);
  }

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-off-white relative overflow-hidden content-visibility-auto"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#0D1B2A" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        {showTitle && (
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <motion.h2
              className="font-display text-section text-text-primary mb-4"
              variants={headerVariants}
            >
              Previous Speakers{' '}
              <span className="text-gradient-teal">Include</span>
            </motion.h2>
            <motion.p
              className="text-text-secondary text-lg"
              variants={headerVariants}
            >
              World-class thought leaders in longevity, medicine, and wellness
            </motion.p>
          </motion.div>
        )}

        {/* Speaker grid with staggered animations */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {displaySpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </motion.div>

        {/* View All CTA */}
        {showViewAll && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Link
              href="/speakers"
              className="inline-flex items-center gap-2 text-periwinkle hover:text-periwinkle-dark font-medium transition-colors duration-300"
            >
              View All Speakers
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Speaker Card Component with Framer Motion
interface SpeakerCardProps {
  speaker: Speaker;
}

function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <motion.div variants={cardVariants}>
      <Card
        variant="default"
        hover={true}
        className="bg-white group overflow-hidden"
      >
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Placeholder with initials - would be replaced with actual image */}
          <div className="absolute inset-0 bg-gradient-to-br from-periwinkle/20 to-periwinkle-dark/20 flex items-center justify-center">
            <span className="text-4xl font-display font-semibold text-periwinkle/40">
              {speaker.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-purple/90 via-midnight-purple/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
            <div>
              {speaker.linkedIn && (
                <a
                  href={speaker.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white text-sm hover:text-periwinkle transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-periwinkle transition-colors duration-300 line-clamp-1">
            {speaker.name}
          </h3>
          <p className="text-text-secondary text-sm line-clamp-1">
            {speaker.role}
            {speaker.organization && `, ${speaker.organization}`}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
