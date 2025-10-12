/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      // --- ADD THIS BLOCK ---
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // ---------------------
    ],
  },
};

export default nextConfig;