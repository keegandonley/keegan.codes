import { MDXEntryRow } from "@/components/MDXEntryRow";
import Posts from "@/posts";
import styles from "./blog.module.css";
import { AnimatedGraph } from "@/components/AnimatedGraph";

export default async function BlogPage() {
  const posts = Object.keys(Posts).map((key) => {
    const component = (Posts as any)[key];
    return {
      title: component.title,
      slug: component.slug,
      tags: component.tags ?? [],
      description: component.description,
      cover: component.cover,
      published: component.published,
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
              return <MDXEntryRow key={post.slug} index={index} {...post} />;
            })}
        </div>
      </section>
      <AnimatedGraph />
    </>
  );
}
