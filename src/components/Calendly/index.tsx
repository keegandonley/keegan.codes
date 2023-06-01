import { merge } from "@/util/classNames";
import Script from "next/script";
import styles from "./calendly.module.css";
import { useContext } from "react";
import { ThemeContext } from "@/app/themeProvider";

export const EmbedScript = () => {
  return (
    <Script
      type="text/javascript"
      src="https://assets.calendly.com/assets/external/widget.js"
      async
    />
  );
};

export const Body = ({ children }: { children: any }) => {
  return <p className={styles.text}>{children}</p>;
};

export const Intro = ({ children }: { children: any }) => {
  return <div className={styles.intro}>{children}</div>;
};
