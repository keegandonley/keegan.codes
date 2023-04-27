"use client";
import { useCallback } from "react";
import { Gallery } from "@/types/galleries";
import styles from "./gallery.module.css";
import { merge } from "@/util/classNames";
import { useState } from "react";
import Image from "next/image";
import { parseToProps } from "@/util/image";
import va from "@vercel/analytics";

interface ClientRendererProps {
  parsedGallery: Gallery;
  bucket: string;
}

export default function ClientRenderer({
  parsedGallery,
  bucket,
}: ClientRendererProps) {
  const [active, setActive] = useState(1);

  const handleGalleryClick = useCallback((index: number) => {
    setActive(index)
    va.track("Click Gallery Image", {
      bucket,
      index,
    });
  }, [bucket]);

  return (
    <div className={styles.wrapper}>
      {parsedGallery.map((photo, index) => {
        const distanceFromActive = Math.abs(index - active);
        return (
          <div
            key={photo.image}
            className={merge(
              styles.imageParent,
              index === active && styles.active,
              styles[`distance-${distanceFromActive}`]
            )}
            onClick={() => handleGalleryClick(index)}
          >
            <Image
              src={`${bucket}/${photo.image}`}
              alt="todo"
              fill
              {...parseToProps(photo.metadata)}
            />
          </div>
        );
      })}
    </div>
  );
}
