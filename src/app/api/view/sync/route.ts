import { connect } from "@planetscale/database";
import { NextResponse } from "next/server";

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
          console.log("updated slug", row.slug, "with", row.views, "views");
          return conn.execute(
            "INSERT INTO post_page_views_aggregate (slug, views) VALUES (?, ?) ON DUPLICATE KEY UPDATE views = ?",
            [row.slug, row.views, row.views]
          );
        } catch (ex) {
          console.error(ex);
        }
      })
    );

    return NextResponse.json({ ok: true });
  } catch (ex) {
    console.error(ex);
    return new Response(JSON.stringify(ex), { status: 500 });
  }
}
