'use client';

import { Analytics } from '@vercel/analytics/react';

export const ClientAnalytics = () => {
  return (
    <Analytics
      beforeSend={(event) => {
        const url = new URL(event.url);

        if (url.pathname === '/playground') {
          return null;
        }

        return event;
      }}
    />
  );
};
