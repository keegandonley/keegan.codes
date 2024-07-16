import { ExecutedQuery, connect } from '@planetscale/database';
import { NextResponse } from 'next/server';

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export async function GET() {
  const startTime = Date.now();
  const conn = connect(config);

  console.log('Processing top countries for slugs');

  try {
    const results: ExecutedQuery<{
      slug: string;
      views: string;
      country_code: string;
    }> = await conn.execute(
      'select count(*) as views, slug, country_code from post_page_views WHERE country_code IS NOT NULL GROUP BY country_code, slug;',
      [],
    );

    const groups: Record<
      string,
      Array<{ views: number; country_code: string }>
    > = results.rows.reduce((acc, curr) => {
      const res: Record<
        string,
        Array<{ views: number; country_code: string }>
      > = { ...acc };

      if (!res[curr.slug]) {
        res[curr.slug] = [];
      }

      res[curr.slug].push({
        views: parseInt(curr.views, 10),
        country_code: curr.country_code,
      });

      return res;
    }, {});

    for (const slug in groups) {
      const rows = groups[slug];
      const sortedRows = rows.sort((a, b) => b.views - a.views);
      const max = sortedRows[0];
      await conn.execute(
        'INSERT INTO slug_top_countries (slug, country_code) VALUES (?, ?) on duplicate key update country_code = ?',
        [slug, max.country_code, max.country_code],
      );

      // Wait a bit
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const endTime = Date.now();

    const duration = endTime - startTime;

    return NextResponse.json({
      ok: true,
      duration,
    });
  } catch (ex) {
    console.error(ex);
    return new Response(JSON.stringify(ex), { status: 500 });
  }
}
