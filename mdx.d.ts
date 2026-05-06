declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export const metadata: Record<string, any>;
  export default MDXComponent;
}
