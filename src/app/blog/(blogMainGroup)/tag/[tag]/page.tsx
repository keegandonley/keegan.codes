import { MDXEntryRow } from "@/components/MDXEntryRow";
import Posts from "@/posts";
import styles from "../../blog.module.css";
import { AnimatedGraph } from "@/components/AnimatedGraph";
import { Delay } from "@/components/Delay";
import wordCounts from "../../../../../post-word-counts.json";
import { Post } from "@/types/post";
import tagPageStyles from "./tagPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import Link from "next/link";
import { getIsLikelyMobile } from "@/util/userAgent";
import { getImageMetadata } from "@/util/image";

export const runtime = "edge";

interface BlogTagPageProps {
  params: {
    tag: string;
  };
}

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const decodedTag = decodeURIComponent(params.tag);
  const isLikelyMobile = getIsLikelyMobile();

  const posts = Object.keys(Posts)
    .map((key) => {
      const component = (Posts as any)[key] as Post;
      return {
        title: component.title,
        slug: component.slug,
        tags: component.tags ?? [],
        description: component.description,
        cover: component.cover,
        published: component.published,
        wordCount: (wordCounts as Record<string, number>)[component.slug],
      };
    })
    .filter((p) => {
      return p.tags
        .map((t) => t.toLowerCase())
        .includes(decodedTag.toLowerCase());
    });

  return (
    <>
      <div className={tagPageStyles.container}>
        <Link href={`/blog`} className={tagPageStyles.button}>
          <span className={tagPageStyles.text}>{decodedTag}</span>
          <span className={tagPageStyles.iconWrapper}>
            <FontAwesomeIcon icon={faTimes} className={tagPageStyles.icon} />
          </span>
        </Link>
      </div>
      <section>
        <div className={styles.wrapper}>
          {posts
            .sort((a, b) => {
              if (!a.published || !b.published) {
                return 0;
              }
              return b.published.getTime() - a.published.getTime();
            })
            .map((post, index) => {
              const metadata = getImageMetadata(post.cover);

              return (
                <MDXEntryRow
                  key={post.slug}
                  index={index}
                  showViewCount
                  isLikelyMobile={isLikelyMobile}
                  {...post}
                  imageMetadata={metadata}
                />
              );
            })}
          <MDXEntryRow
            key="extra-1"
            index={-1}
            filler
            isLikelyMobile={isLikelyMobile}
          />
          <MDXEntryRow
            key="extra-2"
            index={-1}
            filler
            isLikelyMobile={isLikelyMobile}
          />
          <MDXEntryRow
            key="extra-3"
            index={-1}
            filler
            isLikelyMobile={isLikelyMobile}
          />
        </div>
      </section>
      <Delay>
        <AnimatedGraph />
      </Delay>
    </>
  );
}
