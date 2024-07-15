import { connect } from '@planetscale/database';
import { NextResponse } from 'next/server';

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export const runtime = 'edge';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') ?? '3';
  let parsed = parseInt(limit, 10);

  if (parsed > 20) {
    parsed = 20;
  }

  const conn = connect(config);

  try {
    const res = await conn.execute(
      'SELECT code, views FROM location_page_views ORDER BY views DESC LIMIT ?',
      [parsed],
    );

    return NextResponse.json({
      countries:
        res?.rows?.map((row) => ({
          code: row.code,
          views: parseInt(row.views, 10),
        })) ?? [],
    });
  } catch (ex) {
    console.error(ex);
    return new Response(JSON.stringify(ex), { status: 500 });
  }
}
