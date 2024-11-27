import { getCountriesViews } from '@/util/db';
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

  try {
    const countries = await getCountriesViews(parsed);

    return NextResponse.json({
      countries,
    });
  } catch (ex) {
    console.error(ex);
    return new Response(JSON.stringify(ex), { status: 500 });
  }
}
