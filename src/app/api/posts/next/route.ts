import { getNextPostForSlug } from '@/util/post';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  const nextPost = await getNextPostForSlug(slug, url.origin);

  return new Response(JSON.stringify(nextPost));
}
