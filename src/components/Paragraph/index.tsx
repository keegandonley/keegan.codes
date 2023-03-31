import { ElementBaseProps } from "@/types/elements";
import styles from "./paragraph.module.css";

interface ParagraphProps extends ElementBaseProps {}

export const Paragraph = ({
  className = styles.paragraph,
  children,
}: ParagraphProps) => {
  return <p className={className}>{children}</p>;
};
