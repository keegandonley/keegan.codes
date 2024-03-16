import { SignIn } from "@clerk/nextjs";
import styles from "./login.module.css";

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <SignIn />
    </div>
  );
}
