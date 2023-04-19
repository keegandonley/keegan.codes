import { ElementBaseProps } from "@/types/elements";
import Link from "next/link";
import styles from "./mdxEntryRow.module.css";
import Image from "next/image";
import { BUCKET_URL } from "@/util/r2";
import { getImageMetadata, parseToProps } from "@/util/image";
import { merge } from "@/util/classNames";
import { Date } from "./components/Date";
import { Tags } from "./components/Tags";
import { getIsLikelyMobile } from "@/util/userAgent";

interface MDXEntryRowProps extends ElementBaseProps {
  title: string;
  slug: string;
  tags: string[];
  description?: string;
  cover?: string;
  published?: Date;
  index: number;
}

export const MDXEntryRow = ({
  title,
  slug,
  tags,
  description,
  cover,
  published,
  index,
}: MDXEntryRowProps) => {
  const metadata = getImageMetadata(cover);
  const isLikelyMobile = getIsLikelyMobile();

  return (
    <div className={merge(styles.wrapper)}>
      <div className={styles.horizontalLine}></div>
      <div className={styles.verticalLine}></div>
      <Link href={`/blog/${slug}`} className={styles.a}>
        {cover ? (
          <div className={styles.imageParent}>
            <Image
              src={`${BUCKET_URL}/${cover}`}
              alt="todo"
              fill
              sizes="(max-width: 550px) 100vw,
              (max-width: 900px) 50vw,
              33vw"
              // Rough guess at which images are above the fold
              priority={isLikelyMobile ? index < 2 : index < 4}
              {...parseToProps(metadata)}
            />
          </div>
        ) : (
          <div className={styles.imageParent}></div>
        )}
        <div className={styles.content}>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <Date date={published} />
          <Tags tags={tags} />
        </div>
      </Link>
    </div>
  );
};
