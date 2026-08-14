import Posts from '@/posts';
import { Post } from '@/types/post';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

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

export function generateStaticParams() {
  return posts.flatMap((post) =>
    (post.shortCodes ?? []).map((shortCode) => ({ shortCode })),
  );
}

const ShortCodeRedirect = async ({ params }: ShortCodePageProps) => {
  const { shortCode } = await params;

  const foundPost = posts.find((post) => post.shortCodes?.includes(shortCode));

  if (foundPost?.slug) {
    redirect(`/blog/${foundPost.slug}`);
  }

  return redirect(`/routing-error?slug=${shortCode}&type=shortcode`);
};

export default function ShortCodePage(props: ShortCodePageProps) {
  return (
    <Suspense fallback={null}>
      <ShortCodeRedirect params={props.params} />
    </Suspense>
  );
}
