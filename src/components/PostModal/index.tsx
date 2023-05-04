import { getComponentForKey, getKey } from "@/app/blog/util";
import styles from "./postModal.module.css";
import { notFound } from "next/navigation";
import { getImageMetadata, parseSource, parseToProps } from "@/util/image";
import Image from "next/image";
import { BottomFade } from "@/components/BottomFade";
import { BUCKET_URL } from "@/util/r2";
import { H1 } from "@/components/Post/Heading/H1";
import { ReadingTime } from "../MDXEntryRow/components/ReadingTime";
import { Cheers } from "../Cheers";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const DynamicViewCount = dynamic(() => import("@/components/ViewCount"));

interface PostModalProps {
  slug: string;
  wordCount: number;
}

export const PostModal = ({ slug, wordCount }: PostModalProps) => {
  const componentKey = getKey({ slug });

  if (!componentKey) {
    notFound();
  }

  const found = getComponentForKey({ key: componentKey });

  const Component = found.default;
  const title = found.title;
  const cover = found.cover;
  const metadata = getImageMetadata(parseSource(cover)[0]);

  if (!Component) {
    notFound();
  }

  return (
    <>
      <div className={styles.coverWrapper}>
        {cover ? (
          <Image
            src={`${BUCKET_URL}/${cover}`}
            alt="todo"
            fill
            priority
            {...parseToProps(metadata)}
          />
        ) : null}
        <BottomFade />
      </div>
      <article className={styles.article}>
        <div className={styles.topSection}>
          <H1 className={styles.title}>{title}</H1>
          <div className={styles.metadata}>
            <div className={styles.cheersWrapper}>
              <Cheers slug={slug} location="modal" />
            </div>
            <div className={styles.subItems}>
              <ReadingTime
                className={styles.readingTime}
                wordCount={wordCount}
              />
              <Suspense>
                <DynamicViewCount slug={slug} className={styles.viewCount} />
              </Suspense>
            </div>
          </div>
        </div>
        <Component />
      </article>
    </>
  );
};
