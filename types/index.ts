// Event types
export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  venue?: string;
  status: 'upcoming' | 'past' | 'cancelled';
  description: string;
  shortDescription?: string;
  heroImage: string;
  heroVideo?: string;
  ticketUrl?: string;
  schedulePdf?: string;
  gallery?: string[];
  speakerIds?: string[]; // IDs of speakers for this event
  eventType: 'summit' | 'conference' | 'forum' | 'vip';
}

// Speaker types
export interface Speaker {
  id: string;
  slug: string;
  name: string;
  role: string;
  organization?: string;
  headshot: string;
  shortBio: string;
  fullBio?: string;
  linkedIn?: string;
  website?: string;
  isFeatured: boolean;
  expertise: Expertise[];
}

export type Expertise = 'Medical' | 'Research' | 'Investment' | 'Wellness' | 'Fitness';

// Brand partner types
export interface Brand {
  id: string;
  name: string;
  logo: string;
  url: string;
  description?: string;
  isActive: boolean;
}

// Team member types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedIn?: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: InquiryType;
  message: string;
}

export type InquiryType = 
  | 'general'
  | 'brand-partnership'
  | 'speaking'
  | 'investment'
  | 'media'
  | 'attend-event';

// Newsletter types
export interface NewsletterFormData {
  email: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Differentiator card types
export interface Differentiator {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// SEO Metadata types
export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
}
