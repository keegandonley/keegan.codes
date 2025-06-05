import { Avatar } from '@/components/Avatar';
import Link from 'next/link';
import linkedIn from '@/images/linkedin-dynamic.svg';
import X from '@/images/x-twitter.svg';
import Image from 'next/image';
import { Hr } from '@/components/Post/Hr';
import { BUCKET_URL } from '@/util/r2';
import '@/tw.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { merge } from '@keegancodes/foundations';
import { faArrowRight } from '@keegandonley/pro-solid-svg-icons';
import styles from '../../pageStyles/render25/render.module.css';
import '../../app/theme.css';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';

const rubik = localFont({
  src: [
    {
      path: '../../sharedFonts/Rubik.ttf',
      style: 'normal',
    },
  ],
});

const rye = localFont({
  src: [
    {
      path: '../../sharedFonts/Rye.ttf',
      style: 'normal',
    },
  ],
});

const carnivalee = localFont({
  src: [
    {
      path: '../../sharedFonts/Carnivalee.ttf',
      style: 'normal',
    },
  ],
});

const HiTrack = dynamic(() => import('@/components/Track/Hi'));

export default function Render25() {
  const skewYDeg = 0;
  const skewXDeg = 0;

  return (
    <>
      <div
        className={merge(
          'flex min-h-dvh flex-col items-center justify-start bg-render-bg pt-20',
          rubik.className,
        )}
      >
        <div className="flex max-w-[1000px] flex-col items-center justify-center px-5 text-center">
          <Avatar
            width={200}
            className="skew-x-[var(--dimension-2-deg)] skew-y-[var(--dimension-1-deg)] shadow-xl motion-safe:animate-fadeIn motion-safe:opacity-0"
            style={{
              '--dimension-1-deg': `${skewYDeg}deg`,
              '--dimension-2-deg': `${skewXDeg}deg`,
            }}
            priority
          />
          <div className="h-10" />
          <h1
            className={merge(
              'text-render-25-accent text-4xl font-bold motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-100',
              //   carnivalee.className,
            )}
            style={
              {
                //   textShadow: '3px 3px 0px var(--color-render-25-accent)',
              }
            }
          >
            Hello! My name is Keegan.
          </h1>
          <div className="flex gap-8 pt-8 motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-500">
            <Link href={'/linkedin'} className="text-render-25-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="mb-1 inline h-[40px] w-[40px]"
              >
                <path
                  d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <Link href={'/bsky'} className="text-render-25-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 680 512"
                version="1.1"
                className="mb-1 inline h-[40px] w-[40px]"
              >
                <path
                  d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
          <div className="h-8" />
          <p className="text-render-25-accent text-xl motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200">
            I'm a product-focused software engineer, currently working as a
            principal front-end engineer at{' '}
            <Link
              href="https://kizen.com"
              target="_blank"
              className="text-render-25-primary"
            >
              <strong>Kizen</strong>
            </Link>{' '}
            in Austin, Texas. I love all things React, Next.js, and performant
            web!
          </p>
          <div className="h-5" />
          <p className="text-render-25-accent text-xl motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200">
            I&apos;d love to connect on{' '}
            <Link href={'/linkedin'} className="text-render-25-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="mb-1 inline h-[20px] w-[20px]"
              >
                <path
                  d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                  fill="currentColor"
                />
              </svg>{' '}
              <strong>LinkedIn</strong>
            </Link>{' '}
            or{' '}
            <Link href={'/bsky'} className="text-render-25-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 680 512"
                version="1.1"
                className="mb-1 inline h-[30px] w-[30px]"
              >
                <path
                  d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            !
          </p>
          <div className="h-5" />
          <p className="text-render-25-accent text-xl motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200">
            I also write a{' '}
            <Link href="/blog" className="text-render-25-primary">
              <strong>blog</strong>
            </Link>{' '}
            about a number of topics, ranging from software to connected fitness
            and travel.
          </p>
          <Hr
            className="w-full motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200"
            style={{
              '--theme-blue-2': 'var(--color-render-accent)',
              '--theme-background': 'var(--color-render-bg)',
            }}
          />
          <div className="h-5" />
          <p className="text-render-25-accent text-xl motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200">
            Want to grab a coffee? Happy hour? A bite to eat? I love meeting new
            people at conferences like Render, so let&apos;s connect!
          </p>
          <div className="h-20" />
          <h2 className="text-render-25-accent text-xl motion-safe:animate-fadeIn motion-safe:opacity-0 motion-safe:animation-delay-200">
            <strong>Some of My Blog Posts:</strong>
          </h2>
          <div className="h-10" />
          <div className="motion-safe:animation-delay-400 grid w-full grid-cols-1 grid-rows-3 gap-4 motion-safe:animate-fadeIn motion-safe:opacity-0 sm:grid-cols-3 sm:grid-rows-1">
            <Link
              href="/blog/ai-app-in-72-hours?source=render25"
              className="text-render-25-accent overflow-hidden rounded-lg text-left shadow-xl"
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
              href="/blog/using-javascript-variables-in-tailwind?source=render25"
              className="text-render-25-accent overflow-hidden rounded-lg text-left shadow-xl"
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
              href="/blog/mastering-react-component-callbacks-with-currying?source=render25"
              className="text-render-25-accent overflow-hidden rounded-lg text-left shadow-xl"
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
              '--theme-blue-2': 'var(--color-render-accent)',
              '--theme-background': 'var(--color-render-bg)',
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
      <HiTrack slug="render25" qrScanned={false} />
    </>
  );
}
