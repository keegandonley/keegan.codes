import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './browsersupport.module.css';
import {
  faChrome,
  faEdge,
  faFirefoxBrowser,
  faInternetExplorer,
  faSafari,
} from '@fortawesome/free-brands-svg-icons';
import { merge } from '@/util/classNames';

export enum SUPPORTLEVELS {
  FULL,
  PARTIAL,
  NONE,
}

interface BrowserSupportProps {
  chrome: SUPPORTLEVELS;
  firefox: SUPPORTLEVELS;
  safari: SUPPORTLEVELS;
  edge: SUPPORTLEVELS;
  ie: SUPPORTLEVELS;
}

export const BrowserSupport = ({
  chrome,
  firefox,
  safari,
  edge,
  ie,
}: BrowserSupportProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.browser}>
        <div
          className={merge(
            styles.support,
            chrome === SUPPORTLEVELS.FULL && styles.full,
            chrome === SUPPORTLEVELS.PARTIAL && styles.partial,
            chrome === SUPPORTLEVELS.NONE && styles.none,
          )}
        >
          <FontAwesomeIcon icon={faChrome} />
        </div>
        <div className={styles.browserName}>Chrome</div>
      </div>
      <div className={styles.browser}>
        <div
          className={merge(
            styles.support,
            firefox === SUPPORTLEVELS.FULL && styles.full,
            firefox === SUPPORTLEVELS.PARTIAL && styles.partial,
            firefox === SUPPORTLEVELS.NONE && styles.none,
          )}
        >
          <FontAwesomeIcon icon={faFirefoxBrowser} />
        </div>
        <div className={styles.browserName}>Firefox</div>
      </div>
      <div className={styles.browser}>
        <div
          className={merge(
            styles.support,
            safari === SUPPORTLEVELS.FULL && styles.full,
            safari === SUPPORTLEVELS.PARTIAL && styles.partial,
            safari === SUPPORTLEVELS.NONE && styles.none,
          )}
        >
          <FontAwesomeIcon icon={faSafari} />
        </div>
        <div className={styles.browserName}>Safari</div>
      </div>
      <div className={styles.browser}>
        <div
          className={merge(
            styles.support,
            edge === SUPPORTLEVELS.FULL && styles.full,
            edge === SUPPORTLEVELS.PARTIAL && styles.partial,
            edge === SUPPORTLEVELS.NONE && styles.none,
          )}
        >
          <FontAwesomeIcon icon={faEdge} />
        </div>
        <div className={styles.browserName}>Edge</div>
      </div>
      <div className={styles.browser}>
        <div
          className={merge(
            styles.support,
            ie === SUPPORTLEVELS.FULL && styles.full,
            ie === SUPPORTLEVELS.PARTIAL && styles.partial,
            ie === SUPPORTLEVELS.NONE && styles.none,
          )}
        >
          <FontAwesomeIcon icon={faInternetExplorer} />
        </div>
        <div className={styles.browserName}>IE</div>
      </div>
    </div>
  );
};
