import { getComponentForKey, getKey } from '@/app/blog/util';
import styles from './postModal.module.css';
import { notFound } from 'next/navigation';
import { getImageMetadata, parseSource, parseToProps } from '@/util/image';
import Image from 'next/image';
import { BottomFade } from '@/components/BottomFade';
import { BUCKET_URL } from '@/util/r2';
import { PostHeader } from '../PostHeader';

interface PostModalProps {
  slug: string;
  wordCount: number;
}

export const PostModal = ({ slug, wordCount }: PostModalProps) => {
  const componentKey = getKey({ slug });

  if (!componentKey) {
    notFound();
  }

  const found = getComponentForKey({ key: componentKey });

  const Component = found.default;
  const title = found.title;
  const cover = found.cover;
  const metadata = getImageMetadata(parseSource(cover)[0]);

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
          />
        ) : null}
        <BottomFade />
      </div>
      <div className={styles.bg}>
        <article className={styles.article}>
          <PostHeader
            slug={slug}
            title={title}
            location="modal"
            wordCount={wordCount}
          />
          <Component />
        </article>
      </div>
    </>
  );
};
