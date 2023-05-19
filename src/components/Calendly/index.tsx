import { merge } from "@/util/classNames";
import Script from "next/script";
import styles from "./calendly.module.css";

export const EmbedScript = () => {
  return (
    <Script
      type="text/javascript"
      src="https://assets.calendly.com/assets/external/widget.js"
      async
    />
  );
};

export const EmbedTarget = ({
  meeting = "career-chat",
  color = "00465f",
  textColor = "d0d6e3",
  primaryColor = "4bb9e5",
}) => {
  return (
    <div
      className={merge("calendly-inline-widget", styles.calendlyContainer)}
      data-url={`https://calendly.com/k10y/${meeting}?hide_event_type_details=1&background_color=${color}&text_color=${textColor}&primary_color=${primaryColor}`}
    />
  );
};

export const Body = ({ children }: { children: any }) => {
  return <p className={styles.text}>{children}</p>;
};

export const Intro = ({ children }: { children: any }) => {
  return <div className={styles.intro}>{children}</div>;
};
