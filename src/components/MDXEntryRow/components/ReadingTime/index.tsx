import { getReadingTime } from "@/util/content";
import styles from "./readingtime.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/pro-solid-svg-icons";

interface ReadingTimeProps {
  wordCount?: number;
}

export const ReadingTime = ({ wordCount }: ReadingTimeProps) => {
  const readingTime = getReadingTime(wordCount);

  return readingTime ? (
    <p className={styles.readingTime}>
      <FontAwesomeIcon
        icon={faStopwatch}
        className={styles.sectionIcon}
        fixedWidth
      />
      ~{readingTime} min read
    </p>
  ) : null;
};
