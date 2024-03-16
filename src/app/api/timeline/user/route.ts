import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { connect } from "@planetscale/database";
import { TimelineEntry } from "@/types/timeline";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export const getTimelineForUser = async (
  userId: string,
  pageSize: number,
  page: number
): Promise<TimelineEntry[]> => {
  const conn = connect(config);

  // Offset pagination to keep it simple
  const results = await conn.execute(
    "SELECT * FROM user_timeline_views  WHERE user_id = ? ORDER BY `ts` DESC LIMIT ? OFFSET ?",
    [userId, pageSize, page * pageSize]
  );

  return (results?.rows ?? []) as TimelineEntry[];
};

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? "0";
  const pageSize = url.searchParams.get("pageSize") ?? "20";

  const parsedPage = parseInt(page, 10);
  const parsedPageSize = parseInt(pageSize, 10);

  const results = await getTimelineForUser(userId, parsedPageSize, parsedPage);

  return new Response(JSON.stringify({ entries: results }));
}
