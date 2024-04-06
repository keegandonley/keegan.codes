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

const handleRequestForSlug = async (url: URL, slug?: string | null) => {
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

  let randomIndex = Math.floor(Math.random() * posts.length);

  console.log(
    'searching',
    'randomIndex',
    randomIndex,
    'against currentIndex',
    currentIndex,
  );

  let interations = 0;

  while (randomIndex === currentIndex && interations < 100) {
    randomIndex = Math.floor(Math.random() * posts.length);
    interations++;
  }

  if (randomIndex > -1) {
    const randomPost = posts[randomIndex];
    if (randomPost) {
      const conn = connect(config);

      const results = await conn.execute(
        'SELECT views FROM post_page_views_aggregate WHERE slug = ?',
        [randomPost.slug],
      );

      console.log(
        'fetched random post for',
        slug,
        'and it was',
        randomPost.slug,
      );

      const metadata = getImageMetadata(randomPost.cover);

      return new Response(
        JSON.stringify({
          ...randomPost,
          viewCount:
            (results.rows[0] as Record<'views', number> | undefined)?.views ??
            0,
          metadata,
          url: `${url.origin}/blog/${randomPost.slug}`,
        }),
      );
    }
  }

  return new Response(JSON.stringify({}));
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  return handleRequestForSlug(url, slug);
}

export async function POST(request: Request) {
  const url = new URL(request.url);

  try {
    const body = await request.json();
    const slug = body.slug;

    return handleRequestForSlug(url, slug);
  } catch (ex: any) {
    return handleRequestForSlug(url);
  }
}
