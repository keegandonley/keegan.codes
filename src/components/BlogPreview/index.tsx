import { ClientRenderer } from "./ClientRenderer";
import styles from "./blogPreview.module.css";
import { getImageMetadata } from "@/util/image";
import Posts from "@/posts";
import { Post } from "@/types/post";

const BlogPreview = () => {
  const posts = Object.keys(Posts)
    .map((key) => {
      const component = (Posts as any)[key] as Post;
      return {
        title: component.title,
        slug: component.slug,
        description: component.description,
        cover: component.cover,
      } as Post;
    })
    .slice(0, 4);
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

export default BlogPreview;
