import { ElementBaseProps } from "@/types/elements";
import Link from "next/link";
import styles from "./mdxEntryRow.module.css";
import Image from "next/image";
import { BUCKET_URL } from "@/util/r2";
import { getImageMetadata, parseToProps } from "@/util/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCircle } from "@fortawesome/pro-solid-svg-icons";
import { merge } from "@/util/classNames";

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
}: MDXEntryRowProps) => {
  const formattedDate = published
    ? published.toLocaleString("en-US", {
        timeZone: "America/Chicago",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const metadata = getImageMetadata(cover);
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
              {...parseToProps(metadata)}
            />
          </div>
        ) : (
          <div className={styles.imageParent}></div>
        )}
        <div className={styles.content}>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <p className={styles.date}>
            <FontAwesomeIcon icon={faCalendar} className={styles.sectionIcon} />{" "}
            {formattedDate}
          </p>
          <div className={styles.tags}>
            {tags.map((tag) => {
              return (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              );
            })}
            <FontAwesomeIcon icon={faCircle} className={styles.icon} />
            <div className={styles.borderFade} />
          </div>
        </div>
      </Link>
    </div>
  );
};
