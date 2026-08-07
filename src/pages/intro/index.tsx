import { Avatar } from '@/components/Avatar';
import Link from 'next/link';
import Image from 'next/image';
import { BUCKET_URL } from '@/util/const';
import '@/tw.css';
import { merge } from '@keegancodes/foundations';
import styles from '../../pageStyles/intro/intro.module.css';
import '../../pageStyles/intro/intro.css';
import '../../app/theme.css';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';

import peacock from './textures/marmaris-peacock-nan-in-architextures.jpg';
import poppy from './textures/poppy-meadow-rainbow-stretcher-nan-in-architextures.jpg';
import mirage from './textures/mirage-wallpaper-in-dusk-staggered-10217-in-architextures.jpg';
import clockwork from './textures/clockwork-orange-wallpaper-in-dawn-staggered-10217-in-architextures.jpg';
import exotic from './textures/exotic-floral-textile-nan-in-architextures.jpg';
import lush from './textures/mischievous-jungle-lush-nan-in-architextures.jpg';
import floral from './textures/floral-wallcovering-nan-in-architextures.jpg';
import triangles from './textures/vintage-triangles-nan-in-architextures.jpg';
import daffodil from './textures/daffodil-wallpaper-nan-in-architextures.jpg';
import songbirds from './textures/songbirds-pink-nan-in-architextures.jpg';
import bloom from './textures/bloom-midnight-blue-nan-in-architextures.jpg';
import tigers from './textures/bold-tigers-velvet-nan-in-architextures.jpg';
import celestial from './textures/celestial-magic-wallpaper-nan-in-architextures.jpg';
import tropicana from './textures/lush-tropicana-wallpaper-nan-in-architextures.jpg';
import pea from './textures/grande-climbing-sweet-pea-wallpaper-nan-in-architextures.jpg';
import toucan from './textures/furada-sage-stretcher-nan-in-architextures.jpg';
import owl from './textures/the-swedish-forest-nan-in-architextures.jpg';
import classic from './textures/ava-classic-blue-stretcher-nan-in-architextures.jpg';

const stokeRegular = localFont({
  src: [
    {
      path: '../../sharedFonts/Stoke-Regular.ttf',
      style: 'normal',
    },
  ],
});

const HiTrack = dynamic(() => import('@/components/Track/Hi'));

const tiles = {
  peacock,
  poppy,
  mirage,
  clockwork,
  exotic,
  lush,
  floral,
  triangles,
  daffodil,
  songbirds,
  bloom,
  tigers,
  celestial,
  tropicana,
  pea,
  toucan,
  owl,
  classic,
};

const sizeOverrides = {
  [tiles.peacock.src]: 500,
  [tiles.lush.src]: 500,
  [tiles.daffodil.src]: 300,
  [tiles.tigers.src]: 500,
  [tiles.celestial.src]: 600,
  [tiles.tropicana.src]: 350,
  [tiles.owl.src]: 500,
  [tiles.classic.src]: 500,
};

const pinnedSources: Record<string, string> = {
  render26: tiles.lush.src,
};

export async function getServerSideProps(context: any) {
  const query = context.query as { tile?: keyof typeof tiles; source?: string };

  const tileOptions = Object.values(tiles).map((tile) => tile.src);

  let tile = tileOptions[Math.floor(Math.random() * tileOptions.length)];

  if (query.tile) {
    const match = tiles[query.tile];

    if (match) {
      tile = match.src;
    }
  }

  if (query.source && pinnedSources[query.source]) {
    tile = pinnedSources[query.source];
  }

  const scaleneLink = process.env.SCALENE_TESTFLIGHT_LINK || '';

  return {
    props: {
      imageSrc: tile,
      imageSize: sizeOverrides[tile] || 400,
      source: query.source ?? 'render26',
      scaleneLink,
    },
  };
}

export default function Intro({
  imageSrc,
  imageSize,
  source,
  scaleneLink,
}: {
  imageSrc: string;
  imageSize: number;
  source: string;
  scaleneLink: string;
}) {
  return (
    <>
      <div
        className={merge(
          styles.tiles,
          stokeRegular.className,
          'h-dvh w-full overflow-y-auto bg-stone-300',
        )}
        style={
          {
            '--wallpaper-tile': `url(${imageSrc})`,
            '--wallpaper-tile-size': `${imageSize}px`,
          } as React.CSSProperties
        }
      >
        <div className="flex min-h-full w-full items-center justify-center px-4 py-8">
          <div
            className={merge(
              styles.card,
              'flex min-h-[80dvh] w-full max-w-[600px] shrink-0 flex-col rounded-lg border-[8px] border-stone-100 p-1 shadow-xl sm:w-[80%] sm:border-[12px]',
            )}
          >
            <div
              className={merge(
                'mx-auto flex w-full flex-1 flex-col rounded-sm bg-stone-100 px-6 pb-6 pt-8 sm:px-12 sm:pt-12',
              )}
            >
              <Avatar width={200} priority className={styles.avatar} />
              <div className="mx-auto flex flex-1 flex-col pt-4 text-center">
                <h1
                  className={merge(
                    styles.element,
                    styles.title,
                    'text-4xl text-stone-700',
                  )}
                >
                  Keegan Donley
                </h1>
                <h3
                  className={merge(
                    styles.element,
                    styles.description,
                    'pt-2 text-lg text-stone-500',
                  )}
                >
                  Principal Front-End Engineer @{' '}
                  <Link href="https://kizen.com" target="_blank">
                    Kizen
                  </Link>
                </h3>
                <div
                  className={merge(
                    styles.element,
                    styles.socials,
                    'flex flex-row flex-wrap justify-center gap-x-5 pt-2 text-stone-400',
                  )}
                >
                  <Link href="https://keegan.codes" target="_blank">
                    <h3 className="pt-4 text-stone-500">blog</h3>
                  </Link>
                  <Link href="/linkedin" target="_blank">
                    <h3 className="pt-4 text-stone-500">linkedin</h3>
                  </Link>
                  <Link href="/bsky" target="_blank">
                    <h3 className="pt-4 text-stone-500">bluesky</h3>
                  </Link>
                  <Link href="/github" target="_blank">
                    <h3 className="pt-4 text-stone-500">github</h3>
                  </Link>
                </div>
                <hr
                  className={merge(
                    styles.element,
                    styles.divider,
                    styles.first,
                    'mt-4',
                  )}
                />
                <div
                  className={merge(
                    styles.element,
                    styles.posts,
                    'flex flex-col justify-center gap-4 pb-2 pt-6 text-stone-400 sm:-mx-4 sm:flex-row',
                  )}
                >
                  <Link
                    className={merge(styles.post)}
                    href="/blog/i-can-build-every-side-project-i-want-with-ai-should-i"
                    target="_blank"
                  >
                    <Image
                      src={`${BUCKET_URL}/side-projects-2.png`}
                      alt="Cover"
                      width={3600}
                      height={2041}
                      blurDataURL="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAB0AMgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APSRdqe1TLMp6VR8mQdBT1ilr2HCJ4yZeEme9LuJ71TEc1L+9HWo5F3K5iwVPY1E8ch6Go/MkHemNcOO9UosTuL5MvrR5MvrUX2lvWj7S3rV2kTYlW6b0qZbjI5qlt96cq5PWhxiJSRfEo9aXcp61SZdpGCalEfy53Gs3BFp32Jyit6VE1uh71XZ2ViAaaZG9apQfcOW5N9lT+9R9lT+9VbzG9aPMb1q+WXcXIf/2Q=="
                      className="h-24 object-cover"
                      placeholder="blur"
                      sizes={`(max-width: 550px) 100vw, 310px`}
                    />
                    <h4>
                      I Can Build Every Side Project I Want With AI. Should I?
                    </h4>
                  </Link>
                  <Link
                    className={merge(styles.post)}
                    href="/blog/lines-of-code-as-a-productivity-metric-ai-era"
                    target="_blank"
                  >
                    <Image
                      src={`${BUCKET_URL}/lines-of-code-ai-cover.png`}
                      alt="Cover"
                      width={3840}
                      height={2160}
                      blurDataURL="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIABwAMgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APLiJRFkMaoNI5lCsxPNSmSSNMbuKrKTJMD3rq6nMa+xTDndjikSNXgbCg1FIX8rHtTLaSXY209O1DVwM6QbbjGMc1txBntxmYgY9axZWLT/ADDnNXMARDEhHtQANbruPz96T7Ov96oM8/fpM/7dAFm7tjGmQ2RVS0jMk2M81ZuXYw8modO/4+KEgJLh5YzjNFlmQn5sVJqR5qtZ9TyRQBLNCFlBzmpHeHysFDmomJ+0AZrQnhQWm7HOKOgGMSuTxRlfSmk8mjNAH//Z"
                      className="h-24 object-cover"
                      placeholder="blur"
                      sizes={`(max-width: 550px) 100vw, 310px`}
                    />
                    <h4>
                      Lines of Code as a Productivity Metric in the AI Era
                    </h4>
                  </Link>
                </div>
                <span className="mt-auto" />
                <hr
                  className={merge(
                    styles.element,
                    styles.divider,
                    styles.second,
                    'mt-4',
                  )}
                />{' '}
                <div
                  className={merge(
                    styles.element,
                    styles.footer,
                    'flex flex-row flex-wrap justify-center gap-x-6 text-stone-400',
                  )}
                >
                  <Link
                    href={`https://scalene.app?beta=${encodeURIComponent(scaleneLink)}`}
                    target="_blank"
                  >
                    <h4 className="pt-4 text-xs text-stone-400">scalene.app</h4>
                  </Link>
                  <Link href="https://hypothesis.sh" target="_blank">
                    <h4 className="pt-4 text-xs text-stone-400">
                      hypothesis.sh
                    </h4>
                  </Link>
                  <Link href="https://ringpulse.app" target="_blank">
                    <h4 className="pt-4 text-xs text-stone-400">
                      ringpulse.app
                    </h4>
                  </Link>
                  <Link href="https://deadinternet.tech" target="_blank">
                    <h4 className="pt-4 text-xs text-stone-400">
                      deadinternet.tech
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HiTrack slug={source} qrScanned={false} />
    </>
  );
}
