import { Suspense } from 'react';
import { ScanTracker } from '../ScanTracker';
import { Paragraph } from '@/components/Paragraph';
import styles from './tailwind.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { URLS } from '@/components/Social/socials';
import { merge } from '@/util/classNames';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import tailwindLogo from './tailwind.png';

interface TailwindProps {
  searchParams: Promise<{ scan: string }>;
}

export default async function TailwindPage(props: TailwindProps) {
  return (
    <div className={styles.wrapper}>
      <Paragraph className={merge(styles.firstParagraph, styles.paragraph)}>
        My name is Keegan Donley, and I&apos;m currently a principal font-end
        engineer at{' '}
        <Link
          href="https://kizen.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Kizen</strong>
        </Link>
        . I love all things React, Next.js, and performant web!
      </Paragraph>
      <Paragraph className={styles.paragraph}>
        I&apos;d love to connect on{' '}
        <Link href={URLS.linkedIn} target="_blank" rel="noopener noreferrer">
          <strong>
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </strong>
        </Link>{' '}
        and on{' '}
        <Link href={URLS.twitter} target="_blank" rel="noopener noreferrer">
          <strong>
            <FontAwesomeIcon icon={faTwitter} /> Twitter
          </strong>
        </Link>
        !
      </Paragraph>
      <Paragraph className={styles.paragraph}>
        I also write a{' '}
        <Link href="/blog">
          <strong>blog</strong>
        </Link>{' '}
        about a number of topics, ranging from software to fitness to travel.
      </Paragraph>
      <div className={styles.tailwindLogoContainer}>
        <Image
          src={tailwindLogo}
          alt="Tailwind Logo"
          className={styles.tailwindLogo}
          width={80}
        />
      </div>
      <Suspense fallback={null}>
        <ScanTracker slug="tailwind" searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
