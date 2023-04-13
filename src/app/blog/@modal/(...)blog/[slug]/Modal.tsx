"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { merge } from "@/util/classNames";
import { useRouter } from "next/navigation";

const stopEvent = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
};

export default function Modal({ children }: any) {
  const [fadedIn, setFadedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("lockScroll");
    setTimeout(() => setFadedIn(true), 100);
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
}
