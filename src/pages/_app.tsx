import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ignorePaths = ["/test-success"];

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics
        beforeSend={(event) => {
          if (ignorePaths.some((path) => event.url.endsWith(path))) {
            return null;
          }

          return event;
        }}
      />
      <SpeedInsights
        beforeSend={(event) => {
          if (ignorePaths.some((path) => event.url.endsWith(path))) {
            return null;
          }

          return event;
        }}
      />
    </>
  );
}

export default App;
