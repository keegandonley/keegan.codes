import styles from "./blogPost.module.css";
import "./syntax-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons/faArrowLeft";
import Link from "next/link";
import { BottomFade } from "@/components/BottomFade";
import Image from "next/image";
import { H1 } from "@/components/Post/Heading/H1";
import { getImageMetadata, parseSource, parseToProps } from "@/util/image";
import { BUCKET_URL } from "@/util/r2";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getComponentForKey, getKey } from "../util";

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
        <Component />
      </article>
    </>
  );
}
