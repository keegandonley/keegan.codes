import type { MDXComponents } from "mdx/types";
import styles from "./mdx.module.css";
import { merge } from "./util/classNames";
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className={merge(styles.h, styles.h1)}>{children}</h1>
    ),
    p: ({ children }) => <p className={styles.p}>{children}</p>,
    h2: ({ children }) => (
      <h2 className={merge(styles.h, styles.h2)}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className={merge(styles.h, styles.h3)}>{children}</h3>
    ),
    a: ({ children, href }) => (
      <a className={styles.a} href={href}>
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
    li: ({ children }) => <li className={styles.li}>{children}</li>,
    ...components,
  };
}
