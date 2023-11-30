import Video from "next-video";
import styles from "./video.module.css";
import "./main.css";
import { merge } from "@/util/classNames";

export default function TestingPage() {
  return (
    <div className={merge(styles.wrapper)}>
      <h1>Testing Code Talk for SSU Computer Science Club</h1>
      <div>
        <Video src="https://video.static.donley.xyz/testing-SSU-CS-club.mp4" />
      </div>
    </div>
  );
}
