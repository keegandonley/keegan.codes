import { merge } from "@/util/classNames";
import imageStyles from "./image.module.css";
import Image from "next/image";
import { BUCKET_URL } from "@/util/r2";
import { getImageMetadata, parseSource } from "@/util/image";
import { fetchMetadata } from "@/util/api";

const getImageRatio = (metadata?: ImageMetadata) => {
  if (!metadata) return 1;

  return metadata.height / metadata.width;
};

export const Img = async ({
  src,
  className,
  alt,
}: {
  src: string;
  className: string;
  alt: string;
}) => {
  const [imgUrl, flags] = parseSource(src);
  const metadata = await fetchMetadata(imgUrl);
  const ratio = getImageRatio(metadata);

  const shouldHideShadow = flags.includes("hideShadow");

  if (metadata) {
    const isVertical = metadata.height > metadata.width;
    return (
      <span
        className={merge(
          imageStyles.imageParent,
          isVertical && imageStyles.vertical,
          ratio < 0.5 && imageStyles.short
        )}
        data-ratio={ratio}
        data-flags={flags.join(",")}
        data-width={metadata.width}
        data-height={metadata.height}
        data-file={imgUrl}
      >
        <Image
          src={`${BUCKET_URL}/${imgUrl}`}
          alt={alt}
          fill
          className={merge(imageStyles.img, className)}
          style={{
            filter: shouldHideShadow
              ? "none"
              : "drop-shadow(0 0 0.5rem var(--shadow-color))",
          }}
          placeholder="blur"
          blurDataURL={metadata.dataUrl}
        />
      </span>
    );
  }

  return null;
};
