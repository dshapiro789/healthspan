'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { navItems, socialLinks, companyInfo, externalLinks } from '@/lib/data';

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-midnight-purple border-t border-white/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-periwinkle/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coral/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10">
        {pathname !== '/' && (
          <div className="container-custom py-16 border-b border-white/5">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
                Stay Connected
              </h3>
              <p className="text-text-muted mb-8">
                Join our community and be the first to know about upcoming events, speaker announcements, and longevity insights.
              </p>

              {isSuccess ? (
                <div className="bg-periwinkle/10 border border-periwinkle/30 rounded-xl p-6 animate-fade-in">
                  <svg className="w-12 h-12 text-periwinkle mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white font-medium">Thanks for subscribing!</p>
                  <p className="text-text-muted text-sm mt-2">
                    Consider{' '}
                    <a href={externalLinks.collective} target="_blank" rel="noopener noreferrer" className="text-periwinkle hover:underline">
                      joining the Healthspan Collective
                    </a>{' '}
                    for exclusive benefits.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    error={error}
                    className="flex-1"
                  />
                  <Button type="submit" variant="primary" isLoading={isSubmitting} className="whitespace-nowrap">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}

        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-periwinkle/20 rounded-full" />
                    <svg viewBox="0 0 40 40" className="w-8 h-8 text-periwinkle" fill="currentColor">
                      <path d="M20 4C11.163 4 4 11.163 4 20s7.163 16 16 16 16-7.163 16-16S28.837 4 20 4zm0 28c-6.627 0-12-5.373-12-12S13.373 8 20 8s12 5.373 12 12-5.373 12-12 12z" />
                      <path d="M20 12c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 12c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
                      <circle cx="20" cy="20" r="2" />
                    </svg>
                  </div>
                  <span className="font-display text-xl font-semibold text-white">Healthspan</span>
                </div>
              </Link>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Collaborating with global leaders to produce groundbreaking media and events that advance the science and practice of longevity.
              </p>
              <div className="flex items-center gap-3">
                <a href={socialLinks.linkedIn} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#FF1493]/20 text-[#FF1493] hover:shadow-[0_0_15px_rgba(255,20,147,0.5)] transition-all duration-300" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#FF1493]/20 text-[#FF1493] hover:shadow-[0_0_15px_rgba(255,20,147,0.5)] transition-all duration-300" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#FF1493]/20 text-[#FF1493] hover:shadow-[0_0_15px_rgba(255,20,147,0.5)] transition-all duration-300" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-text-muted hover:text-periwinkle transition-colors duration-300">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-white mb-6">Past Events</h4>
              <ul className="space-y-3">
                <li><Link href="/events/2024-summit" className="text-text-muted hover:text-periwinkle transition-colors duration-300">2024 Healthspan Summit</Link></li>
                <li><Link href="/events/2023-summit" className="text-text-muted hover:text-periwinkle transition-colors duration-300">2023 Healthspan Summit</Link></li>
                <li><Link href="/events/leadership-conference" className="text-text-muted hover:text-periwinkle transition-colors duration-300">Leadership Conference</Link></li>
                <li><Link href="/events/heal-forum" className="text-text-muted hover:text-periwinkle transition-colors duration-300">H.E.A.L. Forum</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-white mb-6">Get In Touch</h4>
              <ul className="space-y-3">
                <li><a href={`mailto:${companyInfo.email}`} className="text-text-muted hover:text-periwinkle transition-colors duration-300">{companyInfo.email}</a></li>
                <li className="text-text-muted">{companyInfo.location}</li>
              </ul>
              <div className="mt-6">
                <a href={externalLinks.collective} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#FF1493] hover:text-[#ff69b4] transition-all duration-300 font-bold tracking-wide hover:drop-shadow-[0_0_8px_rgba(255,20,147,0.5)]">
                  Join The Collective
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">© {currentYear} {companyInfo.name}. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-text-muted hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-text-muted hover:text-white transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
