import { Footer } from '@/components/Footer';
import * as ResumeContent from './resume.mdx';
import styles from './resume.module.css';
import { userTheme } from '@/util/cookies';
import { background } from '@/theme/colors';
import { BASEURL, NAME } from '@/metadata';

export async function generateViewport() {
  const theme = await userTheme();

  return {
    themeColor: theme === 'light' ? background.light : background.dark,
  };
}

export async function generateMetadata() {
  const title = `${NAME}'s Resume`;
  const description = 'Principal Front-End Engineer at Kizen';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASEURL}/resume`,
      siteName: NAME,
      locale: 'en_US',
      images: [{
        url: `/api/og/page?page=home&width=1200&height=630`,
        width: 1200,
        height: 630,
        type: 'image/png',
      }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      creator: '@keegandonley',
      images: [`/api/og/page?page=home&width=1200&height=630`],
    },
    alternates: {
      canonical: `${BASEURL}/resume`,
    },
  };
}

export default function Resume() {
  const Component = ResumeContent.default;

  return (
    <>
      <article className={styles.wrapper}>
        <Component />
      </article>
      <Footer />
    </>
  );
}
