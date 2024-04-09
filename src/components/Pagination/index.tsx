'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './pagination.module.css';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@keegandonley/pro-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { merge } from '@/util/classNames';
import { useBlogRouter } from '@/hooks/useBlogRouter';

interface PaginationProps {
  pageCount: number;
  segment: string;
}

export default function Pagination({ pageCount }: PaginationProps) {
  const router = useRouter();
  const queryParams = useSearchParams();
  const isExactlyBlogPage = useBlogRouter();

  const pageNumber = parseInt(queryParams?.get('page') ?? '1', 10);
  const hasNextPage = pageNumber < pageCount;
  const hasPreviousPage = pageNumber > 1;

  const handleGoForward = useCallback(() => {
    if (hasNextPage) {
      router.push(`/blog?page=${pageNumber + 1}`);
    }
  }, [hasNextPage, pageNumber, router]);

  const handleGoBack = useCallback(() => {
    if (hasPreviousPage) {
      router.push(`/blog?page=${pageNumber - 1}`);
    }
  }, [hasPreviousPage, pageNumber, router]);

  if (!isExactlyBlogPage) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          className={merge(styles.button, !hasPreviousPage && styles.hidden)}
          onClick={handleGoBack}
          disabled={!hasPreviousPage}
          aria-label="Go back one page"
        >
          <FontAwesomeIcon className={styles.icon} icon={faArrowCircleLeft} />
        </button>

        <p className={styles.label}>
          page{' '}
          <pre>
            {pageNumber}/{pageCount}
          </pre>
        </p>
        <button
          className={merge(styles.button, !hasNextPage && styles.hidden)}
          onClick={handleGoForward}
          disabled={!hasNextPage}
          aria-label="Go forward one page"
        >
          <FontAwesomeIcon className={styles.icon} icon={faArrowCircleRight} />
        </button>
      </div>
    </div>
  );
}
