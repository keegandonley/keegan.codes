import { MDXEntryRow } from "@/components/MDXEntryRow";
import Posts from "@/posts";
import styles from "./blog.module.css";
import { Paragraph } from "@/components/Paragraph";
import ScrollFixer from "@/components/ScrollFixer";

// export const runtime = "experimental-edge";

export default function Home() {
  const posts = Object.keys(Posts).map((key) => {
    const component = (Posts as any)[key];
    return {
      title: component.title,
      slug: component.slug,
      tags: component.tags ?? [],
      description: component.description,
      cover: component.cover,
    };
  });

  return (
    <>
      <ScrollFixer />

      <section>
        <Paragraph className={styles.bodyText}>
          Welcome to my blog, thanks for stopping by! This is a space for random
          thoughts, interests, hobbies, etc. of mine. I hope you find something
          interesting! Most of what I write about is software development, but
          I&apos;ll also write about other things that I&apos;m interested in!
        </Paragraph>
        <div className={styles.wrapper}>
          {posts.map((post) => {
            return <MDXEntryRow key={post.slug} {...post} />;
          })}
        </div>
      </section>
    </>
  );
}
