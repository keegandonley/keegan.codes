import { getAllPosts } from '@/app/blog/util';
import { notFound, redirect } from 'next/navigation';

export const instant = false;

const posts = getAllPosts();

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

export default async function ShortCodePage(props: ShortCodePageProps) {
  const { shortCode } = await props.params;

  const foundPost = posts.find((post) => post.shortCodes?.includes(shortCode));

  if (foundPost?.slug) {
    redirect(`/blog/${foundPost.slug}`);
  }

  notFound();
}
