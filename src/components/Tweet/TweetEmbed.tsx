'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { TwitterComponents } from 'react-tweet';
import styles from './tweet.module.css';

const LazyTweet = dynamic(
  () => import('react-tweet').then((mod) => mod.Tweet),
  {
    ssr: false,
    loading: () => <div className={styles.placeholder} />,
  },
);

const components: TwitterComponents = {
  AvatarImg: (props) => <Image {...props} alt={props.alt} />,
  MediaImg: (props) => <Image {...props} fill unoptimized alt={props.alt} />,
};

interface TweetEmbedProps {
  id: string;
}

export const TweetEmbed = ({ id }: TweetEmbedProps) => (
  <LazyTweet id={id} components={components} />
);
