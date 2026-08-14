import { merge } from '@/util/classNames';
import styles from './tweet.module.css';
import { TweetEmbed } from './TweetEmbed';

interface TweetProps {
  id: string;
  centered?: boolean;
}

export const Tweet = (props: TweetProps) => {
  return (
    <div
      className={merge(styles.wrapper, props.centered ? styles.centered : '')}
    >
      <TweetEmbed id={props.id} />
    </div>
  );
};
