import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',  // Enable static site generation
  images: {
    unoptimized: true,
    domains: ['localhost']
  },
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'out',
};

export default nextConfig;
