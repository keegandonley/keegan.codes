import postMetadata from '@/post-metadata';
import { PostMetadata } from '@/types/post';

export const getAllPosts = (): PostMetadata[] => [...postMetadata];

export const getSlugParams = () => postMetadata.map(({ slug }) => ({ slug }));

export const getPostBySlug = (slug: string): PostMetadata | undefined =>
  postMetadata.find((post) => post.slug === slug);

export const getAllTags = (): string[] =>
  Array.from(new Set(postMetadata.flatMap((post) => post.tags ?? [])));

export const resolveTag = (tag: string): string | undefined =>
  getAllTags().find(
    (candidate) => candidate.toLowerCase() === tag.toLowerCase(),
  );

export const getPostsByTag = (tag: string): PostMetadata[] =>
  postMetadata.filter((post) =>
    (post.tags ?? []).some(
      (candidate) => candidate.toLowerCase() === tag.toLowerCase(),
    ),
  );
