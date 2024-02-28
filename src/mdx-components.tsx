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
import { Hr } from "./components/Post/Hr";
import { Blockquote } from "./components/Post/Blockquote";
import { Ol } from "./components/Post/Ol";
import { Table } from "./components/Post/Table";
import { Td } from "./components/Post/Table/Td";
import { Tr } from "./components/Post/Table/Tr";
import { Th } from "./components/Post/Table/Th";

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
    hr: ({ style, ...props }) => <Hr {...props} mdStyle={style} />,
    blockquote: Blockquote,
    ol: Ol,
    table: Table,
    td: Td,
    tr: Tr,
    th: Th,
    ...components,
  };
}
