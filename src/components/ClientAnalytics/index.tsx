'use client';

import { Analytics } from '@vercel/analytics/react';

export const ClientAnalytics = () => {
  return (
    <Analytics
      beforeSend={(event) => {
        const url = new URL(event.url);

        console.log(url);

        if (url.pathname === '/playground') {
          return {
            ...event,
            url: `${url.origin}/playground`,
          };
        }

        return event;
      }}
    />
  );
};
