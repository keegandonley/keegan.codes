import { ImageModal } from "@/components/ImageModal";

interface ImageModalPageProps {
  params: {
    imgSrc: string;
    postSlug: string;
  };
}

export default async function ImageModalPage({ params }: ImageModalPageProps) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://k10y.vercel.app";
  const data = await fetch(
    `${baseUrl}/api/img/metadata?id=${encodeURIComponent(params.imgSrc)}`
  );

  const json = await data.json();

  const metadata: ImageMetadata = json.metadata;
  return <ImageModal src={params.imgSrc} metadata={metadata} />;
}
