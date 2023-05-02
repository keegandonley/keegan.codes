"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./cheers.module.css";
import { faChampagneGlass, faCircle } from "@fortawesome/pro-solid-svg-icons";
import { merge } from "@/util/classNames";
import { useCallback, useRef, useState } from "react";
import va from "@vercel/analytics";

interface CheersClientRendererProps {
  slug: string;
  location: string;
  count: number;
}

export const CheersClientRenderer = ({
  slug,
  location,
  count,
}: CheersClientRendererProps) => {
  const [cheersCount, setCheersCount] = useState(count);
  const [cheersing, setCheersing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const loading = count === -1;

  const handleClickCheers = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setCheersCount((c) => c + 1);
      setCheersing(true);
      let id = localStorage.getItem("cheers-id");
      timerRef.current = setTimeout(() => {
        setCheersing(false);
      }, 700);

      if (!id) {
        id = Date.now() + "-" + Math.random().toString();
        localStorage.setItem("cheers-id", id);
      }

      fetch("/api/cheers", {
        method: "POST",
        body: JSON.stringify({
          slug: slug,
          location,
          id,
        } as CheersBody),
      });

      va.track("Cheers Click", {
        slug,
        location,
      });

      return false;
    },
    [slug, location]
  );

  return (
    <>
      <span className={styles.text}>
        <strong>{loading ? "--" : cheersCount}</strong> cheers
      </span>
      <button
        className={merge(styles.wrapper, cheersing && styles.cheersing)}
        onClick={handleClickCheers}
        disabled={loading}
        aria-label="Give cheers"
      >
        <FontAwesomeIcon
          icon={faChampagneGlass}
          className={merge(styles.glass, styles.left)}
        />
        <FontAwesomeIcon
          icon={faChampagneGlass}
          className={merge(styles.glass, styles.right)}
        />
        <svg
          viewBox="0 0 103 258"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.bubbles}
        >
          <circle
            cx="28"
            cy="149"
            r="28"
            fill="#D9D9D9"
            className={merge(styles.bubble, styles.bubble1)}
          />
          <circle
            cx="84.5"
            cy="95.5"
            r="18.5"
            fill="#D9D9D9"
            className={merge(styles.bubble, styles.bubble2)}
          />
          <circle
            cx="39"
            cy="83"
            r="13"
            fill="#D9D9D9"
            className={merge(styles.bubble, styles.bubble3)}
          />
          <circle
            cx="90"
            cy="162"
            r="13"
            fill="#D9D9D9"
            className={merge(styles.bubble, styles.bubble4)}
          />
          <circle
            cx="52.5"
            cy="37.5"
            r="9.5"
            fill="#D9D9D9"
            className={merge(styles.bubble, styles.bubble5)}
          />
          <circle
            cx="61.5"
            cy="202.5"
            r="9.5"
            fill="#D9D9D9"
            className={merge(styles.bubble, styles.bubble6)}
          />
          <circle
            cx="16.5"
            cy="9.5"
            r="9.5"
            fill="#D9D9D9"
            className={merge(styles.bubble, styles.bubble7)}
          />
          <circle
            cx="80.5"
            cy="248.5"
            r="9.5"
            fill="#D9D9D9"
            className={merge(styles.bubble, styles.bubble8)}
          />
        </svg>
      </button>
    </>
  );
};
