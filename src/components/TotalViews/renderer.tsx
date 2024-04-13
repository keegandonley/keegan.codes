import { merge } from '@/util/classNames';
import { formatNumber } from '@keegancodes/foundations';
import { getFullyQualifiedDeploymentUrl } from '@keegancodes/foundations-next';

const getValue = async (): Promise<number> => {
  try {
    const { url, headers } =
      await getFullyQualifiedDeploymentUrl('/api/view/total');
    const data = await fetch(url, { cache: 'no-store', headers });

    const { views } = await data.json();

    return views;
  } catch (ex) {
    console.error('Error when getting total page views', ex);
    return 0;
  }
};

interface ViewCountRendererProps {
  className?: string;
}

export const ViewCountRenderer = async ({
  className,
}: ViewCountRendererProps) => {
  const views = await getValue();
  return <span className={merge(className)}>{formatNumber(views)}</span>;
};
