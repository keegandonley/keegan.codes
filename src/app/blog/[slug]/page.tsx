import styles from './blogPost.module.css';
import '../../syntax-theme.css';
import { BottomFade } from '@/components/BottomFade';
import Image from 'next/image';
import { getImageMetadata, parseSource, parseToProps } from '@/util/image';
import { BUCKET_URL } from '@/util/r2';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getComponentForKey, getKey } from '../util';
import wordCounts from '../../../post-word-counts.json';
import { BASEURL, NAME } from '@/metadata';
import { PostHeader } from '@/components/PostHeader';
import dynamic from 'next/dynamic';
import { Footer } from '@/components/Footer';

const Track = dynamic(() => import('@/components/Track'));

const Timeline = dynamic(() => import('@/components/Timeline'), {
  loading: () => (
    <div
      style={{
        height: '300px',
      }}
    />
  ),
});

const Comments = dynamic(
  () => import('@/components/Comments').then((mod) => mod.Comments),
  {
    loading: () => (
      <div
        style={{
          height: '300px',
        }}
      />
    ),
  },
);

export interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  props: BlogPageProps,
): Promise<Metadata> {
  const params = await props.params;

  const componentKey = getKey({ slug: params.slug });

  if (componentKey) {
    const found = getComponentForKey({ key: componentKey });

    return {
      title: `${found.title} · ${NAME}`,
      description: found.description,
      openGraph: {
        title: found.title,
        description: found.description,
        url: `${BASEURL}/blog/${params.slug}`,
        siteName: NAME,
        locale: 'en_US',
        authors: ['Keegan Donley'],
        images: [
          {
            url: `/api/og/post?slug=${params.slug}&width=1200&height=630`,
            width: 1200,
            height: 630,
            type: 'image/png',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: found.title,
        description: found.description,
        creator: '@keegandonley',
        images: [`/api/og/post?slug=${params.slug}&width=1200&height=630`],
      },
    };
  }

  return {
    title: NAME,
  };
}

export default async function BlogSlugPage(props: BlogPageProps) {
  const params = await props.params;

  const componentKey = getKey({ slug: params.slug });

  if (!componentKey) {
    notFound();
  }

  const found = getComponentForKey({ key: componentKey });

  const Component = found.default;
  const title = found.title;
  const cover = found.cover;
  const metadata = getImageMetadata(parseSource(cover)[0]);
  const wordCount = (wordCounts as Record<string, number>)[found.slug];
  const bskyThreadId = found.bskyThreadId;

  if (!Component) {
    notFound();
  }

  return (
    <>
      <div className={styles.coverWrapper}>
        {cover ? (
          <Image
            src={`${BUCKET_URL}/${cover}`}
            alt="todo"
            fill
            priority
            {...parseToProps(metadata)}
            quality={80}
            sizes={`(max-width: 1400px) 100vw, 1400px`}
          />
        ) : null}
        <BottomFade />
        <div className={styles.sideFade} />
        <div className={styles.diag1Fade} />
        <div className={styles.diag2Fade} />
      </div>
      <div className={styles.clip}>
        <article className={styles.article}>
          <span className={styles.headWrapper}>
            <PostHeader
              slug={params.slug}
              title={title}
              location="blog"
              wordCount={wordCount}
            />
          </span>
          <div className={styles.bodyText}>
            <Component />
          </div>
        </article>
      </div>
      <Comments threadId={bskyThreadId} />
      <footer>
        <Timeline slug={params.slug} />
        <Footer />
      </footer>
      <Track slug={params.slug} inModal={false} />
    </>
  );
}
