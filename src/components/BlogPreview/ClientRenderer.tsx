'use client';
import { Post } from '@/types/post';
import { merge } from '@/util/classNames';
import { useState } from 'react';
import styles from './blogPreview.module.css';
import Image from 'next/image';
import { BUCKET_URL } from '@/util/r2';
import { parseToProps } from '@/util/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@keegandonley/pro-solid-svg-icons';
import { formatDate } from '@/util/date';

interface PostWithMetadata extends Post {
  metadata?: ImageMetadata;
}

interface ClientRendererProps {
  posts: PostWithMetadata[];
}

export const ClientRenderer = ({ posts }: ClientRendererProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={merge(styles.outer)}>
      <div className={styles.controls}>
        <FontAwesomeIcon
          className={styles.control}
          icon={faArrowCircleLeft}
          onClick={() => {
            setActiveIndex((activeIndex - 1 + posts.length) % posts.length);
          }}
        />
        <FontAwesomeIcon
          className={styles.control}
          icon={faArrowCircleRight}
          onClick={() => {
            setActiveIndex((activeIndex + 1) % posts.length);
          }}
        />
      </div>
      <div className={styles.wrapper}>
        {posts.map((post, postIndex) => {
          const metadata = post.metadata;
          let resultWidth = 600;
          if (metadata) {
            const ratio = metadata.width / metadata.height;
            const desiredHeight = 480;
            resultWidth = desiredHeight * ratio;
          }

          return (
            <Link
              key={post.slug}
              className={merge(
                styles.imageParent,
                postIndex === activeIndex && styles.active,
                styles.sliderElement,
              )}
              onMouseOver={() => setActiveIndex(postIndex)}
              href={`/blog/${post.slug}`}
            >
              <span className={styles.text}>
                <div className={styles.inner}>
                  <h1>{post.title}</h1>
                  <p className={styles.metadata}>
                    {formatDate(post.published)}
                  </p>
                  <p className={styles.description}>{post.description}</p>
                </div>
              </span>
              <Image
                src={`${BUCKET_URL}/${post.cover}`}
                alt="todo"
                fill
                sizes={`(max-width: 1000px) 100vw, ${resultWidth}px`}
                {...parseToProps(post.metadata)}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
