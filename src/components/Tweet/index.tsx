import { merge } from "@/util/classNames";
import { Tweet as ReactTweet } from "react-tweet";
import styles from "./tweet.module.css";
import Image from "next/image";
import type { TwitterComponents } from "react-tweet";

const components: TwitterComponents = {
  AvatarImg: (props) => <Image {...props} alt={props.alt} />,
  MediaImg: (props) => <Image {...props} fill unoptimized alt={props.alt} />,
};

interface TweetProps {
  id: string;
  centered?: boolean;
}

export const Tweet = (props: TweetProps) => {
  return (
    <div
      className={merge(styles.wrapper, props.centered ? styles.centered : "")}
    >
      <ReactTweet id={props.id} components={components} />
    </div>
  );
};
