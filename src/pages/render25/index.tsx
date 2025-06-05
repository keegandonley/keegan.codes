import { Avatar } from '@/components/Avatar';
import Link from 'next/link';
import Image from 'next/image';
import { Hr } from '@/components/Post/Hr';
import { BUCKET_URL } from '@/util/r2';
import '@/tw.css';
import { merge } from '@keegancodes/foundations';
import styles from '../../pageStyles/render25/render.module.css';
import '../../pageStyles/render25/render.css';
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

const roboto = localFont({
  src: [
    {
      path: '../../sharedFonts/Roboto.ttf',
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
          'flex min-h-dvh flex-col items-center justify-start pt-20',
          rubik.className,
        )}
      >
        <div id="grad" />

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
          <div className="text-render-25-primary z-50 flex gap-x-6 pt-6">
            <Link
              href="/linkedin"
              className="hover:text-render-25-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-12 w-12"
              >
                <path
                  d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <Link
              href="/bluesky"
              className="hover:text-render-25-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-12 w-12"
              >
                <path
                  fill="currentColor"
                  d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM224 247.4c14.5-30 54-85.8 90.7-113.3c26.5-19.9 69.3-35.2 69.3 13.7c0 9.8-5.6 82.1-8.9 93.8c-11.4 40.8-53 51.2-90 44.9c64.7 11 81.2 47.5 45.6 84c-67.5 69.3-97-17.4-104.6-39.6c0 0 0 0 0 0l-.3-.9c-.9-2.6-1.4-4.1-1.8-4.1s-.9 1.5-1.8 4.1c-.1 .3-.2 .6-.3 .9c0 0 0 0 0 0c-7.6 22.2-37.1 108.8-104.6 39.6c-35.5-36.5-19.1-73 45.6-84c-37 6.3-78.6-4.1-90-44.9c-3.3-11.7-8.9-84-8.9-93.8c0-48.9 42.9-33.5 69.3-13.7c36.7 27.5 76.2 83.4 90.7 113.3z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <span className="z-50">
          <p
            className={merge(
              'text-render-25-accent px-12 pt-8 text-center text-5xl font-extrabold leading-[4rem]',
              roboto.className,
              styles.textShadowSmall,
            )}
          >
            Hi, I&apos;m Keegan!
          </p>
          <p
            className={merge(
              'text-render-25-accent text-shadow-sm max-w-[800px] px-6 pt-4 text-center text-2xl leading-[2.2rem]',
              rubik.className,
              styles.textShadowSmall,
            )}
          >
            I&apos;m currently a principal front-end engineer at{' '}
            <Link href="https://kizen.com">Kizen</Link> in Austin, Texas. I love
            all things React, Next.js, and performant web!
          </p>
          <p
            className={merge(
              'text-render-25-accent text-shadow-sm max-w-[800px] px-6 pt-12 text-center text-2xl leading-[2.2rem]',
              rubik.className,
              styles.textShadowSmall,
            )}
          >
            I also write a <Link href="/blog">blog</Link> about a number of
            topics, ranging from software to connected fitness and travel.
          </p>
        </span>
        <Hr
          className="z-50 w-full max-w-[500px]"
          style={{
            '--theme-blue-2': 'var(--color-render-25-primary)',
            '--theme-background': 'transparent',
          }}
        />
        <div className="motion-safe:animation-delay-400 z-50 grid w-full max-w-[1100px] grid-cols-1 grid-rows-3 gap-4 px-12 pb-12 pt-12 motion-safe:animate-fadeIn motion-safe:opacity-0 sm:grid-cols-3 sm:grid-rows-1">
          <Link
            href="/blog/what-is-a-product-focused-software-engineer?source=render24"
            className="text-render-25-accent bg-render-25-burst-1 overflow-hidden rounded-lg text-left shadow-xl"
          >
            <div className="h-36">
              <Image
                src={`${BUCKET_URL}/product-focused-engineer-cover-compressed.png`}
                alt="Cover"
                width={3456}
                height={1024}
                blurDataURL="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIABwAMgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOilt5bvqDSx6HgbiK6+305F4xViWyATgV70sZZ2R87HAX96W5yAtikZTFY11pheXOK7v+zssSRVW408A9KuGIimZVMJJow9L05EA3AUzWLFNhKgZrbS2ZeAKkbS3mTLCpdRKfM2WqDcORI86No+TxSfZH9K7w6Gufu0f2Gv92uj61A5fqNQ6hAQM1IGz1pqHNOPFeMz6BCkDtVeWMMelWVAIpkg5pJ2Y2tCGO3QckVZyix4wKiBqOQnHWm1diTtsRkjJ4oyPSo6KuxFz//Z"
                className="h-full object-cover"
                placeholder="blur"
                sizes={`(max-width: 550px) 100vw, 310px`}
              />
            </div>
            <div className="p-4">
              <h3>
                <strong>What is a Product-Focused Software Engineer?</strong>
              </h3>
              <div className="h-2" />
              <p className="text-justify">
                Job descriptions and titles can be tricky! For the last few
                years, I&apos;'ve called myself a "product-focused software
                engineer." What does that mean to me, and why do I like the
                term?
              </p>
            </div>
          </Link>
          <Link
            href="/blog/ai-app-in-72-hours?source=render24"
            className="text-render-25-accent bg-render-25-burst-1 overflow-hidden rounded-lg text-left shadow-xl"
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
            href="/blog/using-javascript-variables-in-tailwind?source=render24"
            className="text-render-25-accent bg-render-25-burst-1 overflow-hidden rounded-lg text-left shadow-xl"
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
        </div>
      </div>
      <HiTrack slug="render25" qrScanned={false} />
    </>
  );
}
