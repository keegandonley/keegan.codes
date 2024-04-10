import { HeroText } from '@/components/Hero/Text';
import { HeroBlock } from '@/components/Hero/Block';
import { Social } from '@/components/Social';
import { Paragraph } from '@/components/Paragraph';
import Link from 'next/link';
import styles from './home.module.css';
import { postCount } from '../post-count';
import { postCount as bookCount } from '../book-count';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@keegandonley/pro-solid-svg-icons';
import { Footer } from '@/components/Footer';
import { Swoop } from '@/components/Swoop';
import Posts from '@/posts';
import { Post } from '@/types/post';
import dynamic from 'next/dynamic';
import { Fallback as BlogPreviewFallback } from '@/components/BlogPreview/Fallback';
import { merge } from '@/util/classNames';

const DynamicBlogPreview = dynamic(() => import('@/components/BlogPreview'), {
  loading: () => <BlogPreviewFallback />,
});

export const runtime = 'edge';

export default function Home() {
  const posts = Object.keys(Posts)
    .map((key) => {
      const component = (Posts as any)[key] as Post;
      return {
        title: component.title,
        slug: component.slug,
        description: component.description,
        cover: component.cover,
        published: component.published,
      } as Post;
    })
    .sort((a, b) => {
      if (!a.published || !b.published) {
        return 0;
      }
      return b.published.getTime() - a.published.getTime();
    })
    .slice(0, 4);

  return (
    <>
      <Swoop />
      <HeroBlock isHomePage collapse>
        <HeroText className={styles.name}>Keegan Donley</HeroText>
      </HeroBlock>
      <div className={styles.cta}>
        <div className={styles.menu}>
          Developer, maker, and lifelong learner
        </div>
      </div>
      <div className={styles.socialOuter}></div>

      <div className={styles.social}>
        <Social />
      </div>

      <section className={styles.content}>
        <Paragraph className={styles.paragraph}>
          I&apos;m a <strong>full-stack engineer</strong> located in Austin,
          Texas.
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          I love solving challenging problems for the web, and building
          applications that are performant, accessible, and easy to use.
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          I&apos;m currently working as a{' '}
          <strong>principal front-end engineer</strong> at{' '}
          <Link href="https://kizen.com">
            <strong>Kizen</strong>
          </Link>
          .
        </Paragraph>
        <DynamicBlogPreview posts={posts} />
        <div className={merge(styles.blogButton, 'animate-viz')}>
          <Link href="/blog" className={merge(styles.blogButtonText)}>
            Read more on my blog <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <Paragraph className={styles.paragraph}>
          I strive to be always learning, and share a lot about my passions here
          on my website. My favorite projects combine software, hardware, hobby
          electronics, and more!
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          To that end, I currently have {postCount} posts on{' '}
          <Link href="/blog">
            <strong>my blog</strong>
          </Link>
          , with topics ranging from software and web development, to
          electronics, connected fitness and travel. Come join me and follow
          along as I work to build a better web!
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          I also have {bookCount} books on{' '}
          <Link href="/library">
            <strong>my reading list</strong>
          </Link>
          . Books I read range anywhere from business and software to fantasy
          and fiction.
        </Paragraph>
      </section>
      <Footer />
    </>
  );
}
