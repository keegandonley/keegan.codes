import { withSentryConfig } from '@sentry/nextjs';
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
  org: 'keegancodes',
  project: 'keegancodes',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  telemetry: false,
  enabled: process.env.NODE_ENV === 'production',
});
