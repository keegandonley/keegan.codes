// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://9e697d5ed9dc747d6a7fb2047836ce8b@o4507381392408576.ingest.us.sentry.io/4507381395423232',
  tracesSampleRate: 1,
  debug: false,
});
