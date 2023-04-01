/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.donley.xyz",
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
