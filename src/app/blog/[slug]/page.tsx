import Posts from "@/posts";
import styles from "./blogPost.module.css";
import "./syntax-theme.css";

export async function generateStaticParams() {
  return [Object.keys(Posts).map((slug) => ({ slug }))];
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const Component: any = (Posts as any)[params.slug];

  if (!Component) return <div>404</div>;
  return (
    <article className={styles.article}>
      <Component />
    </article>
  );
}
