import { merge } from '@/util/classNames';
import localFont from 'next/font/local';
import '@/tw.css';
import Link from 'next/link';
import { Avatar } from '@/components/Avatar';
import Image from 'next/image';
import linkedIn from '@/images/linkedin-miami.svg';
import X from '@/images/x-twitter-miami.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@keegandonley/pro-solid-svg-icons';
import styles from '@/pageStyles/miami24/miami.module.css';
import '@/app/globals.css';
import '@/app/theme.css';

const yellowTail = localFont({
  src: [
    {
      path: '../../sharedFonts/Yellowtail.ttf',
      style: 'normal',
    },
  ],
});

const comfortaa = localFont({
  src: [
    {
      path: '../../sharedFonts/Comfortaa.ttf',
      style: 'normal',
    },
  ],
});

export default function Miami24() {
  return (
    <div
      className={merge(
        'flex min-h-dvh w-full justify-center bg-sand px-2 pt-12',
      )}
    >
      <div className="flex max-w-[800px] flex-col justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="mx-auto w-32"
        >
          <path
            className="fa-secondary fill-pink"
            opacity=".4"
            d="M248.4 206.9c4 10.8 7.8 26.2 9.7 47.2c4.2 46.5-1.6 116.8-32.7 216.4c-3 9.7-1.3 20.3 4.8 28.5s15.6 13 25.8 13h64c16.1 0 29.8-12 31.8-28c12.4-99-2.3-207.2-31.7-292H272c-2.5 0-5-.6-7.1-1.7l-16.5 16.5z"
          />
          <path
            className="fa-primary fill-pink"
            d="M133.2 141.9L102.9 91.4c-3.1-5.2-10.6-5.2-13.7 0L69.5 124.1c-1.4 2.4-4 3.9-6.9 3.9H16c-8.8 0-16.1-7.2-14.4-15.9C10.7 64.2 59.6 0 160 0c88 0 136.5 49.4 153.2 93.8C338.4 76.2 372.3 64 416 64c100.4 0 149.3 64.2 158.4 112.1c1.7 8.7-5.6 15.9-14.4 15.9H513.3c-2.8 0-5.4-1.5-6.9-3.9l-19.6-32.7c-3.1-5.2-10.6-5.2-13.7 0l-19.6 32.7c-1.4 2.4-4.1 3.9-6.9 3.9H272c-2.5 0-5-.6-7.1-1.7L109.8 345.5c-6.2 6.2-16.5 6.3-21.4-1C61 304.1 50.2 224.1 121.1 153.1c4-4 8-7.7 12-11.2z"
          />
        </svg>
        <h1
          className={merge(
            'text-balance px-6 pb-6 pt-6 text-center text-6xl font-extrabold text-teal',
            yellowTail.className,
          )}
        >
          Nice to meet you!
        </h1>
        <p
          className={merge(
            comfortaa.className,
            'text-balance px-4 pt-6 text-center text-2xl leading-[1.7] text-gray-800',
          )}
        >
          My name is <strong>Keegan Donley</strong>, and I&apos;m currently a{' '}
          <strong>principal front-end engineer</strong> at{' '}
          <Link className="text-pink" href="https://kizen.com" target="blank">
            Kizen
          </Link>
          . I love all things React, Next.js, and performant web!
        </p>
        <p
          className={merge(
            comfortaa.className,
            'flex w-full items-center justify-center gap-12 px-4 pt-8',
          )}
        >
          <Link href={'/linkedin'}>
            <Image
              src={linkedIn}
              alt="LinkedIn"
              className="mb-1 inline"
              height={50}
              width={50}
              priority
            />
          </Link>
          <Link href={'/twitter'}>
            <Image
              src={X}
              alt="X (Twitter)"
              className="mb-1 inline"
              height={50}
              width={50}
              priority
            />
          </Link>
        </p>
        <div>
          <div className={merge(styles.blogButton)}>
            <Link href="/blog" scroll className={merge(styles.blogButtonText)}>
              <span className={merge(styles.blogInner, comfortaa.className)}>
                My Blog
              </span>
            </Link>
          </div>
        </div>
        <div className="pb-20 pt-6">
          <Avatar
            width={150}
            className="pointer-events-none select-none sepia-[.45]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
