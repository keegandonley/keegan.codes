import localFont from 'next/font/local';
import { Cheers } from '../Cheers';
import { ReadingTime } from '../MDXEntryRow/components/ReadingTime';
import { H1 } from '../Post/Heading/H1';
import styles from './postHeader.module.css';
import dynamic from 'next/dynamic';
import { merge } from '@keegancodes/foundations';

const DynamicViewCount = dynamic(() => import('@/components/ViewCount'));

const accentFont = localFont({
  // src: './fonts/Domine.ttf',
  src: '../../app/fonts/InstrumentSerif.ttf',
});

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
      <H1 className={merge(styles.title, accentFont.className)}>{title}</H1>
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
