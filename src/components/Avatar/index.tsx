import Image from "next/image";
import avatar from "./avatar.jpg";
import styles from "./avatar.module.css";
import { ElementBaseProps } from "@/types/elements";
import { merge } from "@/util/classNames";

interface AvatarProps extends ElementBaseProps {
  width?: number;
  alt?: string;
  priority?: boolean;
  style?: Record<`--${string}`, string>;
}

export const Avatar = ({
  width = 100,
  alt = "A photo of Keegan Donley",
  className,
  priority = false,
  style,
}: Omit<AvatarProps, "children">) => {
  return (
    <Image
      className={merge(styles.image, className)}
      width={width}
      src={avatar}
      alt={alt}
      placeholder="blur"
      priority={priority}
      style={style}
    />
  );
};
