import { connect } from "@planetscale/database";
import kv from "@vercel/kv";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

const MAX_ALLOWED_IN_24_HOURS = 30;
const ONE_DAY = 86400000;

export async function POST(request: Request) {
  const res: CheersBody = await request.json();
  if (!res.id) {
    return new Response("Error! Who are you?", { status: 400 });
  }
  const count = parseInt(
    ((await kv.get(`cheers-rl-${res.id}`)) as string) ?? 0
  );
  const starts = parseInt(
    ((await kv.get(`cheers-rl-starts-${res.id}`)) as string) ?? 0
  );

  if (starts === 0) {
    kv.set(`cheers-rl-starts-${res.id}`, Date.now());
  }

  const currentTs = Date.now();
  const diff = currentTs - starts;

  let quota = MAX_ALLOWED_IN_24_HOURS - count;
  if (diff > ONE_DAY) {
    quota = MAX_ALLOWED_IN_24_HOURS;
    kv.set(`cheers-rl-starts-${res.id}`, Date.now());
    kv.set(`cheers-rl-${res.id}`, 0);
  }

  console.log(quota, count, starts);
  if (quota <= 0) {
    return new Response(
      `Error! You've reached your limit! Try again in ${ONE_DAY - diff}ms`,
      { status: 400 }
    );
  }

  kv.set(`cheers-rl-${res.id}`, count + 1);
  const conn = connect(config);
  const results = await conn.execute(
    "INSERT INTO post_cheers (slug, cheers_date, location) VALUES (?, ?, ?)",
    [res.slug, new Date(), res.location ?? "unknown"]
  );

  if (results.rowsAffected !== 1) {
    kv.set(`cheers-rl-${res.id}`, count);
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

  console.log(results);

  return new Response(JSON.stringify(results.rows[0]), { status: 200 });
}
