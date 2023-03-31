import { ElementBaseProps } from "@/types/elements";
import Link from "next/link";
import styles from "./menuitem.module.css";
import { fallback, merge } from "@/util/classNames";

interface MenuItemProps extends ElementBaseProps {
  href: string;
  side: "left" | "right";
  visible?: boolean;
  active?: boolean;
}

export const MenuItem = ({
  children,
  className,
  href,
  side,
  visible,
  active,
}: MenuItemProps) => {
  const isLeft = side === "left";
  return (
    <span
      className={fallback(
        className,
        merge(
          styles.item,
          isLeft ? styles.left : styles.right,
          visible && styles.visible,
          active && styles.active
        )
      )}
    >
      <Link href={href}>{children}</Link>
    </span>
  );
};
