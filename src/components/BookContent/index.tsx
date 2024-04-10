import { getComponentForKey, getKey } from '@/app/library/util';
import { getBookCoverMetadata, parseSource, parseToProps } from '@/util/image';
import { BOOK_BUCKET_URL } from '@/util/r2';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BottomFade } from '../BottomFade';
import styles from './bookContent.module.css';
import { H1 } from '../Post/Heading/H1';
import { H2 } from '../Post/Heading/H2';
import { merge } from '@/util/classNames';

interface BookContentProps {
  slug: string;
  wrapperClassName?: string;
  coverWrapperClassName?: string;
}

export const BookContent = ({
  slug,
  wrapperClassName,
  coverWrapperClassName,
}: BookContentProps) => {
  const componentKey = getKey({ slug });

  if (!componentKey) {
    notFound();
  }

  const found = getComponentForKey({ key: componentKey });

  const Component = found.default;
  const title = found.title;
  const cover = found.cover;
  const author = found.author;
  const metadata = getBookCoverMetadata(parseSource(cover)[0]);
  const headerImage = found.headerImage;
  const coverMetadata = headerImage
    ? getBookCoverMetadata(parseSource(headerImage)[0])
    : undefined;

  if (!Component) {
    notFound();
  }

  return (
    <>
      {headerImage ? (
        <div className={styles.headerWrapper}>
          {cover ? (
            <Image
              src={`${BOOK_BUCKET_URL}/${headerImage}`}
              alt="todo"
              fill
              priority
              {...parseToProps(coverMetadata)}
            />
          ) : null}
          <BottomFade />
        </div>
      ) : null}
      <div className={styles.bg}>
        <div className={merge(styles.wrapper, wrapperClassName)}>
          <aside className={styles.metadata}>
            <div className={merge(styles.coverWrapper, coverWrapperClassName)}>
              {cover ? (
                <Image
                  src={`${BOOK_BUCKET_URL}/${cover}`}
                  alt="todo"
                  fill
                  priority
                  {...parseToProps(metadata)}
                  sizes="500px"
                />
              ) : null}
            </div>
          </aside>
          <article className={styles.article}>
            <H1 className={styles.title}>{title}</H1>
            <H2 className={styles.author}>{author}</H2>
            <Component />
          </article>
        </div>
      </div>
    </>
  );
};
