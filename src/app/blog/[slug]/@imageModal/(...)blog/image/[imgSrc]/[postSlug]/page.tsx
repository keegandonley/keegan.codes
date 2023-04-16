import { ImageModal } from "@/components/ImageModal";

interface ImageModalPageProps {
  params: {
    imgSrc: string;
    postSlug: string;
  };
}

export default async function ImageModalPage({ params }: ImageModalPageProps) {
  const data = await fetch(
    `http://localhost:3000/api/img/metadata?id=${encodeURIComponent(
      params.imgSrc
    )}`
  );

  const json = await data.json();

  const metadata: ImageMetadata = json.metadata;
  return <ImageModal src={params.imgSrc} metadata={metadata} />;
}
