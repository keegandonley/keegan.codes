import { BookContent } from '../BookContent';
import styles from './bookModal.module.css';

interface BookModalProps {
  slug: string;
  wordCount: number;
}

export const BookModal = ({ slug }: BookModalProps) => {
  return (
    <BookContent
      slug={slug}
      wrapperClassName={styles.bookModalWrapper}
      coverWrapperClassName={styles.booModalCoverWrapper}
    />
  );
};
