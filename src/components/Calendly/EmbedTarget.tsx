"use client";
import { ThemeContext } from "@/app/themeProvider";
import { useContext } from "react";
import { InlineWidget } from "react-calendly";

export const EmbedTarget = ({
  meeting = "career-chat",
  color = { light: "ffffff", dark: "0A0935" },
  textColor = { light: "20417B", dark: "D0D6E3" },
  primaryColor = { light: "00465f", dark: "4BB9E5" },
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <InlineWidget
      url={`https://calendly.com/k10y/${meeting}?hide_event_type_details=1&background_color=${color[theme]}&text_color=${textColor[theme]}&primary_color=${primaryColor[theme]}`}
      styles={{
        height: "90rem",
      }}
    />
  );
};
