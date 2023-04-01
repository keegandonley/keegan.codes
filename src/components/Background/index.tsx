"use client";

import { usePathname } from "next/navigation";
import styles from "./background.module.css";
import { merge } from "@/util/classNames";

export const Background = () => {
  const pathname = usePathname();
  const isExactlyBlogPage = pathname === "/blog";

  return (
    <div
      className={merge(styles.background, isExactlyBlogPage && styles.visible)}
    ></div>
  );
};
