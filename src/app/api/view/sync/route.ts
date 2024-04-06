import { ExecutedQuery, connect } from '@planetscale/database';
import { NextResponse } from 'next/server';

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

const BATCH_SIZE = 20;

export async function GET() {
  const startTime = Date.now();
  const conn = connect(config);
  console.log('Processing views');

  try {
    const results: ExecutedQuery<{ slug: string; views: string }> =
      await conn.execute(
        'SELECT slug, COUNT(*) as views FROM post_page_views GROUP BY slug',
        [],
      );

    let totalViews = 0;
    let executedCount = 0;

    const rowsGroups = results.rows.reduce(
      (acc, curr) => {
        const last = acc[acc.length - 1];

        if (last.length < BATCH_SIZE) {
          last.push(curr);
        } else {
          acc.push([curr]);
        }

        return acc;
      },
      [[]] as { slug: string; views: string }[][],
    );

    for (const group of rowsGroups) {
      await Promise.all(
        group.map((row: { slug: string; views: string }) => {
          executedCount++;
          try {
            totalViews += parseInt(row.views, 10);
          } catch (ex) {
            console.error('error logging view sync for', row.slug, ex);
          }

          try {
            return conn.execute(
              'INSERT INTO post_page_views_aggregate (slug, views) VALUES (?, ?) ON DUPLICATE KEY UPDATE views = ?',
              [row.slug, row.views, row.views],
            );
          } catch (ex) {
            console.error(ex);
          }
        }),
      );
    }

    try {
      await conn.execute(
        'INSERT INTO page_views_total (type, views) VALUES (?, ?) ON DUPLICATE KEY UPDATE views = ?',
        ['post', totalViews, totalViews],
      );
    } catch (ex) {
      console.error(ex);
    }

    const endTime = Date.now();

    const duration = endTime - startTime;

    console.log(
      'updated',
      results.rows.length,
      'slugs with new view counts for a total of',
      totalViews,
      'views in',
      `${duration}ms`,
    );

    return NextResponse.json({
      ok: true,
      executedCount,
      totalViews,
      duration,
    });
  } catch (ex) {
    console.error(ex);
    return new Response(JSON.stringify(ex), { status: 500 });
  }
}
