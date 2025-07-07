import { Footer } from '@/components/Footer';
import * as ResumeContent from './resume.mdx';
import styles from './resume.module.css';
import { userTheme } from '@/util/cookies';
import { background } from '@/theme/colors';

export async function generateViewport() {
  const theme = await userTheme();

  return {
    themeColor: theme === 'light' ? background.light : background.dark,
  };
}

export async function generateMetadata() {
  return {
    title: "Keegan Donley's Resume",
    description: 'Principal Front-End Engineer at Kizen',
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
