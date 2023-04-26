import { BookContent } from "@/components/BookContent";

export const runtime = "experimental-edge";

interface LibraryPageProps {
  params: {
    slug: string;
  };
}

export default function LibrarySlugPage({ params }: LibraryPageProps) {
  return <BookContent slug={params.slug} />;
}
