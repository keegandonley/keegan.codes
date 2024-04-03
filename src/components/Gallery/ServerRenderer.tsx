import { Gallery } from "@/types/galleries";
import { getFullyQualifiedDeploymentUrl } from "@/util/deployment";
import dynamic from "next/dynamic";

const DynamicClientRenderer = dynamic(() => import("./ClientRenderer"));

interface GalleryProps {
  gallery: string;
}

export default async function GalleryRenderer({ gallery }: GalleryProps) {
  const { url, headers } = await getFullyQualifiedDeploymentUrl(
    `/api/gallery?gallery=${gallery}`
  );

  const data = await fetch(url, {
    next: {
      revalidate: 60 * 60,
    },
    headers,
  });

  const parsed = (await data.json()) as { gallery: Gallery; bucket: string };

  return (
    <DynamicClientRenderer
      parsedGallery={parsed.gallery}
      bucket={parsed.bucket}
    />
  );
}
