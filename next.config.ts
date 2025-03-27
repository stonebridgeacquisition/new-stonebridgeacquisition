import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: ['localhost']
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
