import styles from "./blogPost.module.css";
import "../../syntax-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { BottomFade } from "@/components/BottomFade";
import Image from "next/image";
import { H1 } from "@/components/Post/Heading/H1";
import { parseSource, parseToProps } from "@/util/image";
import { BUCKET_URL } from "@/util/r2";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getComponentForKey, getKey } from "../util";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { Suspense } from "react";
import { fetchMetadata } from "@/util/api";

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
    };
  }

  return {
    title: "Keegan Donley",
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const componentKey = getKey({ slug: params.slug });

  if (!componentKey) {
    notFound();
  }

  const found = getComponentForKey({ key: componentKey });

  const Component = found.default;
  const title = found.title;
  const cover = found.cover;
  const metadata = await fetchMetadata(parseSource(cover)[0]);

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
        <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      </article>
    </>
  );
}
