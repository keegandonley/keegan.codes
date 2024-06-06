import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://9e697d5ed9dc747d6a7fb2047836ce8b@o4507381392408576.ingest.us.sentry.io/4507381395423232',
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.5,
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
});
