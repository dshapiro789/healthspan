'use client';

import { useState } from 'react';
import { cn, getInitials } from '@/lib/utils';
import { Card, Modal, ModalHeader, ModalBody, Button } from '@/components/ui';
import type { Speaker } from '@/types';

interface SpeakerCardProps {
  speaker: Speaker;
  showModal?: boolean;
  className?: string;
}

export function SpeakerCard({ speaker, showModal = true, className }: SpeakerCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        variant="default"
        hover={true}
        className={cn('bg-royal-purple group overflow-hidden cursor-pointer', className)}
        onClick={() => showModal && setIsModalOpen(true)}
      >
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Placeholder with initials */}
          <div className="absolute inset-0 bg-gradient-to-br from-periwinkle/20 to-periwinkle-dark/30 flex items-center justify-center">
            <span className="text-5xl font-display font-semibold text-periwinkle/40">
              {getInitials(speaker.name)}
            </span>
          </div>
          
          {/* Featured badge */}
          {speaker.isFeatured && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-coral/90 text-midnight-purple text-xs font-medium rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-purple via-midnight-purple/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
            <p className="text-white/90 text-sm line-clamp-3">
              {speaker.shortBio}
            </p>
            
            <div className="flex items-center gap-3 mt-3">
              {speaker.linkedIn && (
                <a
                  href={speaker.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-periwinkle transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${speaker.name} on LinkedIn`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {speaker.website && (
                <a
                  href={speaker.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-periwinkle transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${speaker.name}'s website`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-xl font-semibold text-white group-hover:text-periwinkle transition-colors duration-300">
            {speaker.name}
          </h3>
          <p className="text-text-muted text-sm mt-1">
            {speaker.role}
          </p>
          {speaker.organization && (
            <p className="text-periwinkle/70 text-sm">
              {speaker.organization}
            </p>
          )}

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {speaker.expertise.slice(0, 2).map((exp) => (
              <span
                key={exp}
                className="px-2 py-0.5 bg-white/5 text-text-muted text-xs rounded-full"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Speaker Detail Modal */}
      {showModal && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="lg"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image column */}
            <div className="md:w-1/3 bg-gradient-to-br from-periwinkle/20 to-periwinkle-dark/30">
              <div className="aspect-square flex items-center justify-center p-8">
                <span className="text-8xl font-display font-semibold text-periwinkle/40">
                  {getInitials(speaker.name)}
                </span>
              </div>
            </div>

            {/* Content column */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-white">
                    {speaker.name}
                  </h2>
                  <p className="text-periwinkle mt-1">
                    {speaker.role}
                    {speaker.organization && `, ${speaker.organization}`}
                  </p>
                </div>
              </div>

              {/* Expertise tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {speaker.expertise.map((exp) => (
                  <span
                    key={exp}
                    className="px-3 py-1 bg-periwinkle/10 text-periwinkle text-sm rounded-full"
                  >
                    {exp}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-text-light leading-relaxed mb-6">
                {speaker.fullBio || speaker.shortBio}
              </p>

              {/* Links */}
              <div className="flex items-center gap-4">
                {speaker.linkedIn && (
                  <a
                    href={speaker.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-text-muted hover:text-periwinkle transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
                {speaker.website && (
                  <a
                    href={speaker.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-text-muted hover:text-periwinkle transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
