import Link from 'next/link';
import { Suspense } from 'react';
import styles from './postPreview.module.css';
import { merge } from '@/util/classNames';
import dynamic from 'next/dynamic';
import { formatDate } from '@/util/date';
import Image from 'next/image';
import { BUCKET_URL } from '@/util/r2';
import { parseToProps } from '@/util/image';
import { getFullyQualifiedDeploymentUrl } from '@keegancodes/foundations-next';
import { captureException } from '@sentry/nextjs';

const DynamicViewCount = dynamic(() => import('@/components/ViewCount'));

interface PostPreviewProps {
  slug: string;
}

export const PostPreviewRenderer = async (props: PostPreviewProps) => {
  const { slug } = props;

  const { url, headers } = await getFullyQualifiedDeploymentUrl(
    `/api/posts/single?slug=${slug}`,
  );

  let post;

  try {
    post = await (await fetch(url, { headers })).json();
  } catch (ex) {
    captureException(ex);
  }

  if (!post) {
    return null;
  }

  return (
    <div>
      <Link className={merge(styles.post, styles.single)} href={post.slug}>
        <div className={styles.text}>
          <span className={merge(styles.postTitle, styles.random)}>
            <h4>{post.title}</h4>
          </span>
          <p>{post.description}</p>
          <div className={styles.metadataWrapper}>
            <DynamicViewCount
              slug={slug}
              className={styles.viewCount}
              fixedCount={post.viewCount}
            />
            <p className={styles.metadata}>
              {formatDate(new Date(post.published))}
            </p>
          </div>
        </div>
        <Image
          src={`${BUCKET_URL}/${post.cover}`}
          alt="todo"
          fill
          {...parseToProps(post.metadata)}
        />
      </Link>
    </div>
  );
};

export const PostPreview = (props: PostPreviewProps) => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: '100%',
            height: '140px',
            marginBottom: '2rem',
          }}
        />
      }
    >
      <PostPreviewRenderer slug={props.slug} />
    </Suspense>
  );
};
