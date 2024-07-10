'use client';
import { useEffect } from 'react';

const Track = ({ inModal, slug }: TrackBody) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      setTimeout(() =>
        fetch('/api/view', {
          method: 'POST',
          body: JSON.stringify({
            slug: slug,
            inModal: inModal,
          } as TrackBody),
          priority: 'low',
        }),
      );
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
