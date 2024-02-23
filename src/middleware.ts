import { NextRequest, NextResponse } from "next/server";
import { connect } from "@planetscale/database";

const psConfig = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export async function middleware(request: NextRequest) {
  const conn = connect(psConfig);

  const code = request.url.split("/").pop();

  if (!code) {
    console.warn("No code found in request but one was expected, skipping...");
    return NextResponse.next();
  }

  try {
    const destination = await conn.execute(
      "SELECT destination FROM scan_destinations WHERE code = ? LIMIT 1",
      [parseInt(code, 10)]
    );

    if (!destination?.rows?.[0]) {
      console.warn(`No destination exists for code ${code}, skipping...`);
      return NextResponse.next();
    }

    try {
      await conn.execute("INSERT INTO scan (code, scan_date) VALUES (?, ?)", [
        parseInt(code, 10),
        new Date(),
      ]);
    } catch (ex) {
      console.error("Could not insert scan tracking", ex);
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(destination?.rows?.[0]?.destination, request.url)
    );
  } catch (ex) {
    console.error("Could not process scan", ex);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/scan/:id*",
};
