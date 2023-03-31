import { MDXEntryRow } from "@/components/MDXEntryRow";
import Posts from "@/posts";
import styles from "./blog.module.css";

export default function Home() {
  const posts = Object.keys(Posts).map((key) => {
    const component = (Posts as any)[key];
    return {
      title: component.title,
      slug: component.slug,
      tags: component.tags ?? [],
    };
  });

  return (
    <section>
      <div className={styles.wrapper}>
        {posts.map((post) => {
          return <MDXEntryRow key={post.slug} {...post} />;
        })}
      </div>
    </section>
  );
}
