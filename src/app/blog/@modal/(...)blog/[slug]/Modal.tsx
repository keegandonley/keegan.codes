"use client";
import { useEffect, useState } from "react";
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
    setTimeout(() => setFadedIn(true), 100);
  }, []);

  return (
    <div
      className={merge(styles.wrapper, fadedIn ? styles.fadeIn : "")}
      onClick={router.back}
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
