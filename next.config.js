/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Compiler optimizations for production
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    domains: ['static.wixstatic.com'],
    formats: ['image/avif', 'image/webp'],
    // Responsive image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Longer cache TTL for images
    minimumCacheTTL: 31536000, // 1 year
  },

  // Enable static exports if needed
  // output: 'export',
};

module.exports = nextConfig;

