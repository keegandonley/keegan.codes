import { merge } from "@/util/classNames";
import styles from "./modal.module.css";

interface ModalBaseProps {
  handleBack: () => void;
  children: any;
  fadedIn: boolean;
  className?: string;
  innerClassName?: string;
}

export const ModalBase = ({
  handleBack,
  children,
  fadedIn,
  className,
  innerClassName,
}: ModalBaseProps) => {
  return (
    <div
      className={merge(styles.wrapper, fadedIn ? styles.fadeIn : "", className)}
    >
      <div
        className={merge(
          styles.inner,
          fadedIn ? styles.fadeIn : "",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
