import { getAllPosts } from '@/app/blog/util';
import wordCounts from '../../../post-word-counts.json';
import { connect } from '@planetscale/database';
import { getImageMetadata } from '@/util/image';
import { POSTS_PER_PAGE } from '@/util/const';
import { getCommentCountForSlug } from '@/components/Comments/util';

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export async function GET(request: Request) {
  const postsPerPage = POSTS_PER_PAGE;

  const url = new URL(request.url);
  const _page = url.searchParams.get('page');
  const pageNumber = _page ? parseInt(_page, 10) : -1;

  const allPosts = getAllPosts();
  const posts = allPosts
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      tags: post.tags ?? [],
      description: post.description,
      cover: post.cover,
      published: post.published,
      wordCount: (wordCounts as Record<string, number>)[post.slug],
      bskyThreadId: post.bskyThreadId,
    }))
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
    pageNumber * postsPerPage,
  );

  const conn = connect(config);

  const pageViews = await Promise.all(
    result.map(async (post) => {
      const results = await conn.execute(
        'SELECT views FROM post_page_views_aggregate WHERE slug = ?',
        [post.slug],
      );

      if (!results?.rows?.[0]) {
        console.warn(
          'No results found for slug',
          post.slug,
          'results:',
          results,
        );
      }

      return results.rows[0] as Record<'views', number> | undefined;
    }),
  );

  const commentCounts = await Promise.all(
    result.map(async (post) => {
      if (!post.bskyThreadId) {
        return 0;
      }

      const commentCount = await getCommentCountForSlug(post.slug);

      return commentCount;
    }),
  );

  console.log(
    'fetched blog page',
    pageNumber,
    'of',
    Math.ceil(allPosts.length / postsPerPage),
    'with page size',
    postsPerPage,
  );

  return new Response(
    JSON.stringify(
      result.map((post, index) => {
        return {
          ...post,
          viewCount: pageViews[index]?.views ?? 0,
          commentCount: commentCounts[index] ?? 0,
          imageMetadata: getImageMetadata(post.cover),
        };
      }),
    ),
  );
}
