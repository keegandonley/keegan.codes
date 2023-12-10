import { ImageProps } from "next/image";
import imageMetadata from "../image-metadata.json";
import bookCoverMetadata from "../book-cover-metadata.json";

export const getImageMetadata = (image?: string) => {
  if (typeof window !== "undefined") {
    throw new Error("getImageMetadata should only be called on the server");
  }
  const metadata = image
    ? (imageMetadata as Record<string, ImageMetadata>)[image]
    : undefined;

  return metadata;
};

export const getBookCoverMetadata = (image?: string) => {
  if (typeof window !== "undefined") {
    throw new Error("getBookCoverMetadata should only be called on the server");
  }
  const metadata = image
    ? (bookCoverMetadata as Record<string, ImageMetadata>)[image]
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
