import { AccountTimeline } from "@/components/AccountTimeline";
import { Suspense } from "react";
import styles from "./timeline.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>Your Reading History</h1>
      <Suspense>
        <AccountTimeline />
      </Suspense>
    </div>
  );
}
