/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [require("remark-prism")],
  },
});
module.exports = withMDX(nextConfig);
