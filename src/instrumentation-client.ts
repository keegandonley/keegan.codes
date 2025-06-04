import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://9e697d5ed9dc747d6a7fb2047836ce8b@o4507381392408576.ingest.us.sentry.io/4507381395423232',
  integrations: [],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
  enabled: process.env.NODE_ENV === 'production',
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

import('@sentry/nextjs').then((lazyLoadedSentry) => {
  Sentry.addIntegration(
    lazyLoadedSentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  );
});
