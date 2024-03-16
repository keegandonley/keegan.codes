import { TimelineEntry as TimelineEntryType } from "@/types/timeline";
import styles from "./timelineEntry.module.css";
import { PostPreview } from "../PostPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/pro-solid-svg-icons";

interface TimelineEntryProps {
  entry: TimelineEntryType;
}

export const TimelineEntry = async (props: TimelineEntryProps) => {
  const { entry } = props;
  const { slug, ts } = entry;

  return (
    <div className={styles.wrapper}>
      <div className={styles.node}>
        <div className={styles.ts}>
          <span>{new Date(ts).toLocaleDateString()}</span>-
          <span>{new Date(ts).toLocaleTimeString()}</span>
        </div>
        <FontAwesomeIcon className={styles.glyph} icon={faClock} />
      </div>
      <div className={styles.preview}>
        <PostPreview slug={slug} />
      </div>
    </div>
  );
};
