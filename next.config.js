/** @type {import('next').NextConfig} */
const redirects = require("./redirects.js");

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

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [require("remark-prism")],
  },
});
module.exports = withMDX(nextConfig);
