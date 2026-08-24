import { getAllTags } from '@/app/blog/util';
import {
  ATOM_CONTENT_TYPE,
  FEED_CACHE_HEADERS,
  renderAtomFeed,
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
  const options = tagFeedOptions(tag, 'atom');

  if (!options) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(renderAtomFeed(options), {
    headers: { 'content-type': ATOM_CONTENT_TYPE, ...FEED_CACHE_HEADERS },
  });
}
