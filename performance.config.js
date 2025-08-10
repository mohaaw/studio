/**
 * @fileoverview Performance Configuration for TechShop Manager
 *
 * This file defines different performance profiles for the Next.js application.
 * These profiles can be used to tailor the application's build and runtime
 * behavior for different environments (e.g., low-spec developer machines vs.
 * high-spec production servers).
 *
 * To use a specific profile, set the `PERF_PROFILE` environment variable
 * when running the app. For example:
 *
 * PERF_PROFILE=low-spec npm run dev
 *
 * If no profile is set, it defaults to 'standard'.
 */

const performanceProfiles = {
  /**
   * Optimizes for machines with limited resources.
   * - Disables build cache to save disk space.
   * - Disables image optimization cache.
   * This profile is ideal for developers on less powerful laptops.
   */
  'low-spec': {
    // Disables persistent caching between builds.
    cacheMaxMemorySize: 0, 
    // Turns off the Next.js build cache.
    experimental: {
      useLightningcss: false,
    },
    // Disables image optimization cache.
    images: {
      unoptimized: true,
    },
  },

  /**
   * A balanced configuration suitable for most development and production environments.
   * Standard caching and optimizations are enabled.
   */
  'standard': {
    cacheMaxMemorySize: 50 * 1024 * 1024, // 50MB memory cache
    experimental: {
      useLightningcss: false,
    },
    images: {
      unoptimized: false,
    },
  },

  /**
   * For high-performance machines or CI/CD builders.
   * - Enables more aggressive caching and parallelism.
   * - Enables experimental features that can speed up builds but may be less stable.
   */
  'high-spec': {
    cacheMaxMemorySize: 100 * 1024 * 1024, // 100MB memory cache
    experimental: {
      // Enables parallel builds for routes, speeding up build times.
      parallelism: true, 
      useLightningcss: false,
    },
    images: {
      unoptimized: false,
    },
  },
};

const activeProfile = process.env.PERF_PROFILE || 'standard';
const selectedConfig = performanceProfiles[activeProfile] || performanceProfiles['standard'];

console.log(`\n✅ Using performance profile: "${activeProfile}"\n`);

module.exports = selectedConfig;
