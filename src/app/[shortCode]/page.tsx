import Posts from '@/posts';
import { Post } from '@/types/post';
import { redirect } from 'next/navigation';

const posts = Object.keys(Posts).map((key) => {
  const component = (Posts as any)[key] as Post;
  return {
    slug: component.slug,
    shortCodes: component.shortCodes,
  };
});

interface ShortCodePageProps {
  params: Promise<{
    shortCode: string;
  }>;
}

export default async function ShortCodePage(props: ShortCodePageProps) {
  const params = await props.params;

  const foundPost = posts.find((post) =>
    post.shortCodes?.includes(params.shortCode),
  );

  if (foundPost?.slug) {
    redirect(`/blog/${foundPost.slug}`);
  }

  return redirect(`/routing-error?slug=${params.shortCode}&type=shortcode`);
}
