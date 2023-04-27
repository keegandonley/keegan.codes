import { HeroText } from "@/components/Hero/Text";
import { HeroBlock } from "@/components/Hero/Block";
import { Social } from "@/components/Social";
import { Paragraph } from "@/components/Paragraph";
import Link from "next/link";
import styles from "./home.module.css";
import { postCount } from "../post-count";
import { postCount as bookCount } from "../book-count";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { Footer } from "@/components/Footer";
import { Swoop } from "@/components/Swoop";
import Posts from "@/posts";
import { Post } from "@/types/post";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Fallback as BlogPreviewFallback } from "@/components/BlogPreview/Fallback";

const DynamicBlogPreview = dynamic(() => import("@/components/BlogPreview"));

export const runtime = "experimental-edge";

export default function Home() {
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

  return (
    <>
      <Swoop />
      <HeroBlock isHomePage collapse>
        <HeroText className={styles.name}>Keegan Donley</HeroText>
      </HeroBlock>
      <Social />
      <div className={styles.cta}>
        <div className={styles.menu}>
          Developer, maker, and lifelong learner
        </div>
      </div>
      <section className={styles.content}>
        <h1 className={styles.sectionHeader}>Hi There, I&apos;m Kegan!</h1>
        <Paragraph className={styles.paragraph}>
          I&apos;m a <strong>full-stack engineer</strong> located in Austin,
          Texas.
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          I love solving challenging problems for the web, and building
          applications that are performant, accessible, and easy to use.
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          I&apos;m currently working as a{" "}
          <strong>principal front-end engineer</strong> at{" "}
          <Link href="https://kizen.com">
            <strong>Kizen</strong>
          </Link>
          .
        </Paragraph>
        <Suspense fallback={<BlogPreviewFallback />}>
          <DynamicBlogPreview posts={posts} />
        </Suspense>
        <div className={styles.blogButton}>
          <Link href="/blog" className={styles.blogButtonText}>
            Read more on my blog <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <h1 className={styles.sectionHeader}>Always Learning</h1>
        <Paragraph className={styles.paragraph}>
          I strive to be always learning, and will share as much as I can about
          my passions here on my website. My favorite projects combine software,
          hardware, hobby electronics, and more!
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          To that end, I currently have {postCount} posts on{" "}
          <Link href="/blog">
            <strong>my blog</strong>
          </Link>
          , with topics ranging from software and web development, to
          electronics, connected fitness and travel. Come join me and follow
          along as I work to build a better web!
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          I also have {bookCount} books on{" "}
          <Link href="/library">
            <strong>my reading list</strong>
          </Link>
          . Books I read range anywhere from business and software to fantasy
          and fiction.
        </Paragraph>
      </section>
      <Footer />
    </>
  );
}
