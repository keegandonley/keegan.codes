"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "../Modal/util";
import { ModalBase } from "../Modal/Base";
import { useRouter } from "next/navigation";
import { BUCKET_URL } from "@/util/r2";
import styles from "./imageModal.module.css";

interface ImageModalProps {
  src: string;
  metadata: ImageMetadata;
}

export const ImageModal = ({ src, metadata }: ImageModalProps) => {
  const [fadedIn, setFadedIn] = useState(false);
  const isScrollAlreadyLocked = useRef(false);
  const router = useRouter();

  useEffect(() => {
    isScrollAlreadyLocked.current =
      document.body.classList.contains("lockScroll");
    lockScroll();
    setFadedIn(true);
  }, []);

  const handleBack = useCallback(() => {
    if (!isScrollAlreadyLocked.current) {
      unlockScroll();
    }
    setFadedIn(false);
    setTimeout(router.back, 400);
  }, [router]);

  return (
    <ModalBase
      handleBack={handleBack}
      fadedIn={fadedIn}
      innerClassName={styles.inner}
    >
      <div className={styles.imageParent} onClick={handleBack}>
        <Image
          src={`${BUCKET_URL}/${src}`}
          alt=""
          placeholder="blur"
          blurDataURL={metadata.dataUrl}
          fill
        />
      </div>
    </ModalBase>
  );
};
