'use client';

import Link from 'next/link';
import { cn, formatDateRange } from '@/lib/utils';
import { Button, SpotlightCard, MagneticButton } from '@/components/ui';
import type { Event } from '@/types';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'featured';
  className?: string;
}

export function EventCard({ event, variant = 'default', className }: EventCardProps) {
  const isFeatured = variant === 'featured';
  const isUpcoming = event.status === 'upcoming';

  return (
    <SpotlightCard
      className={cn('h-full group', className)}
      spotlightColor="rgba(107, 92, 231, 0.2)"
    >
      <div className="flex flex-col h-full bg-midnight-purple/30">
        {/* Image Section */}
        <div className={cn(
          'relative overflow-hidden',
          isFeatured ? 'aspect-[21/9]' : 'aspect-video'
        )}>
          {/* Placeholder gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-royal-purple via-midnight-purple to-[#FF1493]/20 transition-transform duration-700 group-hover:scale-105" />

          {/* Hero Image */}
          {event.heroImage && (
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
              <img
                src={event.heroImage}
                alt={event.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          )}

          {/* Event type badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest bg-black/40 backdrop-blur-md border border-white/10 text-white',
              isUpcoming && 'border-coral/50 text-coral-light'
            )}>
              {isUpcoming ? 'Upcoming' : event.eventType}
            </span>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-purple via-transparent to-transparent opacity-80" />

          {/* Play Button Overlay (if video) */}
          {event.heroVideo && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={cn('relative flex-1 flex flex-col', isFeatured ? 'p-8 md:p-10' : 'p-6 md:p-8')}>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm mb-4 font-body tracking-wide text-periwinkle-light/80">
            <div className="flex items-center gap-2 group/date relative">
              <span className="p-1.5 rounded-full bg-white/5 group-hover:bg-periwinkle/20 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <span className="group-hover:text-periwinkle transition-colors">{formatDateRange(event.date, event.endDate)}</span>

              {/* Holographic Date Tooltip (Simple Glow for now) */}
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-periwinkle opacity-0 group-hover/date:opacity-100 shadow-[0_0_10px_#6b5ce7] transition-opacity" />
            </div>

            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-full bg-white/5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span>{event.location}</span>
            </div>
          </div>

          {/* Title - Upgraded Typography with smooth hover */}
          <h3 className={cn(
            'font-display font-medium mb-3 pb-1 relative',
            isFeatured ? 'text-3xl md:text-5xl leading-[1.15] tracking-tight' : 'text-2xl leading-tight'
          )}
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {/* Base white text - always visible */}
            <span className="text-white">{event.title}</span>
            {/* Gradient overlay - fades in on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-white to-periwinkle-light bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ WebkitBackgroundClip: 'text' }}
            >
              {event.title}
            </span>
          </h3>

          {/* Description */}
          {(isFeatured || event.shortDescription) && (
            <p className="text-text-light/60 mb-8 line-clamp-2 md:line-clamp-3 text-lg font-light leading-relaxed">
              {event.shortDescription || event.description}
            </p>
          )}

          {/* Spacer to push Actions to bottom */}
          <div className="mt-auto pt-4 flex items-center gap-4">
            {isUpcoming && event.ticketUrl ? (
              <>
                <MagneticButton
                  variant="hot-pink"
                  href={event.ticketUrl}
                  external
                  size={isFeatured ? 'md' : 'sm'}
                  strength={0.2}
                  className="shadow-[0_0_20px_rgba(255,20,147,0.3)] hover:shadow-[0_0_30px_rgba(255,20,147,0.5)] border-none"
                >
                  Get Tickets
                </MagneticButton>

                <Link
                  href={`/events/${event.slug}`}
                  className="group/link flex items-center gap-2 text-sm text-text-light/80 hover:text-white transition-colors px-2 py-1"
                >
                  <span className="relative">
                    Learn More
                    <span className="absolute -bottom-px left-0 right-0 h-px bg-white transform scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
                  </span>
                </Link>
              </>
            ) : (
              <MagneticButton
                href={`/events/${event.slug}`}
                variant="outline"
                size="sm"
                className="hover:border-periwinkle hover:text-periwinkle"
              >
                View Recap
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
