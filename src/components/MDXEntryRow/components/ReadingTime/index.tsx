import { getReadingTime } from '@/util/content';
import styles from './readingtime.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/pro-solid-svg-icons';
import { merge } from '@/util/classNames';

interface ReadingTimeProps {
  wordCount?: number;
  className?: string;
}

export const ReadingTime = ({ wordCount, className }: ReadingTimeProps) => {
  const readingTime = getReadingTime(wordCount);

  return readingTime ? (
    <p className={merge(styles.readingTime, className)}>
      <FontAwesomeIcon
        icon={faStopwatch}
        className={merge(styles.sectionIcon)}
        fixedWidth
      />
      ~{readingTime} min read
    </p>
  ) : null;
};
