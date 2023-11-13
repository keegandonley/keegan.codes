import { MDXEntryRow } from "@/components/MDXEntryRow";
import Posts from "@/posts";
import styles from "./blog.module.css";
import wordCounts from "../../../post-word-counts.json";
import { Post } from "@/types/post";
import { userTheme } from "@/util/cookies";
import { BASEURL, NAME } from "@/metadata";
import { postCount } from "@/post-count";
import { background } from "@/theme/colors";
import { DynamicPosts } from "@/components/DynamicPosts";
import { getIsLikelyMobile } from "@/util/userAgent";
import { PAGE_SIZE } from "@/util/pagination";

export const runtime = "experimental-edge";

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

const postsPerPage = PAGE_SIZE;

export default function BlogPage({ searchParams: { page } }: BlogPageProps) {
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
    .slice(0, postsPerPage);

  const pageCount = Math.ceil(allPosts.length / postsPerPage);
  const isLikelyMobile = getIsLikelyMobile();

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
                isLikelyMobile={isLikelyMobile}
                className={
                  index === posts.length - 1 ? "last-element-page-1" : ""
                }
                {...post}
              />
            );
          })}
          <DynamicPosts
            previousPage={1}
            isLikelyMobile={isLikelyMobile}
            pageCount={pageCount}
          />
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
    description: `My blog with ${postCount} posts and counting!`,
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
