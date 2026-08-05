import { Avatar } from '@/components/Avatar';
import Link from 'next/link';
import Image from 'next/image';
import { Hr } from '@/components/Post/Hr';
import { BUCKET_URL } from '@/util/const';
import '@/tw.css';
import { useState } from 'react';
import { merge } from '@keegancodes/foundations';
import styles from '../../pageStyles/render26/render.module.css';
import '../../pageStyles/render26/render.css';
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

export async function getServerSideProps(context: any) {
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

  const tileOptions = Object.values(tiles).map((tile) => tile.src);

  let tile = tileOptions[Math.floor(Math.random() * tileOptions.length)];

  if (context.query.tile) {
    const match = tiles[context.query.tile as keyof typeof tiles];

    if (match) {
      tile = match.src;
    }
  }

  return {
    props: {
      imageSrc: tile,
      imageSize: sizeOverrides[tile] || 400,
    },
  };
}

export default function Render26({
  imageSrc,
  imageSize,
}: {
  imageSrc: string;
  imageSize: number;
}) {
  const [isReadMore, setIsReadMore] = useState(false);
  return (
    <>
      <div
        className={merge(
          styles.tiles,
          stokeRegular.className,
          'flex h-dvh w-full items-center bg-stone-300',
        )}
        style={
          {
            '--wallpaper-tile': `url(${imageSrc})`,
            '--wallpaper-tile-size': `${imageSize}px`,
          } as React.CSSProperties
        }
      >
        {isReadMore ? (
          <div
            className={merge(
              styles.card,
              'mx-auto flex h-[80%] w-[80%] max-w-[600px] flex-col rounded-lg border-[12px] border-stone-100 p-1 shadow-xl',
            )}
          >
            <div
              className={merge(
                'mx-auto flex h-full w-full flex-col rounded-sm bg-stone-100 px-12 pb-6 pt-12',
              )}
            >
              <h3
                className={merge(
                  styles.element,
                  styles.description,
                  'pt-4 text-stone-500',
                )}
              >
                Principal Front-End Engineer @ Kizen
              </h3>
              <div className="mt-auto text-center">
                <button
                  className={merge(
                    styles.element,
                    styles.more,
                    'pt-4 text-xs text-stone-500',
                  )}
                  onClick={() => setIsReadMore((prev) => !prev)}
                >
                  read less -
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={merge(
              styles.card,
              'mx-auto flex h-[80%] w-[80%] max-w-[600px] flex-col rounded-lg border-[12px] border-stone-100 p-1 shadow-xl',
            )}
          >
            <div
              className={merge(
                'mx-auto flex h-full w-full flex-col rounded-sm bg-stone-100 px-12 pb-6 pt-12',
              )}
            >
              <Avatar width={200} priority className={styles.avatar} />
              <div className="mx-auto flex h-full flex-col pt-4 text-center">
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
                    'pt-4 text-stone-500',
                  )}
                >
                  Principal Front-End Engineer @ Kizen
                </h3>
                <div
                  className={merge(
                    styles.element,
                    styles.socials,
                    'mt-auto flex flex-row justify-center gap-4 text-stone-400',
                  )}
                >
                  <Link href="https://keegan.codes" target="_blank">
                    <h3 className="pt-4 text-stone-500">blog</h3>
                  </Link>
                  <Link href="/linkedin" target="_blank">
                    <h3 className="pt-4 text-stone-500">linkedin</h3>
                  </Link>
                </div>
                <button
                  className={merge(
                    styles.element,
                    styles.more,
                    'pt-4 text-xs text-stone-500',
                  )}
                  onClick={() => setIsReadMore((prev) => !prev)}
                >
                  read more +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <HiTrack slug="render26" qrScanned={false} />
    </>
  );
}
