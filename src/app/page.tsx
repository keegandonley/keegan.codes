import { HeroText } from "@/components/Hero/Text";
import { HeroBlock } from "@/components/Hero/Block";
import { Social } from "@/components/Social";
import { Paragraph } from "@/components/Paragraph";
import Link from "next/link";
import styles from "./home.module.css";
import posts from "../posts";

export default function Home() {
  const postCount = Object.keys(posts).length;

  return (
    <>
      <HeroBlock isHomePage collapse>
        <HeroText className={styles.name}>Keegan Donley</HeroText>
      </HeroBlock>
      <Social />
      <section className={styles.content}>
        <Paragraph className={styles.paragraph}>
          Hi there! I&apos;m a <strong>full-stack engineer</strong> located in
          Austin, Texas. I love solving challenging problems for the web, and
          building applications that are performant, accessible, and easy to
          use.
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          I&apos;m currently working as a{" "}
          <strong>principal front-end engineer</strong> at{" "}
          <Link href="https://kizen.com">
            <strong>Kizen</strong>
          </Link>
          .
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          I currently have {postCount} posts on{" "}
          <Link href="/blog">
            <strong>my blog</strong>
          </Link>
          , with topics ranging from software and web development, to connected
          fitness and travel.
        </Paragraph>
      </section>
    </>
  );
}
