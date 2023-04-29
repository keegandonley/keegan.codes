import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./loading.module.css";

export default function BlogModalLoading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        fontSize: "12rem",
      }}
    >
      <FontAwesomeIcon
        icon={faSpinnerThird}
        spin
        style={{
          margin: "0 auto",
        }}
        className={styles.icon}
      />
    </div>
  );
}
