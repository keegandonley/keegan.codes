import postComponents from '@/posts/components';
import { getPostBySlug } from './util';
import { Post } from '@/types/post';

export const loadPost = async (slug: string): Promise<Post | undefined> => {
  const metadata = getPostBySlug(slug);
  const loader = postComponents[slug];

  if (!metadata || !loader) {
    return undefined;
  }

  const postModule = await loader();
  const { default: component } = postModule;

  if (!component) {
    return undefined;
  }

  return {
    ...metadata,
    default: component,
    coverFilterLight: postModule.coverFilterLight,
    coverFilterDark: postModule.coverFilterDark,
  };
};
