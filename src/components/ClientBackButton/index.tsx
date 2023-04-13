"use client";
import styles from "./clientBackButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons/faArrowLeft";
import { useBackToBlog } from "@/hooks/useBackToBlog";

export const ClientBackButton = () => {
  const handleBack = useBackToBlog();

  return (
    <span className={styles.back} onClick={handleBack}>
      <FontAwesomeIcon icon={faArrowLeft} /> back
    </span>
  );
};
