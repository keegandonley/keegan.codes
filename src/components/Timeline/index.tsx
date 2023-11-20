import Link from "next/link";
import styles from "./timeline.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/pro-solid-svg-icons";
import { merge } from "@/util/classNames";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { BUCKET_URL } from "@/util/r2";
import { parseToProps } from "@/util/image";
import { formatDate } from "@/util/date";

const DynamicViewCount = dynamic(() => import("@/components/ViewCount"));

interface TimelineProps {
  slug: string;
}

const Timeline = async (props: TimelineProps) => {
  const { slug } = props;

  const [previousPost, nextPost] = await Promise.all([
    (
      await fetch(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://keegan.codes"
        }/api/posts/previous?slug=${slug}`
      )
    ).json(),
    (
      await fetch(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://keegan.codes"
        }/api/posts/next?slug=${slug}`
      )
    ).json(),
  ]);

  const isAlone = !previousPost?.slug || !nextPost?.slug;

  return (
    <>
      <h3 className={styles.heading}>Further Reading</h3>
      <div className={styles.timelineWrapper}>
        {previousPost?.slug ? (
          <Link
            className={merge(styles.post, isAlone ? styles.single : "")}
            href={previousPost.slug}
          >
            <span className={styles.postTitle}>
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                className={styles.arrowLeft}
              />
              <h4>{previousPost.title}</h4>
            </span>
            <p>{previousPost.description}</p>
            <div className={styles.metadataWrapper}>
              <Suspense>
                <DynamicViewCount
                  slug={slug}
                  className={styles.viewCount}
                  fixedCount={previousPost.viewCount}
                />
              </Suspense>
              <p className={styles.metadata}>
                {formatDate(new Date(previousPost.published))}
              </p>
            </div>
            <Image
              src={`${BUCKET_URL}/${previousPost.cover}`}
              alt="todo"
              fill
              {...parseToProps(previousPost.metadata)}
              sizes={
                isAlone
                  ? `(max-width: 700px) 100vw, 50vw`
                  : `(max-width: 600px) 100vw, 50vw`
              }
            />
          </Link>
        ) : (
          <div />
        )}
        {nextPost?.slug ? (
          <Link
            className={merge(styles.post, isAlone ? styles.single : "")}
            href={nextPost.slug}
          >
            <span className={styles.postTitle}>
              <h4>{nextPost.title}</h4>
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className={styles.arrowRight}
              />
            </span>
            <p>{nextPost.description}</p>
            <div className={styles.metadataWrapper}>
              <Suspense>
                <DynamicViewCount
                  slug={slug}
                  className={styles.viewCount}
                  fixedCount={nextPost.viewCount}
                />
              </Suspense>
              <p className={styles.metadata}>
                {formatDate(new Date(nextPost.published))}
              </p>
            </div>
            <Image
              src={`${BUCKET_URL}/${nextPost.cover}`}
              alt="todo"
              fill
              {...parseToProps(nextPost.metadata)}
              sizes={
                isAlone
                  ? `(max-width: 700px) 100vw, 50vw`
                  : `(max-width: 600px) 100vw, 50vw`
              }
            />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default Timeline;
