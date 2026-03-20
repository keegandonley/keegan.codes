import { CommentCountRenderer } from './Renderer';
import { Suspense } from 'react';
import { CommentCountFallback } from './Fallback';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye } from '@keegandonley/pro-solid-svg-icons';
import styles from './commentcount.module.css';
import { merge } from '@/util/classNames';
import { formatNumber } from '@keegancodes/foundations';

interface CommentCountProps {
  slug: string;
  className?: string;
  fixedCount?: number;
}

export default function CommentCount({
  slug,
  className,
  fixedCount,
}: CommentCountProps) {
  return (
    <span className={merge(className, styles.wrapper)}>
      <FontAwesomeIcon icon={faComment} fixedWidth />
      {fixedCount ? (
        <span>{formatNumber(fixedCount)}</span>
      ) : (
        <Suspense fallback={<CommentCountFallback />}>
          <CommentCountRenderer slug={slug} />
        </Suspense>
      )}
    </span>
  );
}
