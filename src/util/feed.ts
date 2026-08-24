import { getPostsByTag, resolveTag } from '@/app/blog/util';
import { BASEURL, NAME } from '@/metadata';
import { PostMetadata } from '@/types/post';
import { BUCKET_URL } from '@/util/const';

export const FEED_CACHE_HEADERS = {
  'cache-control':
    'public, max-age=1800, s-maxage=31536000, stale-while-revalidate=604800',
};

export const RSS_CONTENT_TYPE = 'application/rss+xml; charset=utf-8';
export const ATOM_CONTENT_TYPE = 'application/atom+xml; charset=utf-8';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const postUrl = (post: PostMetadata) => `${BASEURL}/blog/${post.slug}`;

const coverUrl = (post: PostMetadata) => `${BUCKET_URL}/${post.cover}`;

const MIME_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
};

const coverMimeType = (cover: string) =>
  MIME_TYPES[cover.split('.').pop()?.toLowerCase() ?? ''] ?? 'image/png';

const postUpdatedAt = (post: PostMetadata) => post.updated ?? post.published;

export const sortPostsForFeed = (posts: PostMetadata[]) =>
  [...posts].sort((a, b) => b.published.getTime() - a.published.getTime());

const feedUpdatedAt = (posts: PostMetadata[]) =>
  posts.reduce(
    (latest, post) =>
      postUpdatedAt(post) > latest ? postUpdatedAt(post) : latest,
    new Date(0),
  );

const summaryHtml = (post: PostMetadata) =>
  [
    `<p><img src="${escapeXml(coverUrl(post))}" alt="${escapeXml(post.title)}" /></p>`,
    `<p>${escapeXml(post.description)}</p>`,
    `<p><a href="${escapeXml(postUrl(post))}">Read the full post on keegan.codes</a></p>`,
  ].join('');

export interface FeedOptions {
  posts: PostMetadata[];
  title: string;
  description: string;
  feedUrl: string;
  siteUrl: string;
}

export const renderRssFeed = ({
  posts,
  title,
  description,
  feedUrl,
  siteUrl,
}: FeedOptions) => {
  const sorted = sortPostsForFeed(posts);

  const items = sorted
    .map((post) =>
      [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(postUrl(post))}</link>`,
        `      <guid isPermaLink="true">${escapeXml(postUrl(post))}</guid>`,
        `      <pubDate>${post.published.toUTCString()}</pubDate>`,
        `      <dc:creator>${escapeXml(NAME)}</dc:creator>`,
        `      <description>${escapeXml(summaryHtml(post))}</description>`,
        `      <media:content url="${escapeXml(coverUrl(post))}" medium="image" type="${coverMimeType(post.cover)}" />`,
        ...(post.tags ?? []).map(
          (tag) => `      <category>${escapeXml(tag)}</category>`,
        ),
        '    </item>',
      ].join('\n'),
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(description)}</description>
    <language>en-us</language>
    <lastBuildDate>${feedUpdatedAt(sorted).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
};

export const renderAtomFeed = ({
  posts,
  title,
  description,
  feedUrl,
  siteUrl,
}: FeedOptions) => {
  const sorted = sortPostsForFeed(posts);

  const entries = sorted
    .map((post) =>
      [
        '  <entry>',
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link rel="alternate" type="text/html" href="${escapeXml(postUrl(post))}" />`,
        `    <id>${escapeXml(postUrl(post))}</id>`,
        `    <published>${post.published.toISOString()}</published>`,
        `    <updated>${postUpdatedAt(post).toISOString()}</updated>`,
        `    <summary type="html">${escapeXml(summaryHtml(post))}</summary>`,
        ...(post.tags ?? []).map(
          (tag) => `    <category term="${escapeXml(tag)}" />`,
        ),
        '  </entry>',
      ].join('\n'),
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(title)}</title>
  <subtitle>${escapeXml(description)}</subtitle>
  <link rel="self" type="application/atom+xml" href="${escapeXml(feedUrl)}" />
  <link rel="alternate" type="text/html" href="${escapeXml(siteUrl)}" />
  <id>${escapeXml(feedUrl)}</id>
  <updated>${feedUpdatedAt(sorted).toISOString()}</updated>
  <author>
    <name>${escapeXml(NAME)}</name>
    <uri>${escapeXml(BASEURL)}</uri>
  </author>
${entries}
</feed>
`;
};

export const tagFeedOptions = (
  encodedTag: string,
  extension: 'xml' | 'atom',
): FeedOptions | null => {
  let decoded: string;

  try {
    decoded = decodeURIComponent(encodedTag);
  } catch {
    return null;
  }

  const canonical = resolveTag(decoded);

  if (!canonical) {
    return null;
  }

  const tagUrl = `${BASEURL}/blog/tag/${encodeURIComponent(canonical)}`;

  return {
    posts: getPostsByTag(canonical),
    title: `${canonical} \u00b7 ${NAME}`,
    description: `Blog posts tagged "${canonical}" by ${NAME}`,
    feedUrl: `${tagUrl}/feed.${extension}`,
    siteUrl: tagUrl,
  };
};
