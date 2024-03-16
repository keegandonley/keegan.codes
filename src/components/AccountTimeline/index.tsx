import { headers } from "next/headers";
import { TimelineEntry } from "./Entry";
import { Suspense } from "react";
import styles from "./timeline.module.css";
import { getTimelineForUser } from "@/util/userData";

const pageSize = 20;

export const AccountTimeline = async () => {
  const headersList = headers();

  const userId = headersList.get("x-user-id");
  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const firstPage = await getTimelineForUser(userId, pageSize, 0);

  return (
    <div className={styles.container}>
      {firstPage.map((entry) => {
        return (
          <Suspense key={`timeline-${entry.id}`}>
            <TimelineEntry entry={entry} />
          </Suspense>
        );
      })}
    </div>
  );
};
