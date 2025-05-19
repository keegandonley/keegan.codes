import { getRandomPostForSlug } from '@/util/post';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  const post = await getRandomPostForSlug(slug, url.origin);

  return new Response(JSON.stringify(post));
}

export async function POST(request: Request) {
  const url = new URL(request.url);

  try {
    const body = await request.json();
    const slug = body.slug;

    const post = await getRandomPostForSlug(slug, url.origin);
    return new Response(JSON.stringify(post));
  } catch (ex: any) {
    const post = await getRandomPostForSlug(null, url.origin);
    return new Response(JSON.stringify(post));
  }
}
