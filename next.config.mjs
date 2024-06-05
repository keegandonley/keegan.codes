import {withSentryConfig} from '@sentry/nextjs';
import addMdx from '@next/mdx';
import remarkPrism from 'remark-prism';
import remarkGfm from 'remark-gfm';
import redirects from './redirects.js';
import addAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.donley.xyz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'barcelona.gallery.static.donley.xyz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'library.static.donley.xyz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'badges.donley.xyz',
        port: '',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 90,
  },
  modularizeImports: {
    '@keegandonley/pro-solid-svg-icons': {
      transform: '@keegandonley/pro-solid-svg-icons/{{member}}',
      skipDefaultConversion: true,
    },
    '@keegandonley/pro-regular-svg-icons': {
      transform: '@keegandonley/pro-regular-svg-icons/{{member}}',
      skipDefaultConversion: true,
    },
    '@fortawesome/free-brands-svg-icons': {
      transform: '@fortawesome/free-brands-svg-icons/{{member}}',
      skipDefaultConversion: true,
    },
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  redirects: async () => {
    return [
      ...redirects.map((r) => {
        return {
          source: r[0],
          destination: r[1],
          permanent: Boolean(r[3]) ?? true,
        };
      }),
    ];
  },
  // Support the pages router with the Geist font
  transpilePackages: ['geist'],
  experimental: {
    reactCompiler: true,
  },
};

const withBundleAnalyzer = addAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = addMdx({
  options: {
    remarkPlugins: [remarkPrism, remarkGfm],
  },
});

export default withSentryConfig(withBundleAnalyzer(withMDX(nextConfig)), {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "keegancodes",
project: "keegancodes",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});