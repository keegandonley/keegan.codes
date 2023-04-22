import styles from "./blogPost.module.css";
import "../../syntax-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { BottomFade } from "@/components/BottomFade";
import Image from "next/image";
import { H1 } from "@/components/Post/Heading/H1";
import { getImageMetadata, parseSource, parseToProps } from "@/util/image";
import { BUCKET_URL } from "@/util/r2";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getComponentForKey, getKey } from "../util";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import wordCounts from "../../../post-word-counts.json";
import { ReadingTime } from "@/components/MDXEntryRow/components/ReadingTime";

export const runtime = "experimental-edge";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const componentKey = getKey({ slug: params.slug });
  if (componentKey) {
    const found = getComponentForKey({ key: componentKey });

    return {
      title: `${found.title} · Keegan Donley`,
      openGraph: {
        title: found.title,
        description: found.description,
        url: `https://keegandonley.com/blog/${params.slug}`,
        siteName: "Keegan Donley",
        locale: "en_US",
        authors: ["Keegan Donley"],
        images: [
          {
            url: `/api/og/post?slug=${params.slug}`,
            width: 1200,
            height: 600,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: found.title,
        description: found.description,
        creator: "@keegandonley",
        images: [`/api/og/post?slug=${params.slug}`],
      },
    };
  }

  return {
    title: "Keegan Donley",
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const componentKey = getKey({ slug: params.slug });

  if (!componentKey) {
    notFound();
  }

  const found = getComponentForKey({ key: componentKey });

  const Component = found.default;
  const title = found.title;
  const cover = found.cover;
  const metadata = getImageMetadata(parseSource(cover)[0]);
  const wordCount = (wordCounts as Record<string, number>)[found.slug];

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
        <Link href="/blog" className={styles.back}>
          <FontAwesomeIcon icon={faArrowLeft} /> back
        </Link>
        <H1 className={styles.title}>{title}</H1>
        <div className={styles.metadata}>
          <ReadingTime wordCount={wordCount} />
        </div>
        <Component />
      </article>
    </>
  );
}
