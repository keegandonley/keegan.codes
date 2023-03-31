import { ElementBaseProps } from "@/types/elements";
import styles from "./heroBlock.module.css";

interface HeroBlockProps extends ElementBaseProps {}

export const HeroBlock = ({
  children,
  className = styles.container,
}: HeroBlockProps) => {
  return <div className={className}>{children}</div>;
};
