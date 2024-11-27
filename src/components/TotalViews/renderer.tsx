import { merge } from '@/util/classNames';
import { formatNumber } from '@keegancodes/foundations';
import { getFullyQualifiedDeploymentUrl } from '@keegancodes/foundations-next';
import { captureException } from '@sentry/nextjs';

export const getValue = async (): Promise<number> => {
  try {
    const { url, headers } =
      await getFullyQualifiedDeploymentUrl('/api/view/total');
    const data = await fetch(url, { headers });

    if (!data.ok) {
      console.warn('Data not ok', url, data.status, data.statusText);
      return 0;
    }

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
    console.error('Error when getting total page views', ex);
  }

  return 0;
};

interface ViewCountRendererProps {
  className?: string;
}

export const ViewCountRenderer = async ({
  className,
}: ViewCountRendererProps) => {
  const views = await getValue();
  return <span className={merge(className)}>{formatNumber(views ?? 0)}</span>;
};
