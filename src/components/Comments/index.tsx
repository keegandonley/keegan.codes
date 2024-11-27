import {
  AppBskyFeedDefs,
  AppBskyFeedGetPostThread,
  AppBskyFeedPost,
} from '@atproto/api';
import { ThreadViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import Image from 'next/image';
import styles from './comments.module.css';
import { injectVariables } from '@keegancodes/foundations';
import { Hr } from '../Post/Hr';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@keegandonley/pro-solid-svg-icons';
import { captureException } from '@sentry/nextjs';

const authorDid = 'did:plc:qu7mp3zsk6r5eoairedflnsm';

type CommentsProps = {
  threadUri?: string;
  threadId?: string;
};

type CommentProps = {
  post: ThreadViewPost;
};

const avatarSize = 30;

const sortRepliesByLikes = (replies: ThreadViewPost[] = []) => {
  return [...replies].sort((a, b) => {
    return (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0);
  });
};

const Comment = (props: CommentProps) => {
  const { post } = props;

  if (!AppBskyFeedPost.isRecord(post.post.record)) {
    return null;
  }

  return (
    <div className={styles.postWrapper}>
      <div className={styles.header}>
        {post.post.author.avatar ? (
          <div
            className={styles.avatar}
            style={injectVariables([['avatar-size', `${avatarSize}px`]])}
          >
            <Image
              src={post.post.author.avatar}
              alt={post.post.author.displayName ?? 'Poster Avatar'}
              width={avatarSize}
              height={avatarSize}
            />
          </div>
        ) : null}
        <span>{post.post.author.displayName}</span>
        <span className={styles.handle}>@{post.post.author.handle}</span>
        {post.post.author.did === authorDid ? (
          <span className={styles.authorBadge}>author</span>
        ) : null}
      </div>
      <span>{(post.post.record as any).text}</span>
      <span className={styles.likes}>
        <FontAwesomeIcon icon={faThumbsUp} /> {post.post.likeCount ?? 0}
      </span>
      <div className={styles.subCommentsWrapper}>
        {sortRepliesByLikes(post.replies as ThreadViewPost[]).map((reply) => (
          <Comment key={reply.uri as string} post={reply as ThreadViewPost} />
        ))}
      </div>
    </div>
  );
};

export const Comments = async (props: CommentsProps) => {
  const { threadUri, threadId } = props;

  let uri = threadId
    ? `at://keegan.codes/app.bsky.feed.post/${threadId}`
    : threadUri;

  if (!uri) {
    return null;
  }

  const params = new URLSearchParams({ uri });

  const thread = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?${params.toString()}`,
  );

  if (!thread.ok) {
    return null;
  }

  const data = (await thread.json()) as AppBskyFeedGetPostThread.OutputSchema;

  if (!AppBskyFeedDefs.isThreadViewPost(data.thread)) {
    captureException(new Error('Post is not a thread view'));
    return null;
  }

  const threadData = data.thread as ThreadViewPost;

  if (!threadData) {
    captureException(new Error('No thread data'));
    return null;
  }

  return (
    <div className={styles.commentsWrapper}>
      <Hr />
      <div className={styles.cta}>
        Join the conversation here and on Bluesky by{' '}
        <Link
          target="_blank"
          href={`https://bsky.app/profile/${threadData.post.author.handle}/post/${threadData.post.uri.split('/').pop()}`}
        >
          replying to this thread
        </Link>
        !
      </div>
      <Comment post={threadData} />
    </div>
  );
};
