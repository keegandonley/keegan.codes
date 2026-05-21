import { merge } from '@/util/classNames';
import styles from './footer.module.css';
import Link from 'next/link';
import { Avatar } from '../Avatar';
import { TotalViews } from '../TotalViews';
import { CountryViews } from '../CountryViews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky, faGithub } from '@fortawesome/free-brands-svg-icons';
import { AttributionEmoji } from './AttributionEmoji';

interface FooterProps {
  className?: string;
  children?: any;
}

export const Footer = ({ className, children }: FooterProps) => {
  return (
    <footer className={merge(styles.footer, className)}>
      <div className={styles.content}>
        <div className={merge(styles.column, styles.first)}>
          <strong>Keegan Donley</strong>
          <Link href="/blog">Blog</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/links">Links</Link>
          <Link target="_blank" href="/paid-consultation" prefetch={false}>
            Book a Consultation
          </Link>
          <br />
        </div>
        <div className={merge(styles.column, styles.second)}>{children}</div>
        <div className={merge(styles.column, styles.third)}>
          <div className={styles.avatar}>
            <Avatar width={50} />
          </div>
          <span className={styles.totalViews}>
            <TotalViews /> total blog post views (and counting!)
          </span>
          <CountryViews />
        </div>
      </div>
      <div className={styles.socials}>
        <Link href="/bluesky" target="_blank">
          <FontAwesomeIcon icon={faBluesky} />
        </Link>
        <Link href="/repo" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </Link>
      </div>
      <div className={styles.copyright}>
        &copy; 2026 by Keegan Donley · Made with <AttributionEmoji /> by hand
      </div>
    </footer>
  );
};
