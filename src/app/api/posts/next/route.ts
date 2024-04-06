import Posts from '@/posts';
import wordCounts from '../../../../post-word-counts.json';
import { Post } from '@/types/post';
import { connect } from '@planetscale/database';
import { getImageMetadata } from '@/util/image';

export const runtime = 'edge';

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

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

  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex > -1) {
    const previousPost = posts[currentIndex - 1];
    if (previousPost) {
      const conn = connect(config);

      const results = await conn.execute(
        'SELECT views FROM post_page_views_aggregate WHERE slug = ?',
        [previousPost.slug],
      );

      console.log(
        'fetched previous post for',
        slug,
        'and it was',
        previousPost.slug,
      );

      const metadata = getImageMetadata(previousPost.cover);

      return new Response(
        JSON.stringify({
          ...previousPost,
          viewCount:
            (results.rows[0] as Record<'views', number> | undefined)?.views ??
            0,
          metadata,
          url: `${url.origin}/blog/${previousPost.slug}`,
        }),
      );
    }
  }

  return new Response(JSON.stringify({}));
}
