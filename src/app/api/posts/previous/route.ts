import { getPreviousPostForSlug } from '@/util/post';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  const previous = await getPreviousPostForSlug(slug, url.origin);
  return new Response(JSON.stringify(previous));
}
