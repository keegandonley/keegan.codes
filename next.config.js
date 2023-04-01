/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-b6d5fce9c8c2407a9d5cb66cb2417f60.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [require("remark-prism")],
  },
});
module.exports = withMDX(nextConfig);
