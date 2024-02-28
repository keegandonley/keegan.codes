import { redirect } from "next/navigation";
import styles from "./notFound.module.css";
import Link from "next/link";
import { Graphic } from "./graphic";

export default function NotFoundPage({
  searchParams,
}: {
  searchParams: {
    type?: "blog" | "library";
    slug?: string;
  };
}) {
  const { type, slug } = searchParams;

  if (!type || !slug) {
    return redirect("/");
  }

  const label = type === "blog" ? "blog post" : "book";

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Graphic />
        <h2 className={styles.header}>
          On no! I couldn&apos;t find a {label} for <code>{slug}</code>
        </h2>
        <p>Don&apos;t worry, we&apos;ll get through this.</p>
        <p>
          Please double check your URL, and if you think you&apos;re seeing this
          message in error,{" "}
          <Link
            href={`mailto:kd+brokenlink@keegandonley.com?subject=Broken link for ${label} at ${slug}`}
            className={styles.link}
          >
            please get in touch!
          </Link>
        </p>
      </div>
    </div>
  );
}
