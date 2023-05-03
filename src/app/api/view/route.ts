import { connect } from "@planetscale/database";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export const runtime = "edge";

export async function POST(request: Request) {
  const res: TrackBody = await request.json();
  const conn = connect(config);
  const results = await conn.execute(
    "INSERT INTO post_page_views (slug, view_date, in_modal) VALUES (?, ?, ?)",
    [res.slug, new Date(), res.inModal]
  );

  if (results.rowsAffected !== 1) {
    return new Response("Error!", { status: 500 });
  }

  return new Response("Success!", { status: 200 });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  const conn = connect(config);
  const results = await conn.execute(
    "SELECT views FROM post_page_views_aggregate WHERE slug = ?",
    [slug]
  );

  return new Response(JSON.stringify(results.rows[0]), { status: 200 });
}
