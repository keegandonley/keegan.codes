import { merge } from '@/util/classNames';
import { getFullyQualifiedDeploymentUrl } from '@/util/deployment';
import { formatNumber } from '@keegancodes/foundations';

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
    const data = await fetch(url, { cache: 'no-store', headers });

    const { views } = await data.json();

    return views;
  } catch (ex) {
    console.error('Error for slug when getting page views', slug, ex);
    return 0;
  }
};

export const ViewCountRenderer = async ({
  slug,
  className,
}: ViewCountRendererProps) => {
  const views = await getValue(slug);

  return <span className={merge(className)}>{formatNumber(views)}</span>;
};
