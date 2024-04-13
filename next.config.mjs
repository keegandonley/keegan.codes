import addMdx from '@next/mdx';
import remarkGfm from 'remark-gfm';
import redirects from './redirects.js';
import addAnalyzer from '@next/bundle-analyzer';
import rehypeHighlight from 'rehype-highlight';
import { common } from 'lowlight';

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
};

const withBundleAnalyzer = addAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = addMdx({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight.bind(null, { languages: { ...common } })],
  },
});

export default withBundleAnalyzer(withMDX(nextConfig));
