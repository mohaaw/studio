
const createNextIntlPlugin = require('next-intl/plugin');
const performanceConfig = require('./performance.config.js');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  ...performanceConfig, // Spread the performance configuration here
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Merge existing image config with performance config
    ...performanceConfig.images,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
 
module.exports = withNextIntl(nextConfig);
