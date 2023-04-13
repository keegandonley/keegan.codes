"use client";

import {
  usePathname,
  useSelectedLayoutSegments,
  useRouter,
} from "next/navigation";
import styles from "./background.module.css";
import { merge } from "@/util/classNames";

export const Background = () => {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();

  const isLikelyInterceptedBlogPage =
    segments[0] === "blog" && segments.length === 1;

  const isExactlyBlogPage = pathname === "/blog" || isLikelyInterceptedBlogPage;

  return (
    <div
      className={merge(styles.background, isExactlyBlogPage && styles.visible)}
    ></div>
  );
};
