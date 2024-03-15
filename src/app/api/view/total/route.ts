import { connect } from "@planetscale/database";
import { NextResponse } from "next/server";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export const runtime = "edge";

export async function GET(request: Request) {
  const conn = connect(config);

  try {
    const res = await conn.execute(
      "SELECT views FROM page_views_total WHERE type = ?",
      ["post"]
    );

    console.log(res);

    return NextResponse.json({
      views: res?.rows?.[0]?.views ?? 0,
    });
  } catch (ex) {
    console.error(ex);
    return new Response(JSON.stringify(ex), { status: 500 });
  }
}
