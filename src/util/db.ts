import { connect } from '@planetscale/database';

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export const getCheersCountForSlug = async (slug: string | null) => {
  if (!slug) {
    return 0;
  }

  const conn = connect(config);
  const results = await conn.execute(
    'SELECT count(*) as count FROM post_cheers WHERE slug = ?',
    [slug],
  );

  return parseInt(results.rows[0].count);
};

export const getCountriesViews = async (limit = 3) => {
  let realLimit = limit;

  if (limit > 20) {
    realLimit = 20;
  }

  const conn = connect(config);

  const res = await conn.execute(
    'SELECT code, views FROM location_page_views ORDER BY views DESC LIMIT ?',
    [realLimit],
  );

  const countries =
    res?.rows?.map((row) => ({
      code: row.code,
      views: parseInt(row.views, 10),
    })) ?? [];

  return countries;
};

export const getTotalViews = async () => {
  const conn = connect(config);

  const res = await conn.execute(
    'SELECT views FROM page_views_total WHERE type = ?',
    ['post'],
  );

  return res?.rows?.[0]?.views ?? 0;
};

export const getViewCountForSlug = async (slug: string | null) => {
  if (!slug) {
    return 0;
  }

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

  return row?.views ?? 0;
};
