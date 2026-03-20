import Link from 'next/link';
import styles from './timeline.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faClock,
  faDice,
  faForward,
  faMagicWandSparkles,
  IconDefinition,
} from '@keegandonley/pro-solid-svg-icons';
import { merge } from '@/util/classNames';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { BUCKET_URL } from '@/util/r2';
import { parseToProps } from '@/util/image';
import { formatDate } from '@/util/date';
import {
  getLatestPosts,
  getNextPostForSlug,
  getPostsForTags,
  getPreviousPostForSlug,
  getRandomPostForSlug,
} from '@/util/post';
import { Post } from '@/types/post';

const DynamicViewCount = dynamic(() => import('@/components/ViewCount'));

interface TimelineProps {
  slug: string;
  tags?: string[];
}

const Timeline = async (props: TimelineProps) => {
  const { slug, tags } = props;

  const [previousPost, nextPost, tagsPosts, randomPost, latestPost] =
    await Promise.all([
      getPreviousPostForSlug(slug),
      getNextPostForSlug(slug),
      getPostsForTags(tags ?? []),
      getRandomPostForSlug(slug),
      getLatestPosts(1).then((posts) => posts[0]),
    ]);

  const filteredTagsPosts = tagsPosts.filter(
    (p: Post) =>
      p.slug !== previousPost?.slug &&
      p.slug !== nextPost?.slug &&
      p.slug !== randomPost?.slug &&
      p.slug !== slug,
  );

  const timelinePosts: (Post & { label: string; icon: IconDefinition } & {
    viewCount: number;
    metadata?: ImageMetadata;
  })[] = [
    ...filteredTagsPosts.slice(0, 2).map((p: any) => {
      return { ...p, label: 'related post', icon: faMagicWandSparkles };
    }),
  ];

  if (nextPost?.slug) {
    timelinePosts.push({
      ...nextPost,
      label: 'newer post',
      icon: faForward,
    });
  }

  if (previousPost?.slug) {
    timelinePosts.push({
      ...previousPost,
      label: 'older post',
      icon: faBackward,
    });
  }

  if (randomPost?.slug && timelinePosts.length < 4) {
    timelinePosts.push({
      ...randomPost,
      label: 'something random',
      icon: faDice,
    });
  }

  if (latestPost?.slug && timelinePosts.length < 4) {
    timelinePosts.unshift({
      ...latestPost,
      label: 'latest post',
      icon: faClock,
    });
  }

  return (
    <>
      <h3 className={styles.heading}>Further Reading</h3>
      <div className={styles.timelineWrapper}>
        {timelinePosts.map((p) => {
          return (
            <Link
              className={merge(
                styles.post,
                filteredTagsPosts.length === 1 ? styles.single : '',
              )}
              href={p.slug}
              key={p.slug}
            >
              <div className={styles.blurContainer} />
              <div className={styles.pill}>
                <div className={styles.pillInner}>
                  <FontAwesomeIcon icon={p.icon} />
                  &nbsp;&nbsp;{p.label}
                </div>
              </div>
              <span className={styles.postTitle}>
                <h4>{p.title}</h4>
              </span>
              <p>{p.description}</p>
              <div className={styles.metadataWrapper}>
                <DynamicViewCount
                  slug={slug}
                  className={styles.viewCount}
                  fixedCount={p.viewCount}
                />
                <p className={styles.metadata}>
                  {formatDate(new Date(p.published))}
                </p>
              </div>
              <Image
                src={`${BUCKET_URL}/${p.cover}`}
                alt={p.title}
                fill
                {...parseToProps(p.metadata)}
                sizes={`(max-width: 700px) 100vw, 50vw`}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Timeline;
