"use client";
import { merge } from "@/util/classNames";
import styles from "./slideControls.module.css";
import {
  faChevronLeft,
  faChevronRight,
  faExpand,
  faFlagCheckered,
  faPipe,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect } from "react";

export const SlideControls = () => {
  const handleGoBack = useCallback(() => {}, []);
  const handleGoForward = useCallback(() => {}, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleGoBack();
      } else if (e.key === "ArrowRight") {
        handleGoForward();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleGoBack, handleGoForward]);

  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon
        icon={faChevronLeft}
        className={merge(styles.button)}
        onClick={handleGoBack}
      />
      <FontAwesomeIcon
        icon={faChevronRight}
        className={merge(styles.button)}
        onClick={handleGoForward}
      />
      <FontAwesomeIcon icon={faPipe} className={styles.divider} />
      <FontAwesomeIcon icon={faExpand} className={merge(styles.button)} />
      <FontAwesomeIcon
        icon={faFlagCheckered}
        className={merge(styles.button)}
      />
    </div>
  );
};
