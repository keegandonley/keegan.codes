import { Avatar } from "@/components/Avatar";
import Link from "next/link";
import linkedIn from "@/images/linkedin.svg";
import X from "@/images/x-twitter.svg";
import Image from "next/image";
import { Hr } from "@/components/Post/Hr";
import { BUCKET_URL } from "@/util/r2";
import { HiTrack } from "@/components/Track/Hi";
import "@/tw.css";

export default function render24() {
  const skewYDeg = 0;
  const skewXDeg = 0;

  return (
    <>
      <div
        className={`bg-render-bg min-h-dvh flex flex-col items-center justify-start pt-20`}
      >
        <div className="max-w-[1000px] flex flex-col items-center justify-center text-center px-5">
          <Avatar
            width={200}
            className="skew-y-[var(--dimension-1-deg)] skew-x-[var(--dimension-2-deg)] grayscale shadow-xl"
            style={{
              "--dimension-1-deg": `${skewYDeg}deg`,
              "--dimension-2-deg": `${skewXDeg}deg`,
            }}
            priority
          />
          <div className="h-10" />
          <h1 className="text-render-text text-4xl font-bold font-serif">
            Hi there! It&apos;s nice to meet you!
          </h1>
          <div className="h-5" />
          <p className="text-render-text text-xl font-serif">
            My name is <strong>Keegan Donley</strong>, and I&apos;m currently a
            principal front-end engineer at{" "}
            <Link
              href="https://kizen.com"
              target="_blank"
              className="text-render-accent"
            >
              <strong>Kizen</strong>
            </Link>
            . I love all things React, NextJS, and performant web!
          </p>
          <div className="h-5" />
          <p className="text-render-text text-xl font-serif">
            I&apos;d love to connect on{" "}
            <Link href={"/linkedin"} className="text-render-accent">
              <Image
                src={linkedIn}
                alt="LinkedIn"
                className="inline mb-1"
                height={20}
                width={20}
                priority
              />{" "}
              <strong>LinkedIn</strong>
            </Link>{" "}
            or{" "}
            <Link href={"/twitter"} className="">
              <Image
                src={X}
                alt="X (Twitter)"
                className="inline mb-1"
                height={20}
                width={20}
                priority
              />
            </Link>
            !
          </p>
          <div className="h-5" />
          <p className="text-render-text text-xl font-serif">
            I also write a{" "}
            <Link href="/blog" className="text-render-accent">
              <strong>blog</strong>
            </Link>{" "}
            about a number of topics, ranging from software to fitness to
            travel.
          </p>
          <Hr
            className="w-full"
            style={{
              "--theme-blue-2": "var(--color-render-accent)",
              "--theme-background": "var(--color-render-bg)",
            }}
          />
          <div className="h-5" />
          <p className="text-render-text text-xl font-serif">
            Want to grab a coffee? Happy hour? A bite to eat? I love meeting new
            people at conferences like Render, so let&apos;s connect!
          </p>
          <div className="h-20" />
          <h2 className="text-render-text text-xl font-serif">
            <strong>Some of My Blog Posts:</strong>
          </h2>
          <div className="h-10" />
          <div className="grid grid-rows-3 grid-cols-1 sm:grid-cols-3 sm:grid-rows-1 w-full gap-4">
            <Link
              href="/blog/using-javascript-variables-in-tailwind?source=render24"
              className="shadow-xl text-left rounded-lg overflow-hidden font-serif text-render-text"
            >
              <div className="h-36">
                <Image
                  src={`${BUCKET_URL}/tailwind-variables-cover.png`}
                  alt="Cover"
                  width={2900}
                  height={892}
                  blurDataURL="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIABAAMgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AKuqW/kgxgc1Bpce1iXbmrct3/aswCLyaWLT5IbgLJwDXu1JQcPM+apRqqr/AHSOe7mkuhGrnFPuJJYVGWzVv+z0M2V61He6bcbc9a5b23O63NsV7e8JjIA5onvU8rZIPlojtXgt2cjmqzWvnxEv3q4OGtzOoqmliqbmwz90UfabD+6Kk/sOI/xUf2FF/equUPeP/9k="
                  className="object-cover h-full"
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
              href="/blog/generating-css-variables-from-a-custom-tailwind-theme?source=render24"
              className="shadow-xl text-left rounded-lg overflow-hidden font-serif text-render-text"
            >
              <div className="h-36">
                <Image
                  src={`${BUCKET_URL}/tailwind-css-variables-post-cover.png`}
                  alt="Cover"
                  width={2752}
                  height={1024}
                  blurDataURL="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIABMAMgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOCisUF6fM5Jq0ZZLC4Gw4FVBK8kyyKMmtaSzkuolfHNaU43jqcrZ1vh7UzeQ4c/MBUWqXjCVkY8Cs7RQNPzJI2BWVr+ri4nZYT19KUoJRsjN7jNS1VpMwxniqBljtbRnfG4io0t5I4jM9YeoXbSkrnisZU0lZG9KF3cia9y7H3pPttUc+1GfanZHXynX6KS5G7mt9pXVcBsCuf0PqK3n6Gt4fCcM9yleTSeUfnNY8RLXK555rVvP9UayYP+PlfrWcDNbmxq5K6cNvHFcKSWuME55rudZ/5Bw+lcMP8Aj5/GsY7s76GxrLbxbR8g6UfZ4v7gqRfuj6Uteikh3P/Z"
                  className="object-cover h-full"
                  placeholder="blur"
                  sizes={`(max-width: 550px) 100vw, 310px`}
                />
              </div>
              <div className="p-4">
                <h3>
                  <strong>
                    Generating CSS Variables From a Custom Tailwind Theme
                  </strong>
                </h3>
                <div className="h-2" />
                <p className="text-justify">
                  How to access a custom Tailwind theme as CSS variables, and
                  why it&apos;s a useful pattern
                </p>
              </div>
            </Link>
            <Link
              href="/blog/mastering-react-component-callbacks-with-currying?source=render24"
              className="shadow-xl text-left rounded-lg overflow-hidden font-serif text-render-text"
            >
              <div className="h-36">
                <Image
                  src={`${BUCKET_URL}/react-currying-cover.png`}
                  alt="Cover"
                  width={3456}
                  height={1024}
                  blurDataURL="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAA8AMgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/ANq0uS0RcdcVfsNQJyM81xtrrKqzRgHDUlpq7Q3bLzjNKaVa/J5MmknRk1LuzodV1QWYdifnbpXF3O6/uwW571talIl4gZs5FZ9rJGkxBHOKrSEbsd+eSiiG20OG8kYkDKetaljbWvMFwo29Ky57uSFpHiJBrITxKFZopAS+etRzKa0ZqqfI7s7E+EtHYk7055o/4RDR/wC+lcl/aUx5DNg+9H9oz/3m/Ot/ZT7mftI9j//Z"
                  className="object-cover h-full"
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
              "--theme-blue-2": "var(--color-render-accent)",
              "--theme-background": "var(--color-render-bg)",
            }}
          />
          <div className="h-5" />
        </div>
      </div>
      <HiTrack slug="render24" qrScanned={false} />
    </>
  );
}
