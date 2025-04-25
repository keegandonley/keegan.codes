import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from '../Tag';
import styles from './tags.module.css';
import { faTag } from '@keegandonley/pro-solid-svg-icons';

interface TagsProps {
  tags: string[];
}

export const Tags = ({ tags }: TagsProps) => {
  return (
    <div className={styles.tags}>
      <div>
        <FontAwesomeIcon icon={faTag} className={styles.icon} />
      </div>
      {tags.map((tag) => {
        return <Tag tag={tag} key={tag} />;
      })}
      <div className={styles.borderFade} />
    </div>
  );
};
