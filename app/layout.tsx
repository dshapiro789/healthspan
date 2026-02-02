import type { Metadata, Viewport } from 'next';
import { Header, Footer } from '@/components/layout';
import { Playfair_Display, Outfit, Cormorant_Garamond, DM_Serif_Display } from "next/font/google";
import './globals.css';

// Self-hosted fonts via next/font for optimal performance
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-hero",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'Healthspan Productions | Longevity Events & Media',
    template: '%s | Healthspan Productions',
  },
  description: 'Evidence-based longevity events for a society where 100 healthy years is the norm. Join world-class speakers and brands advancing the science of healthspan.',
  keywords: ['healthspan', 'longevity', 'anti-aging', 'wellness events', 'health summit', 'longevity conference'],
  authors: [{ name: 'Healthspan Productions' }],
  creator: 'Healthspan Productions',
  publisher: 'Healthspan Productions',
  metadataBase: new URL('https://healthspanevents.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://healthspanevents.com',
    siteName: 'Healthspan Productions',
    title: 'Healthspan Productions | Longevity Events & Media',
    description: 'Evidence-based longevity events for a society where 100 healthy years is the norm.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Healthspan Productions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthspan Productions | Longevity Events & Media',
    description: 'Evidence-based longevity events for a society where 100 healthy years is the norm.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#1a0f3e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfairDisplay.variable} ${outfit.variable} ${cormorantGaramond.variable} ${dmSerifDisplay.variable}`}>
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://static.wixstatic.com" />
        <link rel="preconnect" href="https://video.wixstatic.com" />
      </head>
      <body className="min-h-screen bg-midnight-purple text-text-light antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

