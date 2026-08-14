import './globals.css';
import './theme.css';
import '@keegancodes/foundations/dist/main.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { merge } from '@/util/classNames';
import { background } from '@/theme/colors';
import { DARK_CLASS, DARK_THEME, THEME_COOKIE } from '@/theme/constants';
import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import { BASEURL, DESCRIPTION, NAME } from '@/metadata';
import MainNavigation from '@/components/MainNavigation';
import { JsonLd } from '@/components/JsonLd';
import { ModalBoundary } from '@/components/ModalBoundary';
import ThemeProvider from './themeProvider';
import dynamic from 'next/dynamic';
import LoadingProvider from './loadingProvider';
import { GeistSans } from 'geist/font/sans';
import { TailwindDebugger } from '@keegancodes/foundations-react/client';
import { SpeedInsights } from '@vercel/speed-insights/next';

const DynamicEventWaiter = dynamic(
  () => import('./event').then((m) => m.EventWaiter),
  {
    loading: () => null,
  },
);

config.autoAddCss = false;

const THEME_SCRIPT = `
(function () {
  try {
    var match = document.cookie.match(
      new RegExp('(?:^|;\\\\s*)' + ${JSON.stringify(THEME_COOKIE)} + '=([^;]*)')
    );
    if (match && match[1] === ${JSON.stringify(DARK_THEME)}) {
      document.body.classList.add(${JSON.stringify(DARK_CLASS)});
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute('content', ${JSON.stringify(background.dark)});
      }
    }
  } catch (e) {}
})();
`;

export default async function RootLayout({ children, postModal }: any) {
  return (
    <html lang="en" id="fullscreen-context" suppressHydrationWarning>
      <body
        className={merge(GeistSans.className, 'preload')}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: NAME,
            url: BASEURL,
            sameAs: [
              'https://twitter.com/keegandonley',
              'https://github.com/keegandonley',
              'https://www.linkedin.com/in/k10y/',
              'https://bsky.app/profile/keegan.codes',
            ],
            jobTitle: 'Principal Front-End Engineer',
            description: DESCRIPTION,
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: NAME,
            url: BASEURL,
            description: DESCRIPTION,
          }}
        />
        <ThemeProvider>
          <LoadingProvider>
            {/* Display banner text from the edge config if an event is active */}
            <Suspense fallback={null}>
              <DynamicEventWaiter />
            </Suspense>
            <Suspense fallback={null}>
              <MainNavigation />
            </Suspense>
            <main>{children}</main>
            <ModalBoundary>{postModal}</ModalBoundary>
          </LoadingProvider>
        </ThemeProvider>
        {/* Adding suspense to try https://github.com/vercel/next.js/issues/48442#issuecomment-1519139562 */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        {process.env.NODE_ENV === 'development' ? <TailwindDebugger /> : null}
        <SpeedInsights />
      </body>
    </html>
  );
}

export function generateViewport() {
  return {
    themeColor: background.light,
  };
}

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://keegan.codes'),
    title: NAME,
    description: DESCRIPTION,
    openGraph: {
      title: NAME,
      description: DESCRIPTION,
      url: `${BASEURL}`,
      siteName: NAME,
      locale: 'en_US',
      authors: ['Keegan Donley'],
      images: [
        {
          url: `/api/og/page?page=home&width=1200&height=630`,
          width: 1200,
          height: 630,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: NAME,
      description: DESCRIPTION,
      creator: '@keegandonley',
      images: [`/api/og/page?page=home&width=1200&height=630`],
    },
    alternates: {
      canonical: BASEURL,
    },
  };
}
