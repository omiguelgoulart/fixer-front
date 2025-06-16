import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.festo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.atlascopco.com',
      },
    ],
  },
};

export default nextConfig;
