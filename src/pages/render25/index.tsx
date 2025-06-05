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
        </div>
        <p
          className={merge(
            'text-shadow z-50 px-12 pt-8 text-center text-5xl leading-[4rem] text-white',
            rye.className,
          )}
        >
          Hi, I&apos;m Keegan!
        </p>
      </div>
      <HiTrack slug="render25" qrScanned={false} />
    </>
  );
}
