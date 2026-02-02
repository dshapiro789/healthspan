# Healthspan Productions Website

A modern, cinematic website for Healthspan Productions built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎨 Design Philosophy

This site is inspired by the Storyville RD aesthetic featuring:
- Dark, cinematic color palette (Deep Navy #0D1B2A, Healthspan Teal #00A896)
- Full-bleed hero sections with video backgrounds
- Smooth scroll animations and hover effects
- High contrast between dark sections and light content
- Elegant typography using Cormorant Garamond (display) and Outfit (body)

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion (optional, CSS animations included)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend (API routes ready)
- **Hosting**: Vercel (recommended)

## 📁 Project Structure

```
healthspan-web/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage
│   ├── events/
│   │   ├── page.tsx        # Events listing
│   │   └── [slug]/page.tsx # Dynamic event pages
│   ├── speakers/
│   │   └── page.tsx        # Speakers grid
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── contact/
│   │   └── page.tsx        # Contact form
│   ├── api/
│   │   ├── contact/route.ts    # Contact form handler
│   │   └── newsletter/route.ts # Newsletter signup
│   └── globals.css         # Global styles & Tailwind
├── components/
│   ├── layout/             # Header, Footer
│   ├── ui/                 # Button, Card, Input, Modal
│   ├── sections/           # Hero, Differentiators, etc.
│   ├── events/             # EventCard
│   └── speakers/           # SpeakerCard
├── lib/
│   ├── data.ts             # Site content & configuration
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript interfaces
└── public/
    ├── images/             # Images (to be added)
    ├── videos/             # Video backgrounds (to be added)
    └── fonts/              # Custom fonts (optional)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** (create `.env.local`):
   ```env
   # Resend API Key (for contact forms)
   RESEND_API_KEY=your_api_key_here
   RESEND_AUDIENCE_ID=your_audience_id_here
   
   # Site URL (for OG images)
   NEXT_PUBLIC_SITE_URL=https://healthspanevents.com
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

## 📝 Content Management

All site content is managed in `lib/data.ts`:

- **navItems**: Navigation menu structure
- **differentiators**: "Why we're different" cards
- **speakers**: Speaker profiles and bios
- **brands**: Partner brand logos and links
- **events**: Event details (past and upcoming)
- **teamMembers**: Leadership team profiles
- **companyInfo**: Company details and mission

To update content, simply edit the relevant arrays/objects in this file.

## 🎨 Customizing the Design

### Colors

Edit `tailwind.config.ts` to update the color palette:

```typescript
colors: {
  'deep-navy': '#0D1B2A',
  'healthspan-teal': '#00A896',
  'gold': '#F0A500',
  // ... add more
}
```

### Typography

The site uses Google Fonts loaded in `globals.css`:
- **Display**: Cormorant Garamond (elegant, serif)
- **Body**: Outfit (clean, modern sans-serif)

To change fonts, update the import URL and CSS variables.

### Animations

CSS animations are defined in `tailwind.config.ts` under `animation` and `keyframes`. Add or modify as needed.

## 🔧 API Integration

### Contact Form

The contact form submits to `/api/contact`. To enable email delivery:

1. Sign up for [Resend](https://resend.com)
2. Get your API key
3. Uncomment the Resend code in `app/api/contact/route.ts`

### Newsletter

Newsletter signup uses `/api/newsletter`. Configure similarly with Resend.

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

Built with accessibility in mind:
- WCAG 2.1 AA compliance target
- Semantic HTML structure
- Keyboard navigation support
- Focus states on all interactive elements
- Color contrast ratios ≥ 4.5:1
- Skip-to-content link
- ARIA labels where needed

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Build and export:
```bash
npm run build
```

The output in `.next/` can be deployed to any Node.js hosting platform.

## 📄 Adding Images

Place images in the `public/` directory:

```
public/
├── images/
│   ├── speakers/           # Speaker headshots
│   ├── events/             # Event photos
│   ├── brands/             # Brand partner logos
│   ├── differentiators/    # Section images
│   └── og-image.jpg        # Social sharing image
└── videos/
    └── hero.mp4            # Hero background video
```

Update image paths in `lib/data.ts` to match.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📜 License

© 2024 Healthspan Productions Inc. All rights reserved.

---

Built with ❤️ for a longer, healthier future.
