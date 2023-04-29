import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./shortCode.module.css";
import { faRadar } from "@fortawesome/pro-solid-svg-icons";
import Posts from "@/posts";
import { Post } from "@/types/post";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { BASEURL, NAME } from "@/metadata";

const posts = Object.keys(Posts).map((key) => {
  const component = (Posts as any)[key] as Post;
  return {
    title: component.title,
    slug: component.slug,
    tags: component.tags ?? [],
    description: component.description,
    cover: component.cover,
    published: component.published,
    shortCodes: component.shortCodes,
  };
});

interface ShortCodePageProps {
  params: {
    shortCode: string;
  };
}

export async function generateMetadata({
  params: { shortCode },
}: ShortCodePageProps): Promise<Metadata> {
  const found = posts.find((post) => post.shortCodes?.includes(shortCode));

  if (!found) {
    return {
      title: `Error · ${NAME}`,
      openGraph: {
        title: `Error · ${NAME}`,
        description: "You've found an invalid short code!",
        url: `${BASEURL}/${shortCode}`,
        siteName: NAME,
        locale: "en_US",
        authors: ["Keegan Donley"],
        images: [
          {
            url: `/api/og/error?value=${shortCode}`,
            width: 1200,
            height: 600,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `Error · ${NAME}`,
        description: "You've found an invalid short code!",
        creator: "@keegandonley",
        images: [`/api/og/error?value=${shortCode}`],
      },
    };
  }

  return {
    title: NAME,
  };
}

export const runtime = "experimental-edge";

export default async function ShortCodePage({
  params: { shortCode },
}: ShortCodePageProps) {
  const foundPost = posts.find((post) => post.shortCodes?.includes(shortCode));

  if (foundPost?.slug) {
    redirect(`/blog/${foundPost.slug}`);
  }

  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon icon={faRadar} className={styles.icon} />
      <h2 className={styles.h1}>
        Oops! <pre className={styles.pre}>{shortCode}</pre> doesn&apos;t seem to
        exist
      </h2>
      <p className={styles.p}>
        This is Keegan&apos;s URL shortening service, but I don&apos;t know how
        to shorten this URL! Please double check that <em>{shortCode}</em> is
        what you meant to type.
      </p>
    </div>
  );
}
