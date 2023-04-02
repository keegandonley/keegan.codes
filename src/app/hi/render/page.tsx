import { Paragraph } from "@/components/Paragraph";
import renderLogo from "./render-logo.svg";
import Image from "next/image";
import styles from "./render.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Social } from "@/components/Social";
import { URLS } from "@/components/Social/socials";
import { merge } from "@/util/classNames";

export default function RenderPage() {
  return (
    <div className={styles.wrapper}>
      <Paragraph className={merge(styles.firstParagraph, styles.paragraph)}>
        My name is Keegan Donley, and I&apos;m currently a principal font-end
        engineer at{" "}
        <Link
          href="https://kizen.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Kizen</strong>
        </Link>
        .
      </Paragraph>
      <Paragraph className={styles.paragraph}>
        I'd love to connect on{" "}
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
      <div className={styles.renderLogoContainer}>
        <Image
          src={renderLogo}
          alt="Render Logo"
          className={styles.renderLogo}
        />
      </div>
    </div>
  );
}
