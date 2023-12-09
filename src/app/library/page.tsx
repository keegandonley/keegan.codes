import Books from "@/books";
import { AnimatedGraph } from "@/components/AnimatedGraph";
import { Delay } from "@/components/Delay";
import { MDXEntryRow } from "@/components/MDXEntryRow";
import { Book } from "@/types/book";
import styles from "./library.module.css";
import { userTheme } from "@/util/cookies";
import { BASEURL, NAME } from "@/metadata";
import { postCount } from "@/book-count";
import { background } from "@/theme/colors";
import { getIsLikelyMobile } from "@/util/userAgent";
import { getBookCoverMetadata } from "@/util/image";

export const runtime = "edge";

export default function LibraryPage() {
  const isLikelyMobile = getIsLikelyMobile();

  const books = Object.keys(Books).map((key) => {
    const component = (Books as any)[key] as Book;
    return {
      title: component.title,
      slug: component.slug,
      tags: component.tags ?? [],
      description: component.description,
      cover: component.cover,
      published: component.readDate,
      publicationDate: component.published,
    };
  });
  return (
    <>
      <section>
        <div className={styles.wrapper}>
          {books
            .sort((a, b) => {
              if (!a.published || !b.published) {
                return 0;
              }
              return b.published.getTime() - a.published.getTime();
            })
            .map((post, index) => {
              const metadata = getBookCoverMetadata(post.cover);

              return (
                <MDXEntryRow
                  key={post.slug}
                  index={index}
                  columns={4}
                  showViewCount={false}
                  isLikelyMobile={isLikelyMobile}
                  {...post}
                  book
                  imageMetadata={metadata}
                />
              );
            })}
          <MDXEntryRow
            key="extra-1"
            index={-1}
            columns={4}
            filler
            isLikelyMobile={isLikelyMobile}
          />
          <MDXEntryRow
            key="extra-2"
            index={-1}
            columns={4}
            filler
            isLikelyMobile={isLikelyMobile}
          />
          <MDXEntryRow
            key="extra-3"
            index={-1}
            columns={4}
            filler
            isLikelyMobile={isLikelyMobile}
          />
          <MDXEntryRow
            key="extra-4"
            index={-1}
            columns={4}
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

export async function generateViewport() {
  const theme = userTheme();

  return {
    themeColor: theme === "light" ? background.light : background.dark,
  };
}

export async function generateMetadata() {
  return {
    title: `Blog · ${NAME}`,
    description: `My library of ${postCount} books I've enjoyed`,
    openGraph: {
      title: `Blog · ${NAME}`,
      description: `My library of ${postCount} books I've enjoyed`,
      url: `${BASEURL}/library`,
      siteName: NAME,
      locale: "en_US",
      authors: ["Keegan Donley"],
      images: [
        {
          url: `/api/og/page?page=library&width=1200&height=630`,
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Library · ${NAME}`,
      description: `My library of ${postCount} books I've enjoyed`,
      creator: "@keegandonley",
      images: [`/api/og/page?page=library&width=1200&height=630`],
    },
  };
}
