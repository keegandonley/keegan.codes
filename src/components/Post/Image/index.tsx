import { merge } from "@/util/classNames";
import imageStyles from "./image.module.css";
import Image from "next/image";
import { BUCKET_URL } from "@/util/r2";
import { getImageMetadata } from "@/util/image";

// For now this is `any` because I can't figure out how to
// make MDX happy. TODO: fix
export const Img = ({ src, className, alt }: any) => {
  const metadata = getImageMetadata(src);
  if (metadata) {
    return (
      <span className={imageStyles.imageParent}>
        <Image
          src={`${BUCKET_URL}/${src}`}
          alt={alt}
          fill
          className={merge(imageStyles.img, className)}
        />
      </span>
    );
  }

  return null;
};
