import { ElementBaseProps } from "@/types/elements";
import Link from "next/link";
import styles from "./mdxEntryRow.module.css";
import Image from "next/image";
import { BOOK_BUCKET_URL, BUCKET_URL } from "@/util/r2";
import {
  getBookCoverMetadata,
  getImageMetadata,
  parseToProps,
} from "@/util/image";
import { merge } from "@/util/classNames";
import { Date } from "./components/Date";
import { Tags } from "./components/Tags";
import { getIsLikelyMobile } from "@/util/userAgent";
import { ReadingTime } from "./components/ReadingTime";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicViewCount = dynamic(() => import("@/components/ViewCount"));

interface MDXEntryRowProps extends ElementBaseProps {
  title?: string;
  slug?: string;
  tags?: string[];
  description?: string;
  cover?: string;
  published?: Date;
  index: number;
  filler?: boolean;
  wordCount?: number;
  book?: boolean;
  columns?: number;
  showViewCount?: boolean;
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
  wordCount,
  book,
  columns = 3,
  showViewCount = false,
}: MDXEntryRowProps) => {
  const metadata = book ? getBookCoverMetadata(cover) : getImageMetadata(cover);
  const isLikelyMobile = getIsLikelyMobile();

  const Parent = slug ? Link : "div";
  let resultWidth = 500;
  if (metadata) {
    const ratio = metadata.width / metadata.height;
    const desiredHeight = 250;
    resultWidth = desiredHeight * ratio;
  }

  return (
    <div
      className={merge(
        styles.wrapper,
        filler && styles.filler,
        styles[`col-${columns}`]
      )}
    >
      <div className={styles.horizontalLine}></div>
      <div className={styles.verticalLine}></div>
      <Parent
        href={`/${book ? "library" : "blog"}/${slug}`}
        className={styles.a}
      >
        {cover ? (
          <div className={merge(styles.imageParent, book && styles.book)}>
            <Image
              src={`${book ? BOOK_BUCKET_URL : BUCKET_URL}/${cover}`}
              alt="todo"
              fill
              sizes={`(max-width: 550px) 100vw, (max-width: 900px) 50vw, ${resultWidth}px`}
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
            <div className={styles.metadata}>
              {published ? <Date date={published} /> : false}
              <ReadingTime wordCount={wordCount} />
            </div>
            {slug && showViewCount && (
              <Suspense>
                <DynamicViewCount slug={slug} className={styles.viewCount} />
              </Suspense>
            )}
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
