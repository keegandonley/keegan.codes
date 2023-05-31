import { Paragraph } from "@/components/Paragraph";
import renderLogo from "./render-logo.svg";
import Image from "next/image";
import styles from "./render.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URLS } from "@/components/Social/socials";
import { merge } from "@/util/classNames";
import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { EmbedScript, EmbedTarget } from "@/components/Calendly";
import { Hr } from "@/components/Post/Hr";
import { HiTrack } from "@/components/Track/Hi";

export const runtime = "experimental-edge";

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

      <Hr theme="ff88df" />
      <Paragraph>
        Want to grab a coffee? Happy hour? A bite to eat? I love meeting new
        people at conferences like this, so feel free to schedule a time to
        connect!
      </Paragraph>
      <EmbedTarget
        meeting="render"
        color="ff88df"
        textColor="20417b"
        primaryColor="20417b"
      />
      <div className={styles.renderLogoContainer}>
        <Image
          src={renderLogo}
          alt="Render Logo"
          className={styles.renderLogo}
        />
      </div>
      <EmbedScript />
      <HiTrack slug="render" qrScanned />
    </div>
  );
}
