import { redirect } from "next/navigation";

interface ImagePageProps {
  params: {
    src: string;
    slug: string;
  };
}

export default async function BlogPostImagePage({ params }: ImagePageProps) {
  return redirect(`/blog/${params.slug}`);
}
