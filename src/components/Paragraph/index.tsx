import { ElementBaseProps } from "@/types/elements";
import styles from "./paragraph.module.css";
import { merge } from "@/util/classNames";

interface ParagraphProps extends ElementBaseProps {}

export const Paragraph = ({ className, children }: ParagraphProps) => {
  return <p className={merge(styles.paragraph, className)}>{children}</p>;
};
