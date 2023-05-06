"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./pagination.module.css";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/pro-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { merge } from "@/util/classNames";

interface PaginationProps {
  pageCount: number;
  pageNumber: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function Pagination({
  pageCount,
  pageNumber,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  const router = useRouter();

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          className={merge(styles.button, !hasPreviousPage && styles.hidden)}
          onClick={handleGoBack}
        >
          <FontAwesomeIcon className={styles.icon} icon={faArrowCircleLeft} />
        </button>

        <p className={styles.label}>
          page{" "}
          <pre>
            {pageNumber}/{pageCount}
          </pre>
        </p>
        <button
          className={merge(styles.button, !hasNextPage && styles.hidden)}
          onClick={handleGoForward}
        >
          <FontAwesomeIcon className={styles.icon} icon={faArrowCircleRight} />
        </button>
      </div>
    </div>
  );
}
