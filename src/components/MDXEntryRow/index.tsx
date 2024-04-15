import { ElementBaseProps } from '@/types/elements';
import Link from 'next/link';
import styles from './mdxEntryRow.module.css';
import Image from 'next/image';
import { BOOK_BUCKET_URL, BUCKET_URL } from '@/util/r2';
import { parseToProps } from '@/util/image';
import { merge } from '@/util/classNames';
import { Date } from './components/Date';
import { Tags } from './components/Tags';
import { ReadingTime } from './components/ReadingTime';
import dynamic from 'next/dynamic';

const DynamicViewCount = dynamic(() => import('@/components/ViewCount'));

interface MDXEntryRowProps extends ElementBaseProps {
  title?: string;
  slug?: string;
  tags?: string[];
  description?: string;
  cover?: string;
  published?: Date;
  index: number;
  filler?: boolean;
  wordCount?: number;
  book?: boolean;
  columns?: number;
  showViewCount?: boolean;
  isLikelyMobile: boolean;
  className?: string;
  fixedViewCount?: number;
  loader?: boolean;
  imageMetadata?: ImageMetadata;
}

export const MDXEntryRow = ({
  title,
  slug,
  tags,
  description,
  cover,
  published,
  index,
  filler,
  wordCount,
  book,
  columns = 3,
  showViewCount = false,
  isLikelyMobile,
  className,
  fixedViewCount,
  loader,
  imageMetadata,
}: MDXEntryRowProps) => {
  const metadata = imageMetadata;

  const Parent = slug ? Link : 'div';
  let resultWidth = 500;
  if (metadata) {
    const ratio = metadata.width / metadata.height;
    const desiredHeight = 250;
    resultWidth = desiredHeight * ratio;
  }

  return (
    <div
      className={merge(
        styles.wrapper,
        filler && !loader ? styles.filler : '',
        styles[`col-${columns}`],
        className,
        'animate-viz',
        loader ? styles.wrapperLoading : '',
      )}
    >
      <div className={styles.horizontalLine}></div>
      <div className={styles.verticalLine}></div>
      <Parent
        href={`/${book ? 'library' : 'blog'}/${slug}`}
        className={merge(styles.a, loader ? styles.loader : '')}
      >
        {cover && !loader ? (
          <div className={merge(styles.imageParent, book && styles.book)}>
            <Image
              src={`${book ? BOOK_BUCKET_URL : BUCKET_URL}/${cover}`}
              alt="todo"
              fill
              sizes={`(max-width: 550px) 100vw, (max-width: 900px) 50vw, ${resultWidth}px`}
              // Rough guess at which images are above the fold
              priority={isLikelyMobile ? index < 2 : index < 4}
              {...parseToProps(metadata)}
            />
          </div>
        ) : loader ? (
          <div className={merge(styles.imageParent, book && styles.book)}>
            <Image
              src={`${BUCKET_URL}/loading-cover.png`}
              alt="Loading image placeholder"
              fill
              sizes={`(max-width: 550px) 100vw, (max-width: 900px) 50vw, ${resultWidth}px`}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIABwAMgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APWKgu7lLS3aaQ4VRmp6xvE8qRaPIzglcc0m7K4HOt8QI5r820CZwcZpLrx2bGYLLHkGuHW6sftQa2Qq+eSaW/tl1HBSYBvespVG5Rkk1G34nQ4qFNcy949i0fV4dXtRNEevUVo1wnw9t5LWGSJ5N4ru61jJSV0c6v1CiloxTASszXrY3Wlyxqu4kdK06CARzSaurAeMSaM8IIMJV8+lY91Y3v2oJAj/AICvd5LG3lOXiUn6VGul2aNuEC59cVeF5aEZRave45Sm2pX1RzngbTbizsS9wCHb1rr6RVVBhQAKWoSUVZA227sKKKKYj//Z"
            />
          </div>
        ) : (
          <div className={styles.imageParent}></div>
        )}
        {!filler ? (
          <div className={styles.content}>
            <h1 className={styles.h1}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <div className={styles.metadata}>
              {published ? <Date date={published} /> : false}
              <ReadingTime wordCount={wordCount} />
            </div>
            {slug && (showViewCount || fixedViewCount) && (
              <DynamicViewCount
                slug={slug}
                className={styles.viewCount}
                fixedCount={fixedViewCount}
              />
            )}
            {tags && tags.length > 0 ? <Tags tags={tags} /> : false}
          </div>
        ) : loader ? (
          <div className={styles.content}>
            <h1 className={merge(styles.h1, styles.placeholder)}>
              I&apos;ll be Right There
            </h1>
            <p className={styles.description}>
              Hang tight while this awesome blog post is downloaded!
              Shouldn&apos;t be long now...
            </p>
          </div>
        ) : null}
      </Parent>
      {filler ? <div className={styles.borderFade} /> : false}
    </div>
  );
};
