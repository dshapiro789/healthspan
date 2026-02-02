'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button, Input } from '@/components/ui';
import { companyInfo } from '@/lib/data';

export function NewsletterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gradient-to-r from-periwinkle to-periwinkle-dark"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-lg rotate-45" />
        
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="newsletter-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#newsletter-grid)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div
            className={cn(
              'w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center',
              isVisible && 'animate-scale-in'
            )}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>

          {/* Title */}
          <h2
            className={cn(
              'font-display text-3xl md:text-4xl font-semibold text-white mb-4',
              isVisible && 'animate-fade-in-up'
            )}
            style={{ animationDelay: '0.1s' }}
          >
            Stay Connected
          </h2>

          {/* Description */}
          <p
            className={cn(
              'text-white/80 text-lg mb-8',
              isVisible && 'animate-fade-in-up'
            )}
            style={{ animationDelay: '0.2s' }}
          >
            Get the latest updates on events, speakers, and longevity insights delivered to your inbox.
          </p>

          {/* Form */}
          {isSuccess ? (
            <div
              className={cn(
                'bg-white/10 border border-white/20 rounded-xl p-6',
                isVisible && 'animate-scale-in'
              )}
            >
              <svg className="w-12 h-12 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white font-medium">You're subscribed!</p>
              <p className="text-white/70 text-sm mt-2">
                Check your inbox for a confirmation email.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={cn(
                'flex flex-col sm:flex-row gap-3 max-w-md mx-auto',
                isVisible && 'animate-fade-in-up'
              )}
              style={{ animationDelay: '0.3s' }}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
              />
              <Button
                type="submit"
                variant="coral"
                isLoading={isSubmitting}
                className="whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
          )}

          {error && (
            <p className="text-white/90 text-sm mt-3 bg-red-500/20 rounded-lg py-2 px-4 inline-block">
              {error}
            </p>
          )}

          {/* Privacy note */}
          <p
            className={cn(
              'text-white/50 text-xs mt-6',
              isVisible && 'animate-fade-in'
            )}
            style={{ animationDelay: '0.4s' }}
          >
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
