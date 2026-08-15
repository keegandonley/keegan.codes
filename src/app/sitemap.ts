import { MetadataRoute } from 'next';
import { getAllPosts } from '@/app/blog/util';
import Books from '@/books';
import { readFileSync } from 'fs';
import { join } from 'path';
import { listObjects } from '@/util/r2';

const getPublishedDate = () => {
  try {
    return readFileSync(
      join(process.cwd(), 'public', 'published.txt'),
      'utf-8',
    ).trim();
  } catch {
    return new Date().toISOString();
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const published = getPublishedDate();

  const watchContent = await listObjects({
    Bucket: process.env.R2_WATCH_BUCKET!,
  });

  return [
    {
      url: 'https://keegan.codes',
      lastModified: published,
      priority: 1,
    },
    {
      url: 'https://keegan.codes/resume',
      lastModified: published,
      priority: 0.3,
    },
    {
      url: 'https://keegan.codes/blog',
      lastModified: published,
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    {
      url: 'https://keegan.codes/links',
      lastModified: published,
      priority: 0.6,
    },
    {
      url: 'https://keegan.codes/pi',
      lastModified: published,
      priority: 0.3,
    },
    ...getAllPosts().map((post) => {
      return {
        url: `https://keegan.codes/blog/${post.slug}`,
        lastModified: post.updated || post.published,
        priority: 0.7,
      };
    }),
    {
      url: 'https://keegan.codes/library',
      lastModified: published,
      priority: 0.7,
      changeFrequency: 'weekly',
    },
    ...Object.keys(Books).map((key) => {
      return {
        url: `https://keegan.codes/library/${(Books as any)[key].slug}`,
        lastModified:
          (Books as any)[key].updated || (Books as any)[key].published,
        priority: 0.5,
      };
    }),
    ...(watchContent?.map((object) => {
      return {
        url: `https://keegan.codes/watch/${object.Key}`,
        lastModified: object.LastModified,
        priority: 0.3,
      };
    }) ?? []),
    ...Array.from(
      new Set(getAllPosts().flatMap((post) => post.tags ?? [])),
    ).map((tag) => ({
      url: `https://keegan.codes/blog/tag/${encodeURIComponent(tag)}`,
      lastModified: published,
      priority: 0.5,
    })),
  ];
}
