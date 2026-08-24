import { getAllPosts } from '@/app/blog/util';
import { BASEURL, DESCRIPTION, NAME } from '@/metadata';
import {
  FEED_CACHE_HEADERS,
  RSS_CONTENT_TYPE,
  renderRssFeed,
} from '@/util/feed';

export function GET() {
  const body = renderRssFeed({
    posts: getAllPosts(),
    title: NAME,
    description: DESCRIPTION,
    feedUrl: `${BASEURL}/feed.xml`,
    siteUrl: `${BASEURL}/blog`,
  });

  return new Response(body, {
    headers: { 'content-type': RSS_CONTENT_TYPE, ...FEED_CACHE_HEADERS },
  });
}
