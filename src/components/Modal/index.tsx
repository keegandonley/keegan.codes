"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { merge } from "@/util/classNames";
import { useRouter } from "next/navigation";

const stopEvent = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
};

interface ModalProps {
  children: any;
}

export const Modal = ({ children }: ModalProps) => {
  const [fadedIn, setFadedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("lockScroll");
    setTimeout(() => setFadedIn(true), 0);
  }, []);

  const handleBack = useCallback(() => {
    document.body.classList.remove("lockScroll");
    router.back();
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
        {children}
      </div>
    </div>
  );
};
