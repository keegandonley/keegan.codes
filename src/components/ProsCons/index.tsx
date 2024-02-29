"use client";

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
    <div className={merge(styles.pros, styles.panel, "leftPanel")}>
      <span className={styles.title}>
        <FontAwesomeIcon icon={faThumbsUp} className={styles.icon} /> Pros
      </span>
      <div className={merge(styles.content)}>{children}</div>
    </div>
  );
};

export const ConsWrapper = ({ children }: ProsConsProps) => {
  return (
    <div className={merge(styles.cons, styles.panel, "rightPanel")}>
      <span className={styles.title}>
        <FontAwesomeIcon icon={faThumbsDown} className={styles.icon} />
        Cons
      </span>
      <div className={merge(styles.content)}>
        {children}{" "}
        {!children ? <p className={styles.noCons}>None come to mind</p> : null}
      </div>
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
      <span className={styles.title}>
        <FontAwesomeIcon icon={faScaleUnbalanced} className={styles.icon} />
        The Verdict
      </span>
      {children}
    </div>
  );
};
