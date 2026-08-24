import { getAllTags } from '@/app/blog/util';
import {
  FEED_CACHE_HEADERS,
  RSS_CONTENT_TYPE,
  renderRssFeed,
  tagFeedOptions,
} from '@/util/feed';

interface TagFeedContext {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function GET(_request: Request, context: TagFeedContext) {
  const { tag } = await context.params;
  const options = tagFeedOptions(tag, 'xml');

  if (!options) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(renderRssFeed(options), {
    headers: { 'content-type': RSS_CONTENT_TYPE, ...FEED_CACHE_HEADERS },
  });
}
