import Posts from "@/posts";
import styles from "./blogPost.module.css";
import "./syntax-theme.css";
import mdxStyles from "../../../mdx.module.css";
import { merge } from "@/util/classNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import Link from "next/link";
import { BottomFade } from "@/components/BottomFade";
import Image from "next/image";

export async function generateStaticParams() {
  return [
    Object.keys(Posts).map((key) => {
      const component = (Posts as any)[key];
      return component.slug;
    }),
  ];
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const componentKey = Object.keys(Posts).find((key) => {
    const component = (Posts as any)[key];
    return component.slug === params.slug;
  });

  if (!componentKey) return <div>404</div>;

  const found = (Posts as any)[componentKey];

  const Component = found.default;
  const title = found.title;
  const cover = found.cover;

  if (!Component) return <div>404</div>;

  return (
    <article className={styles.article}>
      <div className={styles.coverWrapper}>
        {cover ? <Image src={cover} alt="todo" fill /> : null}
        <BottomFade />
      </div>
      <Link href="/blog" className={styles.back}>
        <FontAwesomeIcon icon={faArrowLeft} /> back
      </Link>
      <h1 className={merge(mdxStyles.h, mdxStyles.h1, styles.title)}>
        {title}
      </h1>
      <Component />
    </article>
  );
}
