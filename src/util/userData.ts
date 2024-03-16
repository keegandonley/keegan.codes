import { TimelineEntry } from "@/types/timeline";
import { connect } from "@planetscale/database";

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
