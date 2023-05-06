import { MDXEntryRow } from "@/components/MDXEntryRow";
import Posts from "@/posts";
import styles from "./blog.module.css";
import { AnimatedGraph } from "@/components/AnimatedGraph";
import { Delay } from "@/components/Delay";
import wordCounts from "../../../post-word-counts.json";
import { Post } from "@/types/post";
import { userTheme } from "@/util/cookies";
import { BASEURL, NAME } from "@/metadata";
import { postCount } from "@/post-count";
import { background } from "@/theme/colors";

export const runtime = "experimental-edge";

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

const postsPerPage = 12;

export default function BlogPage({ searchParams: { page } }: BlogPageProps) {
  const pageNumber = parseInt(page ?? "1", 10);

  const allPosts = Object.keys(Posts);
  const posts = allPosts
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
    .sort((a, b) => {
      if (!a.published || !b.published) {
        return 0;
      }
      return b.published.getTime() - a.published.getTime();
    })
    .slice((pageNumber - 1) * postsPerPage, pageNumber * postsPerPage);

  const pageCount = Math.ceil(allPosts.length / postsPerPage);
  const hasNextPage = pageNumber < pageCount;
  const hasPreviousPage = pageNumber > 1;

  return (
    <>
      <section>
        <div className={styles.wrapper}>
          {posts.map((post, index) => {
            return (
              <MDXEntryRow
                key={post.slug}
                showViewCount
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
    </>
  );
}

export async function generateMetadata() {
  const theme = userTheme();

  return {
    title: `Blog · ${NAME}`,
    description: `My blog with ${postCount} posts and counting!`,
    themeColor: theme === "light" ? background.light : background.dark,
    openGraph: {
      title: `Blog · ${NAME}`,
      description: `My blog with ${postCount} posts and counting!`,
      url: `${BASEURL}/blog`,
      siteName: NAME,
      locale: "en_US",
      authors: ["Keegan Donley"],
      images: [
        {
          url: `/api/og/page?page=blog&width=1200&height=630`,
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog · ${NAME}`,
      description: `My blog with ${postCount} posts and counting!`,
      creator: "@keegandonley",
      images: [`/api/og/page?page=blog&width=1200&height=630`],
    },
  };
}
