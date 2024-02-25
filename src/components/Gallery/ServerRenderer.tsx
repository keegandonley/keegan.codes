import { Gallery } from "@/types/galleries";
import dynamic from "next/dynamic";

const DynamicClientRenderer = dynamic(() => import("./ClientRenderer"));

interface GalleryProps {
  gallery: string;
}

const active = 1;

export default async function GalleryRenderer({ gallery }: GalleryProps) {
  const data = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3561"
        : "https://keegan.codes"
    }/api/gallery?gallery=${gallery}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    }
  );

  const parsed = (await data.json()) as { gallery: Gallery; bucket: string };

  return (
    <DynamicClientRenderer
      parsedGallery={parsed.gallery}
      bucket={parsed.bucket}
    />
  );
}
