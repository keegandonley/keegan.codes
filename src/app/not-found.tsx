import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/";
import styles from "./not-found.module.css";
import { faCompassSlash } from "@fortawesome/pro-solid-svg-icons";

export const runtime = "edge";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon icon={faCompassSlash} className={styles.icon} />
      <h2 className={styles.h1}>
        Oops! That resource doesn&apos;t seem to exist
      </h2>
      <p className={styles.p}>
        Please double check that the URL you entered is correct and try your
        request again.
      </p>
    </div>
  );
}
