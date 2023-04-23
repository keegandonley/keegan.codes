export interface GalleryEntry {
  title: string;
  description: string;
  alt: string;
  metadata: ImageMetadata;
  image: string;
}

export type Gallery = GalleryEntry[];
