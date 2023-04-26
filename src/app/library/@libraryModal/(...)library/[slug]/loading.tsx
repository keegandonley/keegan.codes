import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./loading.module.css";

export default function LibraryModalLoading() {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faSpinnerThird} spin className={styles.icon} />
    </div>
  );
}
