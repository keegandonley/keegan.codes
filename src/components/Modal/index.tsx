"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { useRouter } from "next/navigation";
import { ClientBackButton } from "../ClientBackButton";
import { ModalBase } from "./Base";
import { lockScroll, unlockScroll } from "./util";

interface ModalProps {
  children: any;
}

export const Modal = ({ children }: ModalProps) => {
  const [fadedIn, setFadedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    lockScroll();
    setFadedIn(true);
  }, []);

  const handleBack = useCallback(() => {
    unlockScroll();
    setFadedIn(false);
    setTimeout(router.back, 400);
  }, [router]);

  return (
    <ModalBase handleBack={handleBack} fadedIn={fadedIn}>
      <ClientBackButton className={styles.backButton} onClick={handleBack} />
      {children}
    </ModalBase>
  );
};
