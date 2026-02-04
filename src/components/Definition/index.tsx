import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defs from './definitions.json';
import styles from './definition.module.css';
import { faQuestionCircle } from '@keegandonley/pro-regular-svg-icons';
import { useId } from 'react';
import localFont from 'next/font/local';

const accentFont = localFont({
  // src: './fonts/Domine.ttf',
  src: '../../app/fonts/InstrumentSerif.ttf',
});

export const Definition = (props: { children: keyof typeof defs }) => {
  let def = defs[props.children];
  let key = props.children;
  const popoverId = useId();

  if ('see' in def && def.see) {
    key = def.see as keyof typeof defs;
    def = defs[def.see as keyof typeof defs];
  }

  if (
    !('partOfSpeech' in def) ||
    !('definition' in def) ||
    !def.partOfSpeech ||
    !def.definition
  ) {
    return <>{props.children}</>;
  }

  return (
    <span className={styles.wrapper}>
      {props.children}
      <button
        popoverTarget={popoverId}
        className={styles.button}
        aria-label={`Show definition for ${props.children}`}
      >
        <FontAwesomeIcon icon={faQuestionCircle} className={styles.icon} />
      </button>
      <span popover="auto" id={popoverId} className={styles.popover}>
        <strong className={accentFont.className}>{key}</strong>:{' '}
        <em className={accentFont.className}>{def.partOfSpeech}</em>
        <br />
        {def.definition}
      </span>
    </span>
  );
};
