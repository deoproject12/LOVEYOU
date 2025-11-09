import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true, // This allows local image serving from /public
  },
  experimental: {
    serverComponentsExternalPackages: ["cloudinary"],
  },
};

export default nextConfig;
