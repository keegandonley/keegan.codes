import { ElementBaseProps } from "@/types/elements";
import { fallback, merge } from "@/util/classNames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./animatedIcon.module.css";

interface AnimatedIconProps extends ElementBaseProps {
  from: "top" | "bottom";
  icon: IconProp;
  visible: boolean;
}

export const AnimatedIcon = ({
  from,
  icon,
  className,
  visible,
}: AnimatedIconProps) => {
  const fromBottom = from === "bottom";

  return (
    <div
      className={fallback(
        className,
        merge(
          styles.animatedIcon,
          visible && styles.show,
          fromBottom ? styles.darkModeToggle : styles.lightModeToggle
        )
      )}
    >
      <FontAwesomeIcon icon={icon} fixedWidth />
    </div>
  );
};
