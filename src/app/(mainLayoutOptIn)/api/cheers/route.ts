import { connect } from "@planetscale/database";
import { kv } from "@vercel/kv";
import { get } from "@vercel/edge-config";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

const HALF_DAY_SECONDS = 60 * 60 * 12;

export const runtime = "edge";

export async function POST(request: Request) {
  const res: CheersBody = await request.json();
  if (!res.id) {
    return new Response("Error! Who are you?", { status: 400 });
  }

  const maxAllowed = (await get("cheersLimit")) as number | undefined;

  if (!maxAllowed) {
    return new Response("Error! Missing maxAllowed parameter", { status: 500 });
  }

  const key = `cheers-${res.id}`;

  const value = await kv.get(key);
  const count = value ? parseInt(value as string) : -1;

  if (count < 0) {
    await kv.set(key, 0, { ex: HALF_DAY_SECONDS });
  }

  if (count >= maxAllowed) {
    return new Response(`Error! You've reached your limit! Try again later!`, {
      status: 400,
    });
  }

  kv.incr(key);
  const conn = connect(config);
  const results = await conn.execute(
    "INSERT INTO post_cheers (slug, cheers_date, location) VALUES (?, ?, ?)",
    [res.slug, new Date(), res.location ?? "unknown"]
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
    "SELECT count(*) as count FROM post_cheers WHERE slug = ?",
    [slug]
  );

  return new Response(JSON.stringify(results.rows[0]), { status: 200 });
}
