import { withNextVideo } from "next-video/process";
import addMdx from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import redirects from "./redirects.js";
import addAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.donley.xyz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "barcelona.gallery.static.donley.xyz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "library.static.donley.xyz",
        port: "",
        pathname: "/**",
      },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 90,
  },
  modularizeImports: {
    "@fortawesome/pro-solid-svg-icons": {
      transform: "@fortawesome/pro-solid-svg-icons/{{member}}",
      skipDefaultConversion: true,
    },
    "@fortawesome/free-brands-svg-icons": {
      transform: "@fortawesome/free-brands-svg-icons/{{member}}",
      skipDefaultConversion: true,
    },
  },
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
};

const withBundleAnalyzer = addAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = addMdx({
  options: {
    remarkPlugins: [remarkPrism, remarkGfm],
  },
});

export default withNextVideo(withBundleAnalyzer(withMDX(nextConfig)), {
  provider: "vercel-blob",
});
