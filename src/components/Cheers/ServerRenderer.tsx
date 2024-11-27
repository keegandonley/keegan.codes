import { getFullyQualifiedDeploymentUrl } from '@keegancodes/foundations-next';
import { CheersClientRenderer } from './ClientRenderer';
import styles from './cheers.module.css';
import { captureException } from '@sentry/nextjs';

interface CheersServerRendererProps {
  slug: string;
  location: string;
}

const getValue = async (slug: string): Promise<number> => {
  try {
    const { url, headers } = await getFullyQualifiedDeploymentUrl(
      `/api/cheers?slug=${slug}`,
    );
    const data = await fetch(url, {
      headers,
    });

    let count = '0';

    try {
      const jsonResult = await data.json();
      count = jsonResult.count;
    } catch (ex) {
      console.log('json parse error', JSON.stringify(data));
    }

    return parseInt(count);
  } catch (ex) {
    console.error('Error for slug when getting cheers count', slug, ex);
    captureException(ex);
    return 0;
  }
};

export const CheersServerRenderer = async ({
  slug,
  location,
}: CheersServerRendererProps) => {
  const count = await getValue(slug);
  return (
    <div className={styles.container}>
      <CheersClientRenderer count={count} slug={slug} location={location} />
    </div>
  );
};
