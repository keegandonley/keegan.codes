import type { Meta, StoryObj } from "@storybook/react";

import { CheersClientRenderer } from "./ClientRenderer";

const meta: Meta<typeof CheersClientRenderer> = {
  component: CheersClientRenderer,
  title: "Post/Cheers",
};

export default meta;
type Story = StoryObj<typeof CheersClientRenderer>;

export const Primary: Story = {
  args: {
    count: 30,
    slug: "text-slug",
    location: "blog",
  },
};
