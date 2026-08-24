import { getAllPosts } from '@/app/blog/util';
import { BASEURL, DESCRIPTION, NAME } from '@/metadata';
import {
  ATOM_CONTENT_TYPE,
  FEED_CACHE_HEADERS,
  renderAtomFeed,
} from '@/util/feed';

export function GET() {
  const body = renderAtomFeed({
    posts: getAllPosts(),
    title: NAME,
    description: DESCRIPTION,
    feedUrl: `${BASEURL}/feed.atom`,
    siteUrl: `${BASEURL}/blog`,
  });

  return new Response(body, {
    headers: { 'content-type': ATOM_CONTENT_TYPE, ...FEED_CACHE_HEADERS },
  });
}
