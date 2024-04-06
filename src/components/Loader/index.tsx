import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './loader.module.css';

export const Loader = () => {
  return (
    <div
      className={styles.container}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        fontSize: '12rem',
        opacity: 0,
      }}
    >
      <FontAwesomeIcon icon={faSpinnerThird} spin className={styles.icon} />
    </div>
  );
};
