import { Post } from '@/types/post';
import Posts from '@/posts';
import wordCounts from '../post-word-counts.json';
import { connect } from '@planetscale/database';
import { getImageMetadata } from './image';

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export const getPreviousPostForSlug = async (
  slug: string | null,
  origin?: string,
): Promise<any> => {
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
    const previousPost = posts[currentIndex + 1];
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

      return {
        ...previousPost,
        viewCount:
          (results.rows[0] as Record<'views', number> | undefined)?.views ?? 0,
        metadata,
        url: `${origin}/blog/${previousPost.slug}`,
      };
    }
  }

  return {};
};

export const getNextPostForSlug = async (
  slug: string | null,
  origin?: string,
): Promise<any> => {
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

      return {
        ...previousPost,
        viewCount:
          (results.rows[0] as Record<'views', number> | undefined)?.views ?? 0,
        metadata,
        url: `${origin}/blog/${previousPost.slug}`,
      };
    }
  }

  return {};
};

export const getRandomPostForSlug = async (
  slug: string | null,
  origin?: string,
): Promise<any> => {
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

      return {
        ...randomPost,
        viewCount:
          (results.rows[0] as Record<'views', number> | undefined)?.views ?? 0,
        metadata,
        url: `${origin}/blog/${randomPost.slug}`,
      };
    }
  }

  return {};
};

export const getPostForSlug = async (
  slug: string | null,
  origin?: string,
): Promise<any> => {
  const allPosts = Object.keys(Posts);
  const post = allPosts
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
    .find((post) => post.slug === slug);

  if (post) {
    const conn = connect(config);

    const results = await conn.execute(
      'SELECT views FROM post_page_views_aggregate WHERE slug = ?',
      [post.slug],
    );

    console.log('fetched single post', slug);

    const metadata = getImageMetadata(post.cover);

    return {
      ...post,
      viewCount:
        (results.rows[0] as Record<'views', number> | undefined)?.views ?? 0,
      metadata,
      url: `${origin}/blog/${post.slug}`,
    };
  }

  return {};
};
