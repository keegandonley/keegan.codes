"use client";

import { Gallery } from "@/types/galleries";
import styles from "./gallery.module.css";
import { merge } from "@/util/classNames";
import { useState } from "react";
import Image from "next/image";
import { parseToProps } from "@/util/image";

interface ClientRendererProps {
  parsedGallery: Gallery;
  bucket: string;
}

export default function ClientRenderer({
  parsedGallery,
  bucket,
}: ClientRendererProps) {
  const [active, setActive] = useState(1);

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
            onClick={() => setActive(index)}
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
