import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "../Tag";
import styles from "./tags.module.css";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";

interface TagsProps {
  tags: string[];
}

export const Tags = ({ tags }: TagsProps) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => {
        return <Tag tag={tag} key={tag} />;
      })}
      <FontAwesomeIcon icon={faCircle} className={styles.icon} />
      <div className={styles.borderFade} />
    </div>
  );
};
