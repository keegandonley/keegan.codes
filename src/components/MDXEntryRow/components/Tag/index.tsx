import styles from "./tag.module.css";

interface TagProps {
  tag: string;
}

export const Tag = ({ tag }: TagProps) => {
  return <span className={styles.tag}>{tag}</span>;
};
