import { connect } from '@planetscale/database';
import type { NextRequest } from 'next/server';

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const res: TrackBody = await request.json();
  const conn = connect(config);
  const geo = request.geo;
  const country = geo?.country;
  const city = geo?.city;
  const region = geo?.region;
  const ip = request.ip;

  const results = await conn.execute(
    'INSERT INTO post_page_views (slug, view_date, in_modal, ip, country_code, city, region) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [res.slug, new Date(), res.inModal, ip, country, city, region],
  );

  if (results.rowsAffected !== 1) {
    return new Response('Error!', { status: 500 });
  }

  try {
    await Promise.all([
      conn.execute(
        'INSERT INTO post_page_views_aggregate (slug, views) VALUES (?, 1) ON DUPLICATE KEY UPDATE views = views + 1',
        [res.slug],
      ),
      conn.execute(
        'INSERT INTO page_views_total (type, views) VALUES (?, 1) ON DUPLICATE KEY UPDATE views = views + 1',
        ['post'],
      ),
      Boolean(country) &&
        conn.execute(
          'INSERT INTO location_page_views (code, views) VALUES (?, 1) ON DUPLICATE KEY UPDATE views = views + 1',
          [country],
        ),
    ]);
  } catch (ex) {
    console.error(
      'Error incrementing view, this will get reconciled by the sync',
      ex,
    );
  }

  console.log(`Successfully tracked view for ${res.slug}`);

  return new Response('Success!', { status: 200 });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  const conn = connect(config);
  const results = await conn.execute(
    'SELECT views FROM post_page_views_aggregate WHERE slug = ?',
    [slug],
  );

  if (!results?.rows?.[0]) {
    console.error('No results found for slug', slug, 'results:', results);
  }

  const row = results?.rows?.[0] as { views: number } | undefined;

  console.log(
    `Fetched views for ${slug}, result was ${row?.views ?? 'undefined'}`,
  );

  return new Response(JSON.stringify(row ?? {}), {
    status: 200,
  });
}
