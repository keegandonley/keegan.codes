import { MDXEntryRow } from '@/components/MDXEntryRow';
import Posts from '@/posts';
import styles from '../../blog.module.css';
import { AnimatedGraph } from '@/components/AnimatedGraph';
import { Delay } from '@/components/Delay';
import wordCounts from '../../../../../post-word-counts.json';
import { Post } from '@/types/post';
import tagPageStyles from './tagPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@keegandonley/pro-solid-svg-icons';
import Link from 'next/link';
import { getIsLikelyMobile } from '@/util/userAgent';
import { getImageMetadata } from '@/util/image';
import { Metadata } from 'next';
import { BASEURL, NAME } from '@/metadata';
import { commentCountsEnabled } from '@/components/Comments/util';

interface BlogTagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata(
  props: BlogTagPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);
  const title = `${decodedTag} · Blog · ${NAME}`;
  const description = `Blog posts tagged "${decodedTag}" by Keegan Donley`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASEURL}/blog/tag/${params.tag}`,
      siteName: NAME,
      locale: 'en_US',
      authors: ['Keegan Donley'],
      images: [
        {
          url: `/api/og/page?page=blog&width=1200&height=630`,
          width: 1200,
          height: 630,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@keegandonley',
      images: [`/api/og/page?page=blog&width=1200&height=630`],
    },
    alternates: {
      canonical: `${BASEURL}/blog/tag/${params.tag}`,
    },
  };
}

export default async function BlogTagPage(props: BlogTagPageProps) {
  const params = await props.params;

  const decodedTag = decodeURIComponent(params.tag);

  const [isLikelyMobile, commentsEnabled] = await Promise.all([
    getIsLikelyMobile(),
    commentCountsEnabled(),
  ]);

  const posts = Object.keys(Posts)
    .map((key) => {
      const component = (Posts as any)[key] as Post;
      return {
        title: component.title,
        slug: component.slug,
        tags: component.tags ?? [],
        description: component.description,
        cover: component.cover,
        published: component.published,
        wordCount: (wordCounts as Record<string, number>)[component.slug],
      };
    })
    .filter((p) => {
      return p.tags
        .map((t) => t.toLowerCase())
        .includes(decodedTag.toLowerCase());
    });

  return (
    <>
      <div className={tagPageStyles.container}>
        <Link href={`/blog`} className={tagPageStyles.button}>
          <span className={tagPageStyles.text}>{decodedTag}</span>
          <span className={tagPageStyles.iconWrapper}>
            <FontAwesomeIcon icon={faTimes} className={tagPageStyles.icon} />
          </span>
        </Link>
      </div>
      <section>
        <div className={styles.wrapper}>
          {posts
            .sort((a, b) => {
              if (!a.published || !b.published) {
                return 0;
              }
              return b.published.getTime() - a.published.getTime();
            })
            .map((post, index) => {
              const metadata = getImageMetadata(post.cover);

              return (
                <MDXEntryRow
                  key={post.slug}
                  index={index}
                  showViewCount
                  showCommentCount={commentsEnabled}
                  isLikelyMobile={isLikelyMobile}
                  {...post}
                  imageMetadata={metadata}
                />
              );
            })}
          <MDXEntryRow
            key="extra-1"
            index={-1}
            filler
            isLikelyMobile={isLikelyMobile}
          />
          <MDXEntryRow
            key="extra-2"
            index={-1}
            filler
            isLikelyMobile={isLikelyMobile}
          />
          <MDXEntryRow
            key="extra-3"
            index={-1}
            filler
            isLikelyMobile={isLikelyMobile}
          />
        </div>
      </section>
      <Delay>
        <AnimatedGraph />
      </Delay>
    </>
  );
}
