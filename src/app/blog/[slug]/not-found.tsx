import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./404.module.css";
import { faBinarySlash } from "@fortawesome/pro-solid-svg-icons";

export const runtime = "experimental-edge";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon icon={faBinarySlash} className={styles.icon} />
      <h2 className={styles.h1}>
        Oops! That blog post doesn&apos;t seem to exist
      </h2>
      <p className={styles.p}>
        Please double check that the URL you entered is correct and try your
        request again.
      </p>
    </div>
  );
}
