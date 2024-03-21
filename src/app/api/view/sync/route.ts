import { ExecutedQuery, connect } from "@planetscale/database";
import { NextResponse } from "next/server";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export const runtime = "edge";

const BATCH_SIZE = 10;

export async function GET() {
  const startTime = Date.now();
  const conn = connect(config);
  console.log("Processing views");

  try {
    const results: ExecutedQuery<{ slug: string; views: string }> =
      await conn.execute(
        "SELECT slug, COUNT(*) as views FROM post_page_views GROUP BY slug",
        []
      );

    let total = 0;
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
      [[]] as { slug: string; views: string }[][]
    );

    for (const group of rowsGroups) {
      await Promise.all(
        group.map((row: { slug: string; views: string }) => {
          executedCount++;
          try {
            total += parseInt(row.views, 10);
          } catch (ex) {
            console.error("error logging view sync for", row.slug, ex);
          }

          try {
            return conn.execute(
              "INSERT INTO post_page_views_aggregate (slug, views) VALUES (?, ?) ON DUPLICATE KEY UPDATE views = ?",
              [row.slug, row.views, row.views]
            );
          } catch (ex) {
            console.error(ex);
          }
        })
      );
    }

    try {
      conn.execute(
        "INSERT INTO page_views_total (type, views) VALUES (?, ?) ON DUPLICATE KEY UPDATE views = ?",
        ["post", total, total]
      );
    } catch (ex) {
      console.error(ex);
    }

    console.log(
      "updated",
      results.rows.length,
      "slugs with new view counts for a total of",
      total,
      "views"
    );

    const endTime = Date.now();

    return NextResponse.json({
      ok: true,
      count: executedCount,
      totalViews: total,
      duration: endTime - startTime,
    });
  } catch (ex) {
    console.error(ex);
    return new Response(JSON.stringify(ex), { status: 500 });
  }
}
