import "./globals.css";
import "./theme.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { MainNavigation } from "@/components/MainNavigation";
import { Raleway } from "next/font/google";
import { merge } from "@/util/classNames";
import { Background } from "@/components/Background";
import { background } from "@/theme/colors";
import { LayoutProps } from "../../.next/types/app/layout";
import { getHasChosenTheme, userTheme } from "@/util/cookies";

config.autoAddCss = false;

const font = Raleway({ subsets: ["latin"], weight: ["200", "600", "900"] });

export default function RootLayout({ children }: LayoutProps) {
  const theme = userTheme();
  const hasChosenTheme = getHasChosenTheme();

  return (
    <html lang="en">
      <body
        className={merge(font.className, "preload", theme === "dark" && "dark")}
      >
        <MainNavigation initialTheme={theme} hasChosenTheme={hasChosenTheme} />
        <main>{children}</main>
        <Background />
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
