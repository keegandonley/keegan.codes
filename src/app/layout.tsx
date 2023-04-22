import "./globals.css";
import "./theme.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Raleway } from "next/font/google";
import { merge } from "@/util/classNames";
import { background } from "@/theme/colors";
import { getHasChosenTheme, userTheme } from "@/util/cookies";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";
import { get } from "@vercel/edge-config";
import { Banner } from "@/components/Banner";

const DynamicNavigation = dynamic(() => import("@/components/MainNavigation"));

config.autoAddCss = false;

const font = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "600", "900"],
});

export default async function RootLayout({ children }: any) {
  const theme = userTheme();
  const hasChosenTheme = getHasChosenTheme();
  const event: any = await get("event");

  return (
    <html lang="en">
      <body
        className={merge(font.className, "preload", theme === "dark" && "dark")}
      >
        {/* Display banner text from the edge config if an event is active */}
        {event?.active ? <Banner level={0}>{event.text}</Banner> : null}
        <DynamicNavigation
          initialTheme={theme}
          hasChosenTheme={hasChosenTheme}
        />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}

export async function generateMetadata() {
  const theme = userTheme();

  return {
    title: "Keegan Donley",
    description: "Principal Front-End Engineer at Kizen",
    themeColor: theme === "light" ? background.light : background.dark,
  };
}
