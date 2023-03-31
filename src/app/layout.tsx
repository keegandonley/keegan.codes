import "./globals.css";
import "./theme.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { MainNavigation } from "@/components/MainNavigation";
import { Raleway } from "next/font/google";
import { merge } from "@/util/classNames";

config.autoAddCss = false;

const font = Raleway({ subsets: ["latin"], weight: ["200", "600"] });

export const metadata = {
  title: "Keegan Donley",
  description: "Principal Front-End Engineer at Kizen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={merge(font.className, "preload")}>
        <MainNavigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
