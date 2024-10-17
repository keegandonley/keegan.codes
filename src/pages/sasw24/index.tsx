import { Avatar } from '@/components/Avatar';
import Link from 'next/link';
import linkedIn from '@/images/linkedin-sasw.svg';
import X from '@/images/x-twitter-sasw.svg';
import Image from 'next/image';
import { Hr } from '@/components/Post/Hr';
import { BUCKET_URL } from '@/util/r2';
import '@/tw.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { merge } from '@keegancodes/foundations';
import { faArrowRight } from '@keegandonley/pro-solid-svg-icons';
import styles from '../../pageStyles/sasw24/sasw.module.css';
import '../../app/theme.css';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';

const HiTrack = dynamic(() => import('@/components/Track/Hi'));

const rubik = localFont({
  src: [
    {
      path: '../../sharedFonts/Rubik.ttf',
      style: 'normal',
    },
  ],
});

export default function SASW24() {
  const skewYDeg = 0;
  const skewXDeg = 0;

  return (
    <>
      <div className="bg-sasw-primary flex min-h-dvh flex-col items-center justify-start pt-20">
        <div
          className={merge(
            rubik.className,
            'flex max-w-[1000px] flex-col items-center justify-center px-5 text-center',
          )}
        >
          <Avatar
            width={200}
            className="skew-x-[var(--dimension-2-deg)] skew-y-[var(--dimension-1-deg)] border-0 shadow-xl contrast-125 motion-safe:animate-fadeIn motion-safe:opacity-0"
            style={{
              '--dimension-1-deg': `${skewYDeg}deg`,
              '--dimension-2-deg': `${skewXDeg}deg`,
            }}
            priority
          />
          <div className="h-10" />
          <h1
            className={merge(
              rubik.className,
              'text-4xl font-bold text-white motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-100',
            )}
          >
            Hi there! It&apos;s nice to meet you!
          </h1>
          <div className="flex gap-8 pt-8 motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-500">
            <Link href={'/linkedin'} className="text-sasw-secondary">
              <Image
                src={linkedIn}
                alt="LinkedIn"
                className="mb-1 inline"
                height={40}
                width={40}
                priority
              />
            </Link>
            <Link href={'/twitter'} className="">
              <Image
                src={X}
                alt="X (Twitter)"
                className="mb-1 inline"
                height={40}
                width={40}
                priority
              />
            </Link>
          </div>
          <div className="h-8" />
          <p className="text-xl text-white motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200">
            My name is <strong>Keegan Donley</strong>, and I&apos;m currently a
            principal front-end engineer at{' '}
            <Link
              href="https://kizen.com"
              target="_blank"
              className="text-sasw-secondary"
            >
              <strong>Kizen</strong>
            </Link>{' '}
            in Austin, Texas. I love all things React, Next.js, and performant
            web!
          </p>
          <div className="h-5" />
          <p className="text-xl text-white motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200">
            I&apos;d love to connect on{' '}
            <Link href={'/linkedin'} className="text-sasw-secondary">
              <Image
                src={linkedIn}
                alt="LinkedIn"
                className="mb-1 inline"
                height={20}
                width={20}
                priority
              />{' '}
              <strong>LinkedIn</strong>
            </Link>{' '}
            or{' '}
            <Link href={'/twitter'} className="text-nowrap">
              <Image
                src={X}
                alt="X (Twitter)"
                className="mb-1 inline"
                height={20}
                width={20}
                priority
              />
            </Link>
            !
          </p>
          <div className="h-5" />
          <p className="text-xl text-white motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200">
            I also write a{' '}
            <Link href="/blog" className="text-sasw-secondary">
              <strong>blog</strong>
            </Link>{' '}
            about a number of topics, ranging from software to connected fitness
            and travel.
          </p>
          <Hr
            className="w-full motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200"
            style={{
              '--theme-blue-2': 'var(--color-sasw-secondary)',
              '--theme-background': 'var(--color-sasw-primary)',
            }}
          />
          <div className="h-10" />
          <h2 className="text-xl text-white motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200">
            <strong>Some of My Blog Posts:</strong>
          </h2>
          <div className="h-10" />
          <div className="motion-safe:animation-delay-400 grid w-full grid-cols-1 grid-rows-3 gap-4 motion-safe:animate-fadeIn motion-safe:opacity-0 sm:grid-cols-3 sm:grid-rows-1">
            <Link
              href="/blog/ai-app-in-72-hours?source=sasw24"
              className="overflow-hidden border-4 text-left text-white shadow-xl"
              style={{
                borderImage:
                  'linear-gradient(to top, var(--color-sasw-secondary), orange, var(--theme-yellow), transparent) 1',
              }}
            >
              <div className="h-36">
                <Image
                  src={`${BUCKET_URL}/thirsty-bot-deep-dive-cover.png`}
                  alt="Cover"
                  width={2752}
                  height={1024}
                  blurDataURL="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIABEAMgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOYl07CVAthgcVee6UxDJ5qAXK46181eRx3kZdzaEvirNtYgKKhuboebwat210uBk1pJy5S5OXKQ3FgMZIp9nZZU4FT3N2mzinWV4gQjvUc0uUjmnylNrVgx570n2ZvWpXnJduO9J5x9K194fNMil6VD2NTS9Kh7GktjUpS/6z8asRdKry/6z8asRdK1lsN7DpOlPtvvUyTpT7b71R0F0LJ60UHrRXQZn//Z"
                  className="h-full object-cover"
                  placeholder="blur"
                  sizes={`(max-width: 550px) 100vw, 310px`}
                />
              </div>
              <div className="p-4">
                <h3>
                  <strong>
                    Building an AI-Powered Web Application in 72 Hours
                  </strong>
                </h3>
                <div className="h-2" />
                <p className="text-justify">
                  A technical deep dive into Thirsty Bot, an AI-powered cocktail
                  generator I built over a weekend
                </p>
              </div>
            </Link>
            <Link
              href="/blog/using-javascript-variables-in-tailwind?source=sasw24"
              className="overflow-hidden border-4 text-left text-white shadow-xl"
              style={{
                borderImage:
                  'linear-gradient(to top, var(--color-sasw-secondary), orange, var(--theme-yellow), transparent) 1',
              }}
            >
              <div className="h-36">
                <Image
                  src={`${BUCKET_URL}/tailwind-variables-cover.png`}
                  alt="Cover"
                  width={2900}
                  height={892}
                  blurDataURL="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIABAAMgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AKuqW/kgxgc1Bpce1iXbmrct3/aswCLyaWLT5IbgLJwDXu1JQcPM+apRqqr/AHSOe7mkuhGrnFPuJJYVGWzVv+z0M2V61He6bcbc9a5b23O63NsV7e8JjIA5onvU8rZIPlojtXgt2cjmqzWvnxEv3q4OGtzOoqmliqbmwz90UfabD+6Kk/sOI/xUf2FF/equUPeP/9k="
                  className="h-full object-cover"
                  placeholder="blur"
                  sizes={`(max-width: 550px) 100vw, 310px`}
                />
              </div>
              <div className="p-4">
                <h3>
                  <strong>Using Javascript Variables in Tailwind</strong>
                </h3>
                <div className="h-2" />
                <p className="text-justify">
                  How to use dynamically calculated or user generated values in
                  Tailwind
                </p>
              </div>
            </Link>
            <Link
              href="/blog/mastering-react-component-callbacks-with-currying?source=sasw24"
              className="overflow-hidden border-4 text-left text-white shadow-xl"
              style={{
                borderImage:
                  'linear-gradient(to top, var(--color-sasw-secondary), orange, var(--theme-yellow), transparent) 1',
              }}
            >
              <div className="h-36">
                <Image
                  src={`${BUCKET_URL}/react-currying-cover.png`}
                  alt="Cover"
                  width={3456}
                  height={1024}
                  blurDataURL="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAA8AMgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/ANq0uS0RcdcVfsNQJyM81xtrrKqzRgHDUlpq7Q3bLzjNKaVa/J5MmknRk1LuzodV1QWYdifnbpXF3O6/uwW571talIl4gZs5FZ9rJGkxBHOKrSEbsd+eSiiG20OG8kYkDKetaljbWvMFwo29Ky57uSFpHiJBrITxKFZopAS+etRzKa0ZqqfI7s7E+EtHYk7055o/4RDR/wC+lcl/aUx5DNg+9H9oz/3m/Ot/ZT7mftI9j//Z"
                  className="h-full object-cover"
                  placeholder="blur"
                  sizes={`(max-width: 550px) 100vw, 310px`}
                />
              </div>
              <div className="p-4">
                <h3>
                  <strong>
                    Mastering React Component Callbacks with Currying
                  </strong>
                </h3>
                <div className="h-2" />
                <p className="text-justify">
                  How to use functional currying to make React callbacks more
                  clear and maintainable
                </p>
              </div>
            </Link>
          </div>
          <div className="h-5" />
          <Hr
            className="w-full"
            style={{
              '--theme-blue-2': 'var(--color-sasw-secondary)',
              '--theme-background': 'var(--color-sasw-primary)',
            }}
          />
          <div
            className={merge(
              styles.blogButton,
              'motion-safe:animate-fadeIn motion-safe:opacity-0',
            )}
          >
            <Link href="/blog" scroll className={merge(styles.blogButtonText)}>
              <span className={styles.blogInner}>
                More Blog Posts{' '}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={styles.buttonIcon}
                />
              </span>
            </Link>
          </div>
          <div className="h-5" />
        </div>
      </div>
      <HiTrack slug="sasw24" qrScanned={false} />
    </>
  );
}
