import { Post } from '@/types/post';
import { ClientRenderer } from './ClientRenderer';
import { getImageMetadata } from '@/util/image';

interface BlogPreviewProps {
  posts: Post[];
}

const BlogPreview = ({ posts }: BlogPreviewProps) => {
  const postsWithMetadata = posts.map((post) => {
    return {
      ...post,
      metadata: getImageMetadata(post.cover),
    };
  }, []);
  return <ClientRenderer posts={postsWithMetadata} />;
};

export default BlogPreview;
