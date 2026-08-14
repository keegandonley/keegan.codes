import postMetadata from '@/post-metadata';
import { PostMetadata } from '@/types/post';

export const getAllPosts = (): PostMetadata[] => [...postMetadata];

export const getSlugParams = () => postMetadata.map(({ slug }) => ({ slug }));

export const getPostBySlug = (slug: string): PostMetadata | undefined =>
  postMetadata.find((post) => post.slug === slug);
