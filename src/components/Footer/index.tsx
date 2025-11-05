import { merge } from '@/util/classNames';
import styles from './footer.module.css';
import Link from 'next/link';
import { Avatar } from '../Avatar';
import { TotalViews } from '../TotalViews';
import { CountryViews } from '../CountryViews';
import { Hr } from '../Post/Hr';

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
          {/* <Hr
            style={{
              '--theme-blue-2': 'white',
              '--theme-background': 'var(--theme-text)',
            }}
          /> */}
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
      <div className={styles.copyright}>&copy; 2025 by Keegan Donley</div>
    </footer>
  );
};
