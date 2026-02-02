import { Metadata } from 'next';
import { Hero } from '@/components/sections';
import { EventCard } from '@/components/events';
import { LinkButton } from '@/components/ui';
import { events, externalLinks } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Explore Healthspan Productions events - past summits, conferences, and forums bringing together leaders in longevity science.',
};

export default function EventsPage() {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pastEvents = events.filter((e) => e.status === 'past');

  return (
    <>
      {/* Hero */}
      <Hero
        title="Events"
        description="Experience the future of longevity through our immersive summits, conferences, and forums."
        fullHeight={false}
        overlayOpacity={70}
        showScrollIndicator={false}
      />

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="section-padding bg-midnight-purple">
          <div className="container-custom">
            <h2 className="font-display text-section text-white mb-8">
              Upcoming <span className="text-gradient-periwinkle">Events</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subscribe CTA */}
      <section className="py-16 bg-royal-purple">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl text-white mb-4">
              Don't Miss Our Next Event
            </h3>
            <p className="text-text-muted mb-6">
              Subscribe to be notified when we announce new events and early-bird tickets.
            </p>
            <LinkButton
              variant="primary"
              href={externalLinks.eventApplication}
              external
            >
              Join the Waitlist
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section-padding bg-off-white">
        <div className="container-custom">
          <h2 className="font-display text-section text-text-primary mb-4">
            Past <span className="text-gradient-periwinkle">Events</span>
          </h2>
          <p className="text-text-secondary text-lg mb-12 max-w-2xl">
            Explore recaps from our previous summits and conferences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
