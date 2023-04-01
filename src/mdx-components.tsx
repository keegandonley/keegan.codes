import type { MDXComponents } from "mdx/types";
import { H1 } from "./components/Post/Heading/H1";
import { H2 } from "./components/Post/Heading/H2";
import { H3 } from "./components/Post/Heading/H3";
import { H4 } from "./components/Post/Heading/H4";
import { H5 } from "./components/Post/Heading/H5";
import { Paragraph } from "./components/Post/Paragraph";
import { Anchor } from "./components/Post/Anchor";
import { Ul } from "./components/Post/Ul";
import { Li } from "./components/Post/Li";
import { Img } from "./components/Post/Image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    p: Paragraph,
    a: Anchor,
    ul: Ul,
    li: Li,
    img: Img,
    ...components,
  };
}
