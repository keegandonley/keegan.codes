import "./globals.css";
import "./theme.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { MainNavigation } from "@/components/MainNavigation";
import { Raleway } from "next/font/google";
import { merge } from "@/util/classNames";
import { Background } from "@/components/Background";
import { cookies } from "next/headers";

const userTheme = () => {
  const cookieStore = cookies();
  return cookieStore.get("theme")?.value as "light" | "dark" | undefined;
};

const getHasChosenTheme = () => {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get("chosen-theme")?.value;
  return cookieValue === "true";
};

config.autoAddCss = false;

const font = Raleway({ subsets: ["latin"], weight: ["200", "600", "900"] });

export const metadata = {
  title: "Keegan Donley",
  description: "Principal Front-End Engineer at Kizen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
