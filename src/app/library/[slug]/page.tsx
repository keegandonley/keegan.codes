import { notFound } from "next/navigation";
import { getComponentForKey, getKey } from "../util";
import styles from "./book.module.css";
import { getBookCoverMetadata, parseSource, parseToProps } from "@/util/image";
import wordCounts from "../../../book-word-counts.json";
import { H1 } from "@/components/Post/Heading/H1";
import Image from "next/image";
import { BOOK_BUCKET_URL } from "@/util/r2";

export const runtime = "experimental-edge";

interface LibraryPageProps {
  params: {
    slug: string;
  };
}

export default function LibrarySlugPage({ params }: LibraryPageProps) {
  const componentKey = getKey({ slug: params.slug });

  if (!componentKey) {
    notFound();
  }

  const found = getComponentForKey({ key: componentKey });

  const Component = found.default;
  const title = found.title;
  const cover = found.cover;
  const metadata = getBookCoverMetadata(parseSource(cover)[0]);
  const wordCount = (wordCounts as Record<string, number>)[found.slug];

  if (!Component) {
    notFound();
  }

  return (
    <div className={styles.wrapper}>
      <aside className={styles.metadata}>
        <div className={styles.coverWrapper}>
          {cover ? (
            <Image
              src={`${BOOK_BUCKET_URL}/${cover}`}
              alt="todo"
              fill
              priority
              {...parseToProps(metadata)}
            />
          ) : null}
        </div>
      </aside>
      <article className={styles.article}>
        <H1 className={styles.title}>{title}</H1>
        <Component />
      </article>
    </div>
  );
}
