import { getTotalViews } from '@/util/db';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const views = await getTotalViews();

    return NextResponse.json({
      views,
    });
  } catch (ex) {
    console.error(ex);
    return new Response(JSON.stringify(ex), { status: 500 });
  }
}
