import { ElementBaseProps } from "@/types/elements";
import styles from "./heroBlock.module.css";
import { fallback, merge } from "@/util/classNames";

interface HeroBlockProps extends ElementBaseProps {
  isHomePage?: boolean;
}

export const HeroBlock = ({
  children,
  isHomePage,
  className,
}: HeroBlockProps) => {
  return (
    <div
      className={fallback(
        className,
        merge(styles.container, !isHomePage && styles.small)
      )}
    >
      {children}
    </div>
  );
};
