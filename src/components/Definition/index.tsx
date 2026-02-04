import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defs from './definitions.json';
import { faMagnifyingGlass } from '@keegandonley/pro-solid-svg-icons';
import styles from './definition.module.css';
import { faInfoCircle } from '@keegandonley/pro-regular-svg-icons';

export const Definition = (props: { children: keyof typeof defs }) => {
  const def = defs[props.children];

  if (!def) {
    return <>{props.children}</>;
  }

  return (
    <abbr title={def} className={styles.wrapper}>
      {props.children}
      <FontAwesomeIcon icon={faInfoCircle} className={styles.icon} />
    </abbr>
  );
};
