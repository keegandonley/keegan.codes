import { ElementBaseProps } from '@/types/elements';
import styles from './heroBlock.module.css';
import { fallback, merge } from '@/util/classNames';

interface HeroBlockProps extends ElementBaseProps {
  isHomePage?: boolean;
  collapse?: boolean;
  sticky?: boolean;
  noPointer?: boolean;
  inline?: boolean;
}

export const HeroBlock = ({
  children,
  isHomePage,
  className,
  collapse,
  sticky,
  noPointer,
  inline,
}: HeroBlockProps) => {
  return (
    <div
      className={fallback(
        className,
        merge(
          styles.container,
          !isHomePage && styles.small,
          collapse && styles.collapse,
          sticky && styles.sticky,
          !isHomePage && styles.fade,
          noPointer && styles.noPointer,
          isHomePage && !inline && styles.floating,
          isHomePage && inline && styles.gap,
        ),
      )}
    >
      {children}
    </div>
  );
};
