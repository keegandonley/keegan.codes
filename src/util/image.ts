import { ImageProps } from "next/image";
import imageMetadata from "../image-metadata.json";

interface ImageMetadata {
  blurHash: string;
  width: number;
  height: number;
  dataUrl: string;
}

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
