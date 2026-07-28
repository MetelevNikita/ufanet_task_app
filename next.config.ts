import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  allowedDevOrigins: ['*'],
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    middlewareClientMaxBodySize: '20mb',

    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
};

export default nextConfig;
