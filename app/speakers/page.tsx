import { Metadata } from 'next';
import { Hero } from '@/components/sections';
import { SpeakerCard } from '@/components/speakers';
import { LinkButton } from '@/components/ui';
import { speakers } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Speakers',
  description: 'Meet the world-class thought leaders in longevity, medicine, and wellness who speak at Healthspan Productions events.',
};

export default function SpeakersPage() {
  const featuredSpeakers = speakers.filter((s) => s.isFeatured);
  const otherSpeakers = speakers.filter((s) => !s.isFeatured);

  return (
    <>
      {/* Hero */}
      <Hero
        title="Speakers"
        description="Thought leaders in longevity, wellness, and healthspan science"
        fullHeight={false}
        overlayOpacity={70}
        showScrollIndicator={false}
      />

      {/* Featured Speakers */}
      <section className="section-padding bg-midnight-purple">
        <div className="container-custom">
          <h2 className="font-display text-section text-white mb-4">
            Featured <span className="text-gradient-coral">Speakers</span>
          </h2>
          <p className="text-text-muted text-lg mb-12 max-w-2xl">
            World-renowned experts who have graced our stages with their insights and expertise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </div>
      </section>

      {/* All Speakers */}
      {otherSpeakers.length > 0 && (
        <section className="section-padding bg-off-white">
          <div className="container-custom">
            <h2 className="font-display text-section text-text-primary mb-8">
              All <span className="text-gradient-periwinkle">Speakers</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {otherSpeakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Apply to Speak CTA */}
      <section className="py-20 bg-gradient-to-r from-periwinkle to-periwinkle-dark">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl text-white mb-4">
            Interested in Speaking?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            We're always looking for passionate experts to share their knowledge at our events.
          </p>
          <LinkButton
            variant="coral"
            size="lg"
            href="/contact"
          >
            Apply to Speak
          </LinkButton>
        </div>
      </section>
    </>
  );
}
