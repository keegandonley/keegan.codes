import Image from "next/image";
import avatar from "./avatar.jpg";
import styles from "./avatar.module.css";
import { ElementBaseProps } from "@/types/elements";
import { fallback, merge } from "@/util/classNames";

interface AvatarProps extends ElementBaseProps {
  width?: number;
  alt?: string;
}

export const Avatar = ({
  width = 100,
  alt = "A photo of Keegan Donley",
  className,
}: Omit<AvatarProps, "children">) => {
  return (
    <Image
      className={fallback(className, styles.image)}
      width={width}
      src={avatar}
      alt={alt}
    />
  );
};
