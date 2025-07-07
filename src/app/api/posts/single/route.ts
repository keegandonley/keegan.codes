import { getPostForSlug } from '@/util/post';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  const post = await getPostForSlug(slug, url.origin);
  return new Response(JSON.stringify(post));
}
