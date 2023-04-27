import { Post } from "@/types/post";
import { ClientRenderer } from "./ClientRenderer";
import styles from "./blogPreview.module.css";
import {
  getBookCoverMetadata,
  getImageMetadata,
  parseToProps,
} from "@/util/image";

interface BlogPreviewProps {
  posts: Post[];
}

export const BlogPreview = ({ posts }: BlogPreviewProps) => {
  const postsWithMetadata = posts.map((post) => {
    return {
      ...post,
      metadata: getImageMetadata(post.cover),
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <ClientRenderer posts={postsWithMetadata} />
    </div>
  );
};
