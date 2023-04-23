import { Suspense } from "react";
import GalleryRenderer from "./ServerRenderer";

const Component = GalleryRenderer as any;

interface GalleryProps {
  gallery: string;
}

export const Gallery = ({ gallery }: GalleryProps) => {
  return (
    <Suspense fallback={<div>Loading gallery</div>}>
      <Component gallery={gallery} />
    </Suspense>
  );
};
