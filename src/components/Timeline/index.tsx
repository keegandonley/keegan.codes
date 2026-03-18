import Link from 'next/link';
import styles from './timeline.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faDice,
  faForward,
  faMagicWandSparkles,
} from '@keegandonley/pro-solid-svg-icons';
import { merge } from '@/util/classNames';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { BUCKET_URL } from '@/util/r2';
import { parseToProps } from '@/util/image';
import { formatDate } from '@/util/date';
import {
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

  const [previousPost, nextPost, tagsPosts] = await Promise.all([
    getPreviousPostForSlug(slug),
    getNextPostForSlug(slug),
    getPostsForTags(tags ?? []),
  ]);

  const isAlone = !previousPost?.slug || !nextPost?.slug;

  let randomPost: any;

  if (isAlone) {
    randomPost = await getRandomPostForSlug(slug);
  }

  const remainder = randomPost ? (
    <Link
      className={merge(styles.post, isAlone ? styles.single : '')}
      href={randomPost.slug}
    >
      <div className={styles.blurContainer} />
      <div className={styles.pill}>
        <div className={styles.pillInner}>
          <FontAwesomeIcon icon={faDice} />
          &nbsp;&nbsp;something random
        </div>
      </div>
      <span className={merge(styles.postTitle, styles.random)}>
        <h4>{randomPost.title}</h4>
      </span>
      <p>{randomPost.description}</p>
      <div className={styles.metadataWrapper}>
        <DynamicViewCount
          slug={slug}
          className={styles.viewCount}
          fixedCount={randomPost.viewCount}
        />
        <p className={styles.metadata}>
          {formatDate(new Date(randomPost.published))}
        </p>
      </div>
      <Image
        src={`${BUCKET_URL}/${randomPost.cover}`}
        alt={randomPost.title}
        fill
        {...parseToProps(randomPost.metadata)}
        sizes={
          isAlone
            ? `(max-width: 700px) 100vw, 50vw`
            : `(max-width: 600px) 100vw, 50vw`
        }
      />
    </Link>
  ) : null;

  const filteredTagsPosts = tagsPosts.filter(
    (p: Post) =>
      p.slug !== previousPost?.slug &&
      p.slug !== nextPost?.slug &&
      p.slug !== randomPost?.slug &&
      p.slug !== slug,
  );

  return (
    <>
      <h3 className={styles.heading}>Further Reading</h3>
      <div className={styles.timelineWrapper}>
        {filteredTagsPosts
          .slice(0, 2)
          .map((p: Post & { viewCount: number; metadata?: ImageMetadata }) => {
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
                    <FontAwesomeIcon icon={faMagicWandSparkles} />
                    &nbsp;&nbsp;related post
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
                  sizes={
                    isAlone
                      ? `(max-width: 700px) 100vw, 50vw`
                      : `(max-width: 600px) 100vw, 50vw`
                  }
                />
              </Link>
            );
          })}

        {nextPost?.slug ? (
          <Link
            className={merge(styles.post, isAlone ? styles.single : '')}
            href={nextPost.slug}
          >
            <div className={styles.blurContainer} />
            <div className={styles.pill}>
              <div className={styles.pillInner}>
                <FontAwesomeIcon icon={faForward} />
                &nbsp;&nbsp;newer post
              </div>
            </div>
            <span className={styles.postTitle}>
              <h4>{nextPost.title}</h4>
            </span>
            <p>{nextPost.description}</p>
            <div className={styles.metadataWrapper}>
              <DynamicViewCount
                slug={slug}
                className={styles.viewCount}
                fixedCount={nextPost.viewCount}
              />
              <p className={styles.metadata}>
                {formatDate(new Date(nextPost.published))}
              </p>
            </div>
            <Image
              src={`${BUCKET_URL}/${nextPost.cover}`}
              alt={nextPost.title}
              fill
              {...parseToProps(nextPost.metadata)}
              sizes={
                isAlone
                  ? `(max-width: 700px) 100vw, 50vw`
                  : `(max-width: 600px) 100vw, 50vw`
              }
            />
          </Link>
        ) : null}
        {previousPost?.slug ? (
          <Link
            className={merge(styles.post, isAlone ? styles.single : '')}
            href={previousPost.slug}
          >
            <div className={styles.blurContainer} />
            <div className={styles.pill}>
              <div className={styles.pillInner}>
                <FontAwesomeIcon icon={faBackward} />
                &nbsp;&nbsp;older post
              </div>
            </div>
            <span className={styles.postTitle}>
              <h4>{previousPost.title}</h4>
            </span>
            <p>{previousPost.description}</p>
            <div className={styles.metadataWrapper}>
              <DynamicViewCount
                slug={slug}
                className={styles.viewCount}
                fixedCount={previousPost.viewCount}
              />
              <p className={styles.metadata}>
                {formatDate(new Date(previousPost.published))}
              </p>
            </div>
            <Image
              src={`${BUCKET_URL}/${previousPost.cover}`}
              alt={previousPost.title}
              fill
              {...parseToProps(previousPost.metadata)}
              sizes={
                isAlone
                  ? `(max-width: 700px) 100vw, 50vw`
                  : `(max-width: 600px) 100vw, 50vw`
              }
            />
          </Link>
        ) : null}
        {remainder}
      </div>
    </>
  );
};

export default Timeline;
