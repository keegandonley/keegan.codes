import Books from "@/books";
import { AnimatedGraph } from "@/components/AnimatedGraph";
import { Delay } from "@/components/Delay";
import { MDXEntryRow } from "@/components/MDXEntryRow";
import { Book } from "@/types/book";
import styles from "./library.module.css";

export default function LibraryPage() {
  const books = Object.keys(Books).map((key) => {
    const component = (Books as any)[key] as Book;
    return {
      title: component.title,
      slug: component.slug,
      tags: component.tags ?? [],
      description: component.description,
      cover: component.cover,
      published: component.published,
      readDate: component.readDate,
    };
  });
  return (
    <>
      <section>
        <div className={styles.wrapper}>
          {books
            .sort((a, b) => {
              if (!a.readDate || !b.readDate) {
                return 0;
              }
              return b.readDate.getTime() - a.readDate.getTime();
            })
            .map((post, index) => {
              return (
                <MDXEntryRow key={post.slug} index={index} {...post} book />
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
