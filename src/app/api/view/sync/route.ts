import { connect } from "@planetscale/database";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export async function GET(request: Request) {
  const conn = connect(config);
  try {
    const results = await conn.execute(
      "SELECT slug, COUNT(*) as views FROM post_page_views GROUP BY slug",
      []
    );

    await Promise.all(
      results.rows.map((row: any) => {
        try {
          return conn.execute(
            "INSERT INTO post_page_views_aggregate (slug, views) VALUES (?, ?) ON DUPLICATE KEY UPDATE views = ?",
            [row.views, row.views, row.views]
          );
        } catch (ex) {
          console.error(ex);
        }
      })
    );

    return new Response(JSON.stringify({ updated: results.rows.length }), {
      status: 200,
    });
  } catch (ex) {
    console.error(ex);
    return new Response(JSON.stringify(ex), { status: 500 });
  }
}
