import { getPostBySlug } from '@/app/blog/util';
import {
  AppBskyFeedDefs,
  AppBskyFeedGetPostThread,
  AppBskyFeedPost,
} from '@atproto/api';
import { ThreadViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

import { captureException } from '@sentry/nextjs';

export const getThread = async ({
  threadId,
  threadUri,
}: {
  threadId?: string;
  threadUri?: string;
}) => {
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

  return threadData;
};

const getCountRecursively = (post: ThreadViewPost): number => {
  if (!post.replies) {
    return 1;
  }

  return (
    1 +
    post.replies.reduce((acc, reply) => {
      if (AppBskyFeedPost.isRecord((reply as ThreadViewPost).post.record)) {
        return acc + getCountRecursively(reply as ThreadViewPost);
      }
      return acc;
    }, 0)
  );
};

export const getCommentCountForSlug = async (slug: string) => {
  const post = getPostBySlug(slug);

  if (post?.bskyThreadId) {
    const thread = await getThread({ threadId: post.bskyThreadId });

    return thread ? getCountRecursively(thread) : 0;
  }

  return 0;
};
