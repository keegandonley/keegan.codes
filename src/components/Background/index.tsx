"use client";

import styles from "./background.module.css";
import { merge } from "@/util/classNames";
import { useBlogRouter } from "@/hooks/useBlogRouter";

export const Background = () => {
  const isExactlyBlogPage = useBlogRouter();

  return (
    <div
      className={merge(styles.background, isExactlyBlogPage && styles.visible)}
    ></div>
  );
};
