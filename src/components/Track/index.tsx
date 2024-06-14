import { getFullyQualifiedDeploymentUrl } from '@keegancodes/foundations-next';
import { waitUntil } from '@vercel/functions';

const trackView = async (slug: string, inModal: boolean) => {
  if (process.env.NODE_ENV !== 'development') {
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
      // swallow error
    }
  } else {
    console.log('Skipping tracking in local dev, event would be', {
      slug,
      inModal,
    });
  }
};

const Track = ({ inModal, slug }: TrackBody) => {
  waitUntil(trackView(slug, inModal));

  return null;
};

export default Track;
