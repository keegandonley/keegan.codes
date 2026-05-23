import { merge } from '@/util/classNames';
import { formatNumber } from '@keegancodes/foundations';
import { getCommentCountForSlug } from '../Comments/util';

interface CommentCountRendererProps {
  slug: string;
  className?: string;
  fixedCount?: number;
}

export const CommentCountRenderer = async ({
  slug,
  className,
}: CommentCountRendererProps) => {
  const comments = await getCommentCountForSlug(slug);

  return (
    <span className={merge(className)}>{formatNumber(comments ?? 0)}</span>
  );
};
