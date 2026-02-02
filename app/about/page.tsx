import { Metadata } from 'next';
import Image from 'next/image';
import { Hero, Vision } from '@/components/sections';
import { Card, CardContent, LinkButton } from '@/components/ui';
import { teamMembers, companyInfo, socialLinks } from '@/lib/data';
import { getInitials } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Healthspan Productions - our mission, vision, and the team behind the leading longevity events.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        subtitle="Our Story"
        title="About Healthspan Productions"
        description="Collaborating with global leaders to produce groundbreaking media and events that advance the science and practice of longevity."
        fullHeight={false}
        overlayOpacity={70}
        showScrollIndicator={false}
      />

      {/* Mission Section */}
      <section className="section-padding bg-midnight-purple">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-section text-white mb-6">
                  Our <span className="text-gradient-periwinkle">Mission</span>
                </h2>
                <p className="text-text-light text-lg leading-relaxed mb-6">
                  {companyInfo.mission}
                </p>
                <p className="text-text-muted leading-relaxed">
                  Founded in {companyInfo.founded}, Healthspan Productions emerged from a simple but powerful idea: that the longevity revolution should be accessible to everyone, not just the scientific elite.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-periwinkle/20 to-periwinkle-dark/30 rounded-2xl flex items-center justify-center">
                  <svg className="w-32 h-32 text-periwinkle/30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-coral/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-periwinkle/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Quote */}
      <Vision />

      {/* Our Story Timeline */}
      <section className="section-padding bg-off-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-section text-text-primary mb-12 text-center">
              Our <span className="text-gradient-periwinkle">Journey</span>
            </h2>
            
            <div className="space-y-8">
              {/* Timeline items */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-periwinkle rounded-full flex items-center justify-center text-white font-bold">
                    '23
                  </div>
                  <div className="w-px h-full bg-periwinkle/20 mt-4" />
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-xl text-text-primary font-semibold mb-2">
                    January 2023 - The Beginning
                  </h3>
                  <p className="text-text-secondary">
                    Healthspan Productions was founded with the H.E.A.L. Forum, our first event bringing together pioneers in longevity science.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-periwinkle rounded-full flex items-center justify-center text-white font-bold">
                    '23
                  </div>
                  <div className="w-px h-full bg-periwinkle/20 mt-4" />
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-xl text-text-primary font-semibold mb-2">
                    October 2023 - First Summit
                  </h3>
                  <p className="text-text-secondary">
                    Our inaugural Healthspan Summit in Malibu established the blueprint for immersive, nature-embedded longevity experiences.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-periwinkle rounded-full flex items-center justify-center text-white font-bold">
                    '24
                  </div>
                  <div className="w-px h-full bg-periwinkle/20 mt-4" />
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-xl text-text-primary font-semibold mb-2">
                    2024 - Scaling Impact
                  </h3>
                  <p className="text-text-secondary">
                    The 2024 Summit expanded our reach, featuring world-renowned speakers like Bryan Johnson and Dr. Mindy Pelz.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center text-midnight-purple font-bold">
                    '25
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-text-primary font-semibold mb-2">
                    2025 - The Future
                  </h3>
                  <p className="text-text-secondary">
                    Launching the Healthspan Collective and expanding our ecosystem of brands, speakers, and transformative experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-midnight-purple">
        <div className="container-custom">
          <h2 className="font-display text-section text-white mb-4 text-center">
            Leadership <span className="text-gradient-coral">Team</span>
          </h2>
          <p className="text-text-muted text-lg mb-12 text-center max-w-2xl mx-auto">
            Meet the passionate individuals behind Healthspan Productions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.id} variant="glass" hover={true} className="text-center">
                <CardContent className="p-8">
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-periwinkle/30 to-periwinkle-dark/30 relative">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl font-display font-semibold text-periwinkle/60">
                          {getInitials(member.name)}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-display text-xl text-white font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-periwinkle text-sm mb-4">{member.role}</p>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-text-muted hover:text-periwinkle transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Connect
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-royal-purple">
        <div className="container-custom text-center">
          <h2 className="font-display text-section text-white mb-4">
            Partners & <span className="text-gradient-periwinkle">Collaborators</span>
          </h2>
          <p className="text-text-muted text-lg mb-12 max-w-2xl mx-auto">
            We're proud to work with leading organizations in the longevity space.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="px-8 py-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-text-light font-medium">Mission Matters Media</span>
            </div>
            <div className="px-8 py-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-text-light font-medium">PRUVN Research</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-periwinkle to-periwinkle-dark">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Whether you're a brand, speaker, investor, or someone passionate about longevity—we'd love to connect.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <LinkButton
              variant="coral"
              size="lg"
              href="/contact"
            >
              Get in Touch
            </LinkButton>
            <LinkButton
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              href="/events"
            >
              View Events
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
