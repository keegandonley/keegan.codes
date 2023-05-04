import "./globals.css";
import "./theme.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Raleway } from "next/font/google";
import { merge } from "@/util/classNames";
import { background } from "@/theme/colors";
import { getHasChosenTheme, userTheme } from "@/util/cookies";
import { Analytics } from "@vercel/analytics/react";
import { get } from "@vercel/edge-config";
import { Banner } from "@/components/Banner";
import { Suspense } from "react";
import { BASEURL, DESCRIPTION, NAME } from "@/metadata";
import MainNavigation from "@/components/MainNavigation";
import { ModalBoundary } from "@/components/ModalBoundary";

config.autoAddCss = false;

const font = Raleway({
  subsets: ["latin"],
});

export default async function RootLayout({ children, postModal }: any) {
  const theme = userTheme();
  const hasChosenTheme = getHasChosenTheme();
  const event: any = await get("event");

  return (
    <html lang="en">
      <body
        className={merge(font.className, "preload", theme === "dark" && "dark")}
      >
        {/* Display banner text from the edge config if an event is active */}
        {event?.active ? <Banner level={1}>{event.text}</Banner> : null}
        <MainNavigation initialTheme={theme} hasChosenTheme={hasChosenTheme} />
        <main>{children}</main>
        <ModalBoundary>{postModal}</ModalBoundary>
        {/* Adding suspense to try https://github.com/vercel/next.js/issues/48442#issuecomment-1519139562 */}
        <Suspense>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}

export async function generateMetadata() {
  const theme = userTheme();

  return {
    title: NAME,
    description: DESCRIPTION,
    themeColor: theme === "light" ? background.light : background.dark,
    openGraph: {
      title: NAME,
      description: DESCRIPTION,
      url: `${BASEURL}`,
      siteName: NAME,
      locale: "en_US",
      authors: ["Keegan Donley"],
      images: [
        {
          url: `/api/og/page?page=home&width=1200&height=630`,
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: NAME,
      description: DESCRIPTION,
      creator: "@keegandonley",
      images: [`/api/og/page?page=home&width=1200&height=630`],
    },
  };
}
