import { faCalendar } from '@fortawesome/pro-solid-svg-icons';
import styles from './date.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate } from '@/util/date';

interface DateProps {
  date?: Date;
}

export const Date = ({ date }: DateProps) => {
  return (
    <p className={styles.date}>
      <FontAwesomeIcon
        icon={faCalendar}
        fixedWidth
        className={styles.sectionIcon}
      />{' '}
      {formatDate(date)}
    </p>
  );
};
