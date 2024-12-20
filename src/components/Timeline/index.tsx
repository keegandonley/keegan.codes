import Link from 'next/link';
import styles from './timeline.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeftLong,
  faArrowRightLong,
} from '@keegandonley/pro-solid-svg-icons';
import { merge } from '@/util/classNames';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { BUCKET_URL } from '@/util/r2';
import { parseToProps } from '@/util/image';
import { formatDate } from '@/util/date';
import {
  getNextPostForSlug,
  getPreviousPostForSlug,
  getRandomPostForSlug,
} from '@/util/post';

const DynamicViewCount = dynamic(() => import('@/components/ViewCount'));

interface TimelineProps {
  slug: string;
}

const Timeline = async (props: TimelineProps) => {
  const { slug } = props;

  const [previousPost, nextPost] = await Promise.all([
    getPreviousPostForSlug(slug),
    getNextPostForSlug(slug),
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
        alt="todo"
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

  return (
    <>
      <h3 className={styles.heading}>Further Reading</h3>
      <div className={styles.timelineWrapper}>
        {previousPost?.slug ? (
          <Link
            className={merge(styles.post, isAlone ? styles.single : '')}
            href={previousPost.slug}
          >
            <div className={styles.blurContainer} />
            <span className={styles.postTitle}>
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                className={styles.arrowLeft}
              />
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
              alt="todo"
              fill
              {...parseToProps(previousPost.metadata)}
              sizes={
                isAlone
                  ? `(max-width: 700px) 100vw, 50vw`
                  : `(max-width: 600px) 100vw, 50vw`
              }
            />
          </Link>
        ) : (
          remainder
        )}
        {nextPost?.slug ? (
          <Link
            className={merge(styles.post, isAlone ? styles.single : '')}
            href={nextPost.slug}
          >
            <div className={styles.blurContainer} />
            <span className={styles.postTitle}>
              <h4>{nextPost.title}</h4>
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className={styles.arrowRight}
              />
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
              alt="todo"
              fill
              {...parseToProps(nextPost.metadata)}
              sizes={
                isAlone
                  ? `(max-width: 700px) 100vw, 50vw`
                  : `(max-width: 600px) 100vw, 50vw`
              }
            />
          </Link>
        ) : (
          remainder
        )}
      </div>
    </>
  );
};

export default Timeline;
