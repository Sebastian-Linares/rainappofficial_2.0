"use strict";

// next.config.js
var nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rain-chat-official.web.app"
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["rain-chat-official.web.app"]
    }
  },
  assetPrefix: "/",
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};
module.exports = nextConfig;
