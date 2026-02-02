# Image Assets

This directory contains all image assets for the Healthspan Productions website.

## Current Status

**Placeholder SVGs are included** for development purposes. Replace these with actual images for production:

- `speakers/*.svg` - Replace with actual headshot photos (JPG/WEBP)
- `brands/*.svg` - Replace with actual brand logos (PNG with transparency)
- `team/*.svg` - Replace with actual team photos (JPG/WEBP)
- `events/*.svg` - Replace with actual event photos (JPG/WEBP)
- `differentiators/*.svg` - Replace with actual section images (JPG/WEBP)

## Directory Structure

```
images/
├── speakers/       # Speaker headshots (recommended: 400x400px)
├── events/         # Event photos and hero images
│   └── 2024-summit/  # Gallery images for 2024 summit
├── brands/         # Partner brand logos
├── differentiators/# Section background images
├── team/           # Team member photos
└── og-image.jpg    # Social sharing image (1200x630px) - TODO: Create
```

## Image Requirements

### Speaker Headshots
- Format: JPG, WEBP, or PNG
- Size: 400x400px minimum (square aspect ratio)
- Naming: `firstname-lastname.{ext}` (e.g., `bryan-johnson.jpg`)
- Update the path in `/lib/data.ts` when replacing

### Event Images
- Hero images: 1920x1080px minimum
- Gallery images: 800x800px minimum (square for gallery grid)
- Format: JPG or WEBP
- Naming: Event slug based (e.g., `2024-summit-hero.jpg`)

### Brand Logos
- Format: PNG with transparency (preferred) or SVG
- Size: 200x80px recommended
- Naming: `brand-name.{ext}` (e.g., `fatty15.png`)

### Team Photos
- Format: JPG or WEBP
- Size: 400x400px minimum (square)
- Naming: `firstname-lastname.{ext}`

### Differentiator Images
- Format: JPG or WEBP
- Size: 600x400px minimum
- Naming: `topic.{ext}` (e.g., `science.jpg`, `community.jpg`)

## Optimization

Before adding production images:
1. Compress using tools like TinyPNG, Squoosh, or ImageOptim
2. Use WebP format when possible for better compression
3. Ensure proper aspect ratios as specified above

Next.js Image component will handle further optimization automatically.

## Updating Image Paths

When replacing placeholder SVGs with real images, update the corresponding paths in `/lib/data.ts`:
- Speakers: `speakers` array, `headshot` property
- Brands: `brands` array, `logo` property
- Team: `teamMembers` array, `image` property
- Events: `events` array, `heroImage` and `gallery` properties
- Differentiators: `differentiators` array, `image` property
