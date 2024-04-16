import '@/tw.css';
import styles from '@/pageStyles/demo/touchscreen-css.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faFile,
  faHome,
  faUserCog,
} from '@keegandonley/pro-solid-svg-icons';
import { merge } from '@keegancodes/foundations';
import Link from 'next/link';

export default function TouchscreenCSSDemo() {
  return (
    <div
      className={merge(
        'flex h-dvh w-screen flex-col items-center justify-center gap-6 text-blue-600',
      )}
    >
      <div className="flex flex-wrap justify-around gap-12">
        <button
          className={merge(styles.button, 'text-xl')}
          data-tooltip-text="Go Home"
        >
          <FontAwesomeIcon icon={faHome} />
        </button>
        <button
          className={merge(styles.button, 'text-xl')}
          data-tooltip-text="My Files"
        >
          <FontAwesomeIcon icon={faFile} />
        </button>
        <button
          className={merge(styles.button, 'text-xl')}
          data-tooltip-text="Edit Profile"
        >
          <FontAwesomeIcon icon={faUserCog} />
        </button>
      </div>
      <Link
        href="/blog/using-css-media-queries-touchscreen"
        className="opacity-50"
      >
        Back to the post
      </Link>
    </div>
  );
}
