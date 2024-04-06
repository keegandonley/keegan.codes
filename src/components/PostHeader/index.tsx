import { Cheers } from '../Cheers';
import { ReadingTime } from '../MDXEntryRow/components/ReadingTime';
import { H1 } from '../Post/Heading/H1';
import styles from './postHeader.module.css';
import dynamic from 'next/dynamic';

const DynamicViewCount = dynamic(() => import('@/components/ViewCount'));

interface PostHeaderProps {
  title: string;
  slug: string;
  location: 'modal' | 'blog';
  wordCount: number;
}

export const PostHeader = ({
  title,
  slug,
  location,
  wordCount,
}: PostHeaderProps) => {
  return (
    <div className={styles.topSection}>
      <H1 className={styles.title}>{title}</H1>
      <div className={styles.metadata}>
        <div className={styles.cheersWrapper}>
          <Cheers slug={slug} location={location} />
        </div>
        <div className={styles.subItems}>
          <ReadingTime wordCount={wordCount} className={styles.readingTime} />
          <DynamicViewCount slug={slug} className={styles.viewCount} />
        </div>
      </div>
    </div>
  );
};
