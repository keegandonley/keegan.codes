import { ElementBaseProps } from "@/types/elements";
import styles from "./heroBlock.module.css";
import { fallback, merge } from "@/util/classNames";

interface HeroBlockProps extends ElementBaseProps {
  isHomePage?: boolean;
  collapse?: boolean;
}

export const HeroBlock = ({
  children,
  isHomePage,
  className,
  collapse,
}: HeroBlockProps) => {
  return (
    <div
      className={fallback(
        className,
        merge(
          styles.container,
          !isHomePage && styles.small,
          collapse && styles.collapse
        )
      )}
    >
      {children}
    </div>
  );
};
