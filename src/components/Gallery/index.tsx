import { Suspense } from "react";
import GalleryRenderer from "./ServerRenderer";

interface GalleryProps {
  gallery: string;
}

export const Gallery = ({ gallery }: GalleryProps) => {
  return (
    <Suspense fallback={<div>Loading gallery</div>}>
      <GalleryRenderer gallery={gallery} />
    </Suspense>
  );
};
