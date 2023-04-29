"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { merge } from "@/util/classNames";
import { useRouter } from "next/navigation";
import { ClientBackButton } from "../ClientBackButton";

const stopEvent = (e: any) => {
  e.stopPropagation();
};

interface ModalProps {
  children: any;
}

export const Modal = ({ children }: ModalProps) => {
  const [fadedIn, setFadedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("lockScroll");
    setFadedIn(true);
  }, []);

  const handleBack = useCallback(() => {
    document.body.classList.remove("lockScroll");
    setFadedIn(false);
    setTimeout(router.back, 400);
  }, [router]);

  return (
    <div
      className={merge(styles.wrapper, fadedIn ? styles.fadeIn : "")}
      onClick={handleBack}
    >
      <div
        className={merge(styles.inner, fadedIn ? styles.fadeIn : "")}
        onClick={stopEvent}
      >
        <ClientBackButton className={styles.backButton} onClick={handleBack} />
        {children}
      </div>
    </div>
  );
};
