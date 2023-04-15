"use client";
import styles from "./clientBackButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons/faArrowLeft";
import { merge } from "@/util/classNames";

interface ClientBackButtonProps {
  onClick?: () => void;
  className?: string;
}

export const ClientBackButton = ({
  onClick,
  className,
}: ClientBackButtonProps) => {
  return (
    <span className={merge(styles.back, className)} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} /> back
    </span>
  );
};
