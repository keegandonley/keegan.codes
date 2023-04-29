import { MDXEntryRow } from "@/components/MDXEntryRow";
import Posts from "@/posts";
import styles from "./blog.module.css";
import { AnimatedGraph } from "@/components/AnimatedGraph";
import { Delay } from "@/components/Delay";
import wordCounts from "../../post-word-counts.json";
import { Post } from "@/types/post";
import { get } from "@vercel/edge-config";

export const runtime = "experimental-edge";

export default async function BlogPage() {
  const flags: any = await get("flags");

  const posts = Object.keys(Posts).map((key) => {
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
  });

  return (
    <>
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
              return (
                <MDXEntryRow
                  key={post.slug}
                  showViewCount={flags?.viewCounts}
                  index={index}
                  {...post}
                />
              );
            })}
          <MDXEntryRow key="extra-1" index={-1} filler />
          <MDXEntryRow key="extra-2" index={-1} filler />
          <MDXEntryRow key="extra-3" index={-1} filler />
        </div>
      </section>
      <Delay>
        <AnimatedGraph />
      </Delay>
    </>
  );
}
