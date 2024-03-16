import { getTimelineForUser } from "@/util/userData";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

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
