import Image from 'next/image';
import styles from '../styles.module.css';
import { merge } from '@/util/classNames';

export const AppleAppStoreLink = ({
  link,
  center,
  invert,
}: {
  link: string;
  center?: boolean;
  invert?: boolean;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      className={merge(styles.link, center && styles.center)}
    >
      <Image
        src="https://static.donley.xyz/appstore-black.svg"
        alt="Download on the App Store"
        height="54"
        width="161"
        className={merge(
          styles.appStoreBlack,
          styles.appStore,
          invert && styles.invert,
        )}
      />
      <Image
        src="https://static.donley.xyz/appstore-white.svg"
        alt="Download on the App Store"
        height="54"
        width="161"
        className={merge(
          styles.appStoreWhite,
          styles.appStore,
          invert && styles.invert,
        )}
      />
    </a>
  );
};
