'use client';
import { captureException } from '@sentry/nextjs';
import { useEffect } from 'react';

const Track = ({ inModal, slug }: TrackBody) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      setTimeout(() => {
        try {
          fetch('/api/view', {
            method: 'POST',
            body: JSON.stringify({
              slug: slug,
              inModal: inModal,
            } as TrackBody),
            priority: 'low',
          });
        } catch (ex) {
          captureException(ex);
        }
      });
    } else {
      console.log('Skipping tracking in local dev, event would be', {
        slug,
        inModal,
      });
    }
  }, [inModal, slug]);

  return null;
};

export default Track;
