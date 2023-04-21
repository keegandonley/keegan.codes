import { merge } from "@/util/classNames";
import styles from "./footer.module.css";
import Link from "next/link";
import { Avatar } from "../Avatar";

interface FooterProps {
  className?: string;
  children?: any;
}

export const Footer = ({ className, children }: FooterProps) => {
  return (
    <footer className={merge(styles.footer, className)}>
      <div className={styles.content}>
        <div className={styles.column}>
          <strong>Keegan Donley</strong>
          <Link href="/blog">Blog</Link>
        </div>
        <div className={styles.column}>{children}</div>
        <div className={styles.column}>
          <div className={styles.avatar}>
            <Avatar width={50} />
          </div>
        </div>
      </div>
      <div className={styles.copyright}>&copy; 2023 by Keegan Donley</div>
    </footer>
  );
};
