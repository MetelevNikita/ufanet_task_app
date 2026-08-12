import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  allowedDevOrigins: ['*'],
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    middlewareClientMaxBodySize: '40mb',

    serverActions: {
      bodySizeLimit: '40mb',
    },
  },
};

export default nextConfig;
