import { ElementBaseProps } from '@/types/elements';
import { fallback, merge } from '@/util/classNames';
import { Theme } from '@/types/theme';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './animatedIcon.module.css';

interface AnimatedIconProps extends ElementBaseProps {
  from: 'top' | 'bottom';
  icon: IconProp;
  visibleIn: Theme;
}

export const AnimatedIcon = ({
  from,
  icon,
  className,
  visibleIn,
}: AnimatedIconProps) => {
  const fromBottom = from === 'bottom';

  return (
    <div
      className={fallback(
        className,
        merge(
          styles.animatedIcon,
          visibleIn === 'dark' ? styles.showInDark : styles.showInLight,
          fromBottom ? styles.darkModeToggle : styles.lightModeToggle,
        ),
      )}
    >
      <FontAwesomeIcon icon={icon} fixedWidth />
    </div>
  );
};
