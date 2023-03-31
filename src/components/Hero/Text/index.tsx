import { ElementBaseProps } from "@/types/elements";
import styles from "./herotext.module.css";

interface HeroTextProps extends ElementBaseProps {}

export const HeroText = ({
  children,
  className = styles.text,
}: HeroTextProps) => {
  return <h1 className={className}>{children}</h1>;
};
