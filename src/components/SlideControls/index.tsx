"use client";
import { merge } from "@/util/classNames";
import styles from "./slideControls.module.css";
import {
  faBackwardFast,
  faChevronLeft,
  faChevronRight,
  faExpand,
  faFlagCheckered,
  faPipe,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

export const SlideControls = () => {
  const params = useParams();
  const { slide } = params ?? {};
  const slideIndex = parseInt((slide as string) ?? "0", 10);
  const pathname = usePathname();
  const slideName = pathname?.split("/")[2];
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    if (slideIndex > 0) {
      router.push(`/slides/${slideName}/${slideIndex - 1}`);
    }
  }, [router, slideIndex, slideName]);

  const handleGoForward = useCallback(() => {
    router.push(`/slides/${slideName}/${slideIndex + 1}`);
  }, [router, slideIndex, slideName]);

  const goToStart = useCallback(() => {
    router.push(`/slides/${slideName}/0`);
  }, [router, slideName]);

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

  const enterFullScreen = useCallback(() => {
    const element = document.getElementById("fullscreen-context");
    if (element?.requestFullscreen) {
      element.requestFullscreen();
    }
  }, []);

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
      <FontAwesomeIcon
        icon={faExpand}
        className={merge(styles.button)}
        onClick={enterFullScreen}
      />
      <FontAwesomeIcon icon={faPipe} className={styles.divider} />
      <FontAwesomeIcon
        icon={faBackwardFast}
        className={merge(styles.button)}
        onClick={goToStart}
      />
      <FontAwesomeIcon
        icon={faFlagCheckered}
        className={merge(styles.button)}
        onClick={goToStart}
      />
    </div>
  );
};
