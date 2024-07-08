'use client';

import { captureException } from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({ error }: any) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error statusCode={error?.status} />
      </body>
    </html>
  );
}
