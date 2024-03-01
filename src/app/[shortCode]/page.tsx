import Posts from "@/posts";
import { Post } from "@/types/post";
import { redirect } from "next/navigation";

const posts = Object.keys(Posts).map((key) => {
  const component = (Posts as any)[key] as Post;
  return {
    slug: component.slug,
    shortCodes: component.shortCodes,
  };
});

interface ShortCodePageProps {
  params: {
    shortCode: string;
  };
}

export const runtime = "edge";

export default async function ShortCodePage({
  params: { shortCode },
}: ShortCodePageProps) {
  const foundPost = posts.find((post) => post.shortCodes?.includes(shortCode));

  if (foundPost?.slug) {
    redirect(`/blog/${foundPost.slug}`);
  }

  return redirect(`/routing-error?slug=${shortCode}&type=shortcode`);
}
