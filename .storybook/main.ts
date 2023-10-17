import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
// import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config, { configType }) => {
    const res = config;
    if (res.resolve) {
      res.resolve.alias = {
        "@": path.resolve(__dirname, "../src"),
      };
    }
    return res;
  },
};
export default config;
