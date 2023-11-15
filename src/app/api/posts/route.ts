export const runtime = "edge";
import Posts from "@/posts";
import { Post } from "@/types/post";
import wordCounts from "../../../post-word-counts.json";
import { connect } from "@planetscale/database";
import { get } from "@vercel/edge-config";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export async function GET(request: Request) {
  const postsPerPage = parseInt((await get("blogPageSize")) ?? "12");

  const url = new URL(request.url);
  const _page = url.searchParams.get("page");
  const pageNumber = _page ? parseInt(_page, 10) : -1;

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
    });

  if (pageNumber === -1) {
    return new Response(JSON.stringify([]));
  }

  const result = posts.slice(
    (pageNumber - 1) * postsPerPage,
    pageNumber * postsPerPage
  );

  const conn = connect(config);

  const pageViews = await Promise.all(
    result.map(async (post) => {
      const results = await conn.execute(
        "SELECT views FROM post_page_views_aggregate WHERE slug = ?",
        [post.slug]
      );

      if (!results?.rows?.[0]) {
        console.error(
          "No results found for slug",
          post.slug,
          "results:",
          results
        );
      }

      return results.rows[0] as Record<"views", number>;
    })
  );

  console.log(
    "fetched blog page",
    pageNumber,
    "of",
    Math.ceil(allPosts.length / postsPerPage),
    "with page size",
    postsPerPage
  );

  return new Response(
    JSON.stringify(
      result.map((post, index) => {
        return {
          ...post,
          viewCount: pageViews[index]?.views ?? 0,
        };
      })
    )
  );
}
