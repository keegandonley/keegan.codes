"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons/faArrowLeft";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

// It seems we need to use router.back instead of a Link component to get the
// intercepted route to go away. Hopefully that'll change
export default function ClientBack() {
  const router = useRouter();

  const handleBack = useCallback(() => {
    document.body.classList.remove("lockScroll");
    router.back();
  }, [router]);

  return (
    <span className={styles.back} onClick={handleBack}>
      <FontAwesomeIcon icon={faArrowLeft} /> back
    </span>
  );
}
