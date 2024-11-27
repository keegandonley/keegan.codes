import { merge } from '@/util/classNames';
import { getViewCountForSlug } from '@/util/db';
import { formatNumber } from '@keegancodes/foundations';

interface ViewCountRendererProps {
  slug: string;
  className?: string;
  fixedCount?: number;
}

export const ViewCountRenderer = async ({
  slug,
  className,
}: ViewCountRendererProps) => {
  const views = await getViewCountForSlug(slug);

  return <span className={merge(className)}>{formatNumber(views ?? 0)}</span>;
};
