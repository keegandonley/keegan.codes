import addMdx from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import redirects from "./redirects.js";

const nextConfig = {
  reactStrictMode: true,
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

const withMDX = addMdx({
  options: {
    remarkPlugins: [remarkPrism, remarkGfm],
  },
});

export default withMDX(nextConfig);