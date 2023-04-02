import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./hi.module.css";
import { faPartyHorn } from "@fortawesome/pro-solid-svg-icons";

export default function hiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.h2}>
        <FontAwesomeIcon icon={faPartyHorn} /> Hi there! It&apos;s nice to meet
        you!
      </h2>
      {children}
    </div>
  );
}
