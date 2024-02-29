import { headers } from "next/headers";
import { Graphic } from "./not-found/graphic";
import styles from "./not-found/notFound.module.css";
import Link from "next/link";

export const runtime = "edge";

export default function NotFound() {
  const allHeaders = headers();

  const slug = allHeaders.get("x-error-slug");
  const type = allHeaders.get("x-error-type");

  const label =
    type === "blog" ? "blog post" : type === "library" ? "book" : "page";

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Graphic />
        {slug ? (
          <h2 className={styles.header}>
            On no! I couldn&apos;t find a {label} for <code>{slug}</code>
          </h2>
        ) : (
          <h2 className={styles.header}>
            Oh no! I couldn&apos;t find a matching resource
          </h2>
        )}
        <p>Don&apos;t worry, we&apos;ll get through this together.</p>
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
