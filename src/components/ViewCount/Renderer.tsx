import { merge } from '@/util/classNames';
import { formatNumber } from '@keegancodes/foundations';
import { getFullyQualifiedDeploymentUrl } from '@keegancodes/foundations-next';
import { captureException } from '@sentry/nextjs';

interface ViewCountRendererProps {
  slug: string;
  className?: string;
  fixedCount?: number;
}

const getValue = async (slug: string): Promise<number> => {
  try {
    const { url, headers } = await getFullyQualifiedDeploymentUrl(
      `/api/view?slug=${slug}`,
    );

    const data = await fetch(url, { headers });

    let views;

    try {
      const jsonResult = await data.json();
      views = jsonResult.views;
    } catch (ex) {
      // this is weird, why is there an error?
      try {
        const text = await data.text();
        console.log('text', text);
      } catch (ex) {
        // noop
      }
    }

    return views;
  } catch (ex) {
    captureException(ex);
    console.error('Error for slug when getting page views', slug, ex);
    return 0;
  }
};

export const ViewCountRenderer = async ({
  slug,
  className,
}: ViewCountRendererProps) => {
  const views = await getValue(slug);

  return <span className={merge(className)}>{formatNumber(views ?? 0)}</span>;
};
