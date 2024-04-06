import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './chat.module.css';
import { faHeadset } from '@fortawesome/pro-solid-svg-icons';

export default function ChatLayout({ children }: { children: any }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        <FontAwesomeIcon icon={faHeadset} className={styles.icon} /> Let&apos;s
        Chat!
      </h1>
      {children}
    </div>
  );
}
