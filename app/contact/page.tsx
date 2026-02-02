'use client';

import { useState } from 'react';
import { Hero } from '@/components/sections';
import { Button, Input, Textarea, Select, Card, CardContent } from '@/components/ui';
import { companyInfo, socialLinks, externalLinks } from '@/lib/data';

const inquiryOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'brand-partnership', label: 'Brand Partnership' },
  { value: 'speaking', label: 'Speaking Opportunity' },
  { value: 'investment', label: 'Investment' },
  { value: 'media', label: 'Media / Press' },
  { value: 'attend-event', label: 'Attend an Event' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setIsSuccess(true);
      setFormData({ name: '', email: '', inquiryType: 'general', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <Hero
        title="Connect With Us"
        description="Whether you're a brand, speaker, investor, or attendee—we'd love to hear from you."
        fullHeight={false}
        overlayOpacity={70}
        showScrollIndicator={false}
      />

      {/* Contact Section */}
      <section className="section-padding bg-midnight-purple">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl text-white mb-6">
                Send Us a Message
              </h2>

              {isSuccess ? (
                <Card variant="glass" className="p-8 text-center">
                  <svg className="w-16 h-16 text-periwinkle mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-display text-xl text-white mb-2">Message Sent!</h3>
                  <p className="text-text-muted mb-6">
                    Thank you for reaching out. We'll get back to you within 24-48 hours.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => setIsSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />

                  <Select
                    label="Inquiry Type"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    options={inquiryOptions}
                  />

                  <Textarea
                    label="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                  />

                  {error && (
                    <p className="text-red-400 text-sm bg-red-400/10 rounded-lg p-3">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl text-white mb-6">
                Other Ways to Connect
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <Card variant="glass" className="p-6">
                  <CardContent className="p-0 flex items-start gap-4">
                    <div className="w-12 h-12 bg-periwinkle/10 rounded-xl flex items-center justify-center text-periwinkle flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Email</h3>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-periwinkle hover:text-periwinkle-light transition-colors"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Location */}
                <Card variant="glass" className="p-6">
                  <CardContent className="p-0 flex items-start gap-4">
                    <div className="w-12 h-12 bg-periwinkle/10 rounded-xl flex items-center justify-center text-periwinkle flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Location</h3>
                      <p className="text-text-muted">{companyInfo.location}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card variant="glass" className="p-6">
                  <CardContent className="p-0">
                    <h3 className="text-white font-medium mb-4">Follow Us</h3>
                    <div className="flex items-center gap-3">
                      <a
                        href={socialLinks.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-periwinkle/20 text-text-muted hover:text-periwinkle transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-periwinkle/20 text-text-muted hover:text-periwinkle transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                      </a>
                      <a
                        href={socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-periwinkle/20 text-text-muted hover:text-periwinkle transition-all duration-300"
                        aria-label="YouTube"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Join Collective CTA */}
                <Card variant="bordered" glow={true} className="p-6 bg-periwinkle/5">
                  <CardContent className="p-0 text-center">
                    <h3 className="font-display text-xl text-white mb-2">
                      Join The Collective
                    </h3>
                    <p className="text-text-muted text-sm mb-4">
                      Become a founding member and get exclusive access to events, content, and community.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => window.open(externalLinks.collective, '_blank')}
                    >
                      Join Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
