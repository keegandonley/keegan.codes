"use client";

import { merge } from "@/util/classNames";
import styles from "./proscons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faScaleUnbalanced,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/pro-solid-svg-icons";
import { Children, cloneElement, useState } from "react";

interface ProsConsProps {
  children: any;
}

interface PanelProps {
  expanded?: boolean;
  onClick?: () => void;
}

export const ProsConsWrapper = ({ children }: ProsConsProps) => {
  const [direction, setDirection] = useState("left");

  return (
    <div className={merge(styles.wrapper)}>
      {Children.map(children, (child, index) => {
        let expanded = false;
        if (index === 0 && direction === "left") {
          expanded = true;
        } else if (index === 1 && direction === "right") {
          expanded = true;
        }

        let handleClick;

        if (index === 0) {
          handleClick = () => setDirection("left");
        } else if (index === 1) {
          handleClick = () => setDirection("right");
        }

        return cloneElement(child, {
          expanded,
          onClick: handleClick,
        });
      })}
    </div>
  );
};

export const ProsWrapper = ({
  children,
  expanded,
  onClick,
}: ProsConsProps & PanelProps) => {
  return (
    <div
      className={merge(
        styles.pros,
        styles.panel,
        expanded ? styles.expanded : styles.collapsed,
        "leftPanel"
      )}
      onClick={onClick}
    >
      <h3>
        <FontAwesomeIcon icon={faThumbsUp} className={styles.icon} /> Pros
      </h3>
      <div className={merge(styles.content)}>{children}</div>
      <div className={merge(styles.mobileText)}>
        <FontAwesomeIcon icon={faPlusSquare} /> Show Pros
      </div>
    </div>
  );
};

export const ConsWrapper = ({
  children,
  expanded,
  onClick,
}: ProsConsProps & PanelProps) => {
  return (
    <div
      className={merge(
        styles.cons,
        styles.panel,
        expanded ? styles.expanded : styles.collapsed,
        "rightPanel"
      )}
      onClick={onClick}
    >
      <h3>
        <FontAwesomeIcon icon={faThumbsDown} className={styles.icon} />
        Cons
      </h3>
      <div className={merge(styles.content)}>
        {children}{" "}
        {!children ? <p className={styles.noCons}>None come to mind</p> : null}
      </div>
      <div className={merge(styles.mobileText)}>
        <FontAwesomeIcon icon={faPlusSquare} /> Show Cons
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
      <h3>
        <FontAwesomeIcon icon={faScaleUnbalanced} className={styles.icon} />
        The Verdict
      </h3>
      {children}
    </div>
  );
};
