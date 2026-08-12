// Social crawlers (Twitterbot especially) have tight fetch timeouts and cache
// a failed card fetch for ~a week, so OG images must be served from the CDN
// cache rather than re-rendered (~2s) on every request. Vercel purges the CDN
// cache on each deploy, so the long s-maxage never outlives a content change
// by more than a day of client-side max-age.
export const OG_CACHE_HEADERS = {
  'cache-control':
    'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800',
};

// For OG images that render externally-sourced content (e.g. Bluesky author
// avatars/names in the thread route), which can change without a deploy —
// keep the CDN copy for at most a day instead of leaning on deploy purges.
export const OG_CACHE_HEADERS_EXTERNAL = {
  'cache-control':
    'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
};
