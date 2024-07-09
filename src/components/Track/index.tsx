import { getFullyQualifiedDeploymentUrl } from '@keegancodes/foundations-next';
import { waitUntil } from '@vercel/functions';
import { captureException } from '@sentry/nextjs';

const trackView = async (slug: string, inModal: boolean) => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('trackView called for', slug, inModal);
    try {
      const { url, headers } =
        await getFullyQualifiedDeploymentUrl(`/api/view`);
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          slug: slug,
          inModal: inModal,
        } as TrackBody),
        priority: 'low',
        headers,
      });
    } catch (ex) {
      captureException(ex);
    }
  } else {
    console.log('Skipping tracking in local dev, event would be', {
      slug,
      inModal,
    });
  }
};

const Track = ({ inModal, slug }: TrackBody) => {
  if (typeof window === "undefined") {
    console.warn('Calling track', Date.now());
    waitUntil(trackView(slug, inModal));
  }

  return null;
};

export default Track;
