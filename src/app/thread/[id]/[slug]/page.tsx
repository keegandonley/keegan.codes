import { PostPreview } from '@/components/PostPreview';
import dynamic from 'next/dynamic';
import styles from './thread.module.css';
import { Footer } from '@/components/Footer';
import { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/app/blog/util';
import { notFound } from 'next/navigation';
import { BASEURL, NAME } from '@/metadata';

export const instant = false;

const Comments = dynamic(
  () => import('@/components/Comments').then((mod) => mod.Comments),
  {
    loading: () => (
      <div
        style={{
          height: '500px',
        }}
      />
    ),
  },
);

interface ThreadPageProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllPosts()
    .filter((post) => post.bskyThreadId)
    .map((post) => ({ id: post.bskyThreadId as string, slug: post.slug }));
}

export async function generateMetadata(
  props: ThreadPageProps,
): Promise<Metadata> {
  const params = await props.params;

  const found = getPostBySlug(params.slug);

  if (found) {
    return {
      title: `Discussion · ${found.title} · ${NAME}`,
      description: found.description,
      openGraph: {
        title: `Discussion · ${found.title}`,
        description: found.description,
        url: `${BASEURL}/thread/${found.bskyThreadId}/${params.slug}`,
        siteName: NAME,
        locale: 'en_US',
        authors: ['Keegan Donley'],
        images: [
          {
            url: `/api/og/thread?slug=${params.slug}&width=1200&height=630`,
            width: 1200,
            height: 630,
            type: 'image/png',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Discussion · ${found.title}`,
        description: found.description,
        creator: '@keegandonley',
        images: [`/api/og/thread?slug=${params.slug}&width=1200&height=630`],
      },
      alternates: {
        canonical: `${BASEURL}/blog/${params.slug}`,
      },
      robots: {
        index: false,
      },
    };
  }

  return {
    title: NAME,
    robots: {
      index: false,
    },
  };
}

export default async function ThreadPage(props: ThreadPageProps) {
  const { id, slug } = await props.params;

  if (getPostBySlug(slug)?.bskyThreadId !== id) {
    notFound();
  }

  return (
    <div>
      <div className={styles.postWrapper}>
        <PostPreview slug={slug} />
      </div>
      <Comments threadId={id} slug={slug} hideExpand />
      <Footer />
    </div>
  );
}
