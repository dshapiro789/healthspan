import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@/components/sections';
import { SpeakerCard } from '@/components/speakers';
import { LinkButton } from '@/components/ui';
import { events } from '@/lib/data';
import { formatDateRange } from '@/lib/utils';
import { getSpeakersByIds } from '@/lib/helpers';

interface EventPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = events.find((e) => e.slug === params.slug);
  if (!event) return { title: 'Event Not Found' };

  return {
    title: event.title,
    description: event.shortDescription || event.description,
  };
}

export default function EventPage({ params }: EventPageProps) {
  const event = events.find((e) => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  const isUpcoming = event.status === 'upcoming';
  const eventSpeakers = event.speakerIds ? getSpeakersByIds(event.speakerIds) : [];

  return (
    <>
      {/* Hero */}
      <Hero
        subtitle={formatDateRange(event.date, event.endDate)}
        title={event.title}
        description={event.location + (event.venue ? ` • ${event.venue}` : '')}
        primaryCta={
          isUpcoming && event.ticketUrl
            ? { label: 'Get Tickets', href: event.ticketUrl, external: true }
            : undefined
        }
        fullHeight={false}
        overlayOpacity={70}
        showScrollIndicator={false}
      />

      {/* Event Details */}
      <section className="section-padding bg-midnight-purple">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl text-white mb-6">About This Event</h2>
            <p className="text-text-light leading-relaxed text-lg">
              {event.description}
            </p>

            {/* Event info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-royal-purple rounded-xl p-6 border border-white/5">
                <div className="text-periwinkle mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-medium mb-1">Date</h3>
                <p className="text-text-muted text-sm">{formatDateRange(event.date, event.endDate)}</p>
              </div>
              <div className="bg-royal-purple rounded-xl p-6 border border-white/5">
                <div className="text-periwinkle mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-medium mb-1">Location</h3>
                <p className="text-text-muted text-sm">{event.location}</p>
              </div>
              <div className="bg-royal-purple rounded-xl p-6 border border-white/5">
                <div className="text-periwinkle mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-white font-medium mb-1">Venue</h3>
                <p className="text-text-muted text-sm">{event.venue || 'TBA'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="section-padding bg-off-white">
        <div className="container-custom">
          <h2 className="font-display text-section text-text-primary mb-8">
            Featured <span className="text-gradient-periwinkle">Speakers</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {eventSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/speakers"
              className="text-periwinkle hover:text-periwinkle-dark font-medium inline-flex items-center gap-2"
            >
              View All Speakers
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {event.gallery && event.gallery.length > 0 && (
        <section className="section-padding bg-midnight-purple">
          <div className="container-custom">
            <h2 className="font-display text-section text-white mb-8">
              Photo <span className="text-gradient-coral">Gallery</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.gallery.map((imageSrc, index) => (
                <div
                  key={index}
                  className="aspect-square bg-royal-purple rounded-lg overflow-hidden relative group"
                >
                  <Image
                    src={imageSrc}
                    alt={`${event.title} gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-periwinkle to-periwinkle-dark">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl text-white mb-4">
            {isUpcoming ? 'Ready to Join Us?' : "Don't Miss Our Next Event"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {isUpcoming
              ? 'Secure your spot for this transformative experience.'
              : 'Subscribe to be notified about upcoming events and early-bird tickets.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {isUpcoming && event.ticketUrl ? (
              <LinkButton
                variant="coral"
                size="lg"
                href={event.ticketUrl}
                external
              >
                Get Tickets
              </LinkButton>
            ) : (
              <LinkButton variant="coral" size="lg" href="/contact">
                Contact Us
              </LinkButton>
            )}
            <LinkButton
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              href="/events"
            >
              View All Events
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
