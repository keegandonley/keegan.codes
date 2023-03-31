import { ElementBaseProps } from "@/types/elements";
import Link from "next/link";
import styles from "./mdxEntryRow.module.css";

interface MDXEntryRowProps extends ElementBaseProps {
  title: string;
  slug: string;
  tags: string[];
}

export const MDXEntryRow = ({ title, slug, tags }: MDXEntryRowProps) => {
  return (
    <div className={styles.wrapper}>
      <Link href={`/blog/${slug}`} className={styles.a}>
        <h1 className={styles.h1}>{title}</h1>
        <div className={styles.tags}>
          {tags.map((tag) => {
            return (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            );
          })}
        </div>
      </Link>
    </div>
  );
};
