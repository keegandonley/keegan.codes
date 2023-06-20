import { Paragraph } from "@/components/Paragraph";
import styles from "./hi.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URLS } from "@/components/Social/socials";
import { merge } from "@/util/classNames";
import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

export const runtime = "experimental-edge";

export default function RenderPage() {
  return (
    <div className={styles.content}>
      <Paragraph className={merge(styles.firstParagraph, styles.paragraph)}>
        My name is <strong className={styles.name}>Keegan Donley</strong>, and
        I&apos;m currently a principal font-end engineer at{" "}
        <Link
          href="https://kizen.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Kizen</strong>
        </Link>
        . I love all things React, NextJS, and performant web!
      </Paragraph>
      <Paragraph className={styles.paragraph}>
        I&apos;d love to connect on{" "}
        <Link href={URLS.linkedIn} target="_blank" rel="noopener noreferrer">
          <strong>
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </strong>
        </Link>{" "}
        and on{" "}
        <Link href={URLS.twitter} target="_blank" rel="noopener noreferrer">
          <strong>
            <FontAwesomeIcon icon={faTwitter} /> Twitter
          </strong>
        </Link>
        !
      </Paragraph>
      <Paragraph className={styles.paragraph}>
        I also write a{" "}
        <Link href="/blog">
          <strong>blog</strong>
        </Link>{" "}
        about a number of topics, ranging from software to fitness to travel.
      </Paragraph>
    </div>
  );
}
