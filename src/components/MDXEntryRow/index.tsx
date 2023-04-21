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
  title?: string;
  slug?: string;
  tags?: string[];
  description?: string;
  cover?: string;
  published?: Date;
  index: number;
  filler?: boolean;
}

export const MDXEntryRow = ({
  title,
  slug,
  tags,
  description,
  cover,
  published,
  index,
  filler,
}: MDXEntryRowProps) => {
  const metadata = getImageMetadata(cover);
  const isLikelyMobile = getIsLikelyMobile();

  const Parent = slug ? Link : "div";

  return (
    <div className={merge(styles.wrapper, filler && styles.filler)}>
      <div className={styles.horizontalLine}></div>
      <div className={styles.verticalLine}></div>
      <Parent href={`/blog/${slug}`} className={styles.a}>
        {cover ? (
          <div className={styles.imageParent}>
            <Image
              src={`${BUCKET_URL}/${cover}`}
              alt="todo"
              fill
              sizes="(max-width: 550px) 100vw,
              (max-width: 900px) 50vw,
              500px"
              // Rough guess at which images are above the fold
              priority={isLikelyMobile ? index < 2 : index < 4}
              {...parseToProps(metadata)}
            />
          </div>
        ) : (
          <div className={styles.imageParent}></div>
        )}
        {!filler ? (
          <div className={styles.content}>
            <h1 className={styles.h1}>{title}</h1>
            <p className={styles.description}>{description}</p>
            {published ? <Date date={published} /> : false}
            {tags && tags.length > 0 ? <Tags tags={tags} /> : false}
          </div>
        ) : (
          false
        )}
      </Parent>
      {filler ? <div className={styles.borderFade} /> : false}
    </div>
  );
};
