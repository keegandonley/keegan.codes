import { getFullyQualifiedDeploymentUrl } from '@keegancodes/foundations-next';
import { waitUntil } from '@vercel/functions';
import * as Sentry from '@sentry/nextjs';

const trackView = async (slug: string, qrScanned: boolean) => {
  if (process.env.NODE_ENV !== 'development') {
    try {
      const { url, headers } =
        await getFullyQualifiedDeploymentUrl(`/api/view/hi`);

      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          slug: slug,
          qrScanned: qrScanned,
        } as HiTrackBody),
        priority: 'low',
        headers,
      });
    } catch (ex) {
      Sentry.captureException(ex);
    }
  } else {
    console.log('Skipping tracking in local dev, event would be', {
      slug,
      qrScanned,
    });
  }
};

export const HiTrack = ({ qrScanned, slug }: HiTrackBody) => {
  waitUntil(trackView(slug, qrScanned));

  return null;

  return null;
};
