import { ImageProps } from "next/image";
import imageMetadata from "../image-metadata.json";

export const getImageMetadata = (image?: string) => {
  const metadata = image
    ? (imageMetadata as Record<string, ImageMetadata>)[image]
    : undefined;

  return metadata;
};

export const parseToProps = (metadata?: ImageMetadata): Partial<ImageProps> => {
  if (!metadata) {
    return {};
  }

  return {
    placeholder: "blur",
    blurDataURL: metadata.dataUrl,
  };
};

export const parseSource = (src: string): [string, string[]] => {
  const [imgUrl, ...flags] = src.split("?");

  return [imgUrl, flags];
};
