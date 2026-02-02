import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections';
import { Skeleton } from '@/components/ui';
import { events, externalLinks } from '@/lib/data';

// Dynamically import below-fold sections for faster initial load
const Differentiators = dynamic(
  () => import('@/components/sections/Differentiators').then((mod) => mod.Differentiators),
  {
    loading: () => <SectionSkeleton height="600px" />,
    ssr: true,
  }
);

const UpcomingEvents = dynamic(
  () => import('@/components/sections/UpcomingEvents').then((mod) => mod.UpcomingEvents),
  {
    loading: () => <SectionSkeleton height="500px" />,
    ssr: true,
  }
);

const BrandCarousel = dynamic(
  () => import('@/components/sections/BrandCarousel').then((mod) => mod.BrandCarousel),
  {
    loading: () => <SectionSkeleton height="200px" />,
    ssr: true,
  }
);

const SpeakerGrid = dynamic(
  () => import('@/components/sections/SpeakerGrid').then((mod) => mod.SpeakerGrid),
  {
    loading: () => <SectionSkeleton height="600px" />,
    ssr: true,
  }
);

const Vision = dynamic(
  () => import('@/components/sections/Vision').then((mod) => mod.Vision),
  {
    loading: () => <SectionSkeleton height="400px" />,
    ssr: true,
  }
);

const NewsletterCTA = dynamic(
  () => import('@/components/sections/NewsletterCTA').then((mod) => mod.NewsletterCTA),
  {
    loading: () => <SectionSkeleton height="300px" />,
    ssr: true,
  }
);

// Minimal loading skeleton for sections
function SectionSkeleton({ height }: { height: string }) {
  return (
    <div
      className="w-full bg-midnight-purple/50 flex items-center justify-center"
      style={{ height }}
    >
      <div className="w-12 h-12 rounded-full border-2 border-periwinkle/30 border-t-periwinkle animate-spin" />
    </div>
  );
}

export default function HomePage() {
  // Get the most recent/upcoming event for the featured section
  const upcomingEvent = events.find((e) => e.status === 'upcoming');
  const featuredEvent = upcomingEvent || events[0];

  return (
    <>
      {/* Hero Section - Eagerly loaded for fast LCP */}
      <Hero
        subtitle="Welcome to Healthspan Collective"
        title={
          <>
            Extend Your{' '}
            <span className="text-gradient-periwinkle">Healthspan</span>
          </>
        }
        description="Evidence-based longevity events for a society where 100 healthy years is the norm, not the exception."
        primaryCta={{
          label: 'Upcoming Events',
          href: '/events',
        }}
        secondaryCta={{
          label: 'Join The Collective',
          href: externalLinks.collective,
          external: true,
        }}
        backgroundVideo="https://video.wixstatic.com/video/ea4357_c76c4877ca8948678980cd035b10679e/1080p/mp4/file.mp4"
        overlayOpacity={65}
        fullHeight={true}
        alignment="center"
        showScrollIndicator={true}
      />

      {/* Differentiators Section */}
      <Differentiators />

      {/* Featured/Upcoming Event Section */}
      <UpcomingEvents
        featuredEvent={featuredEvent}
        upcomingEvent={upcomingEvent}
      />

      {/* Brand Carousel */}
      <BrandCarousel />

      {/* Speakers Grid */}
      <SpeakerGrid limit={8} featured={true} showViewAll={true} />

      {/* Vision Statement */}
      <Vision />

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}

