'use client';
import { captureException } from '@sentry/nextjs';
import { useEffect } from 'react';

const HiTrack = ({ qrScanned, slug }: HiTrackBody) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      setTimeout(async () => {
        try {
          await fetch('/api/view/hi', {
            method: 'POST',
            body: JSON.stringify({
              slug: slug,
              qrScanned: qrScanned,
            } as HiTrackBody),
            priority: 'low',
          });
        } catch (ex) {
          captureException(ex);
        }
      });
    } else {
      console.log('Skipping tracking in local dev, event would be', {
        slug,
        qrScanned,
      });
    }
  }, [qrScanned, slug]);

  return null;
};

export default HiTrack;
