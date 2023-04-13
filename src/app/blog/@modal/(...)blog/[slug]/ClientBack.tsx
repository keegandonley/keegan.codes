"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons/faArrowLeft";
import { useRouter } from "next/navigation";

// It seems we need to use router.back instead of a Link component to get the
// intercepted route to go away. Hopefully that'll change
export default function ClientBack() {
  const router = useRouter();

  return (
    <span className={styles.back} onClick={router.back}>
      <FontAwesomeIcon icon={faArrowLeft} /> back
    </span>
  );
}
