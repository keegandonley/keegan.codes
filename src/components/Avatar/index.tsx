import Image from "next/image";
import avatar from "./avatar.jpg";
import styles from "./avatar.module.css";

export const Avatar = ({ width = 100, alt = "A photo of Keegan Donley" }) => {
  return (
    <Image className={styles.image} width={width} src={avatar} alt={alt} />
  );
};
