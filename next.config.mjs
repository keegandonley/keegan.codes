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
        hostname: 'cdn.bsky.app',
        port: '',
        pathname: '/img/avatar/**',
      },
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
    qualities: [75, 80],
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
    optimizePackageImports: [
      '@keegandonley/pro-solid-svg-icons',
      '@keegandonley/pro-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ],
  },
  reactCompiler: true,
  webpack: (config, { isServer }) => {
    // Ignore the warning for tailwind's dynamic requires
    if (isServer) {
      config.ignoreWarnings = [{ module: /node_modules\/tailwindcss/ }];
    }
    return config;
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
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options
  org: 'keegancodes',
  project: 'keegancodes',
  silent: true,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  automaticVercelMonitors: false,
  telemetry: false,
  enabled: process.env.NODE_ENV === 'production',
  disableLogger: true,
});
