import { merge } from "@/util/classNames";
import styles from "./proscons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScaleUnbalanced,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/pro-solid-svg-icons";

interface ProsConsProps {
  children: any;
}

export const ProsConsWrapper = ({ children }: ProsConsProps) => {
  return <div className={merge(styles.wrapper)}>{children}</div>;
};

export const ProsWrapper = ({ children }: ProsConsProps) => {
  return (
    <div className={merge(styles.pros, styles.panel)}>
      <h3>
        <FontAwesomeIcon icon={faThumbsUp} className={styles.icon} /> Pros
      </h3>
      <div>{children}</div>
    </div>
  );
};

export const ConsWrapper = ({ children }: ProsConsProps) => {
  return (
    <div className={merge(styles.cons, styles.panel)}>
      <h3>
        <FontAwesomeIcon icon={faThumbsDown} className={styles.icon} />
        Cons
      </h3>
      <div>{children}</div>
    </div>
  );
};

export const VerdictWrapper = ({
  children,
  result,
}: ProsConsProps & { result: "+" | "-" | "/" }) => {
  return (
    <div
      className={merge(
        styles.verdict,
        result === "+" ? styles.positive : "",
        result === "-" ? styles.negative : "",
        result === "/" ? styles.neutral : ""
      )}
    >
      <h3>
        <FontAwesomeIcon icon={faScaleUnbalanced} className={styles.icon} />
        The Verdict
      </h3>
      {children}
    </div>
  );
};
