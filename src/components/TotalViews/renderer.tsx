import { merge } from '@/util/classNames';
import { getTotalViews } from '@/util/db';
import { formatNumber } from '@keegancodes/foundations';

interface ViewCountRendererProps {
  className?: string;
}

export const ViewCountRenderer = async ({
  className,
}: ViewCountRendererProps) => {
  const views = await getTotalViews();
  return <span className={merge(className)}>{formatNumber(views ?? 0)}</span>;
};
