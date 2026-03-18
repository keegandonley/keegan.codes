import { getPostForSlug, getPostsForTags } from '@/util/post';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tags = url.searchParams.getAll('tags[]');

  const posts = await getPostsForTags(tags, url.origin);

  return new Response(JSON.stringify(posts));
}
