'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './definition.module.css';
import { faQuestionCircle } from '@keegandonley/pro-regular-svg-icons';
import { useId } from 'react';
import localFont from 'next/font/local';
import va from '@vercel/analytics';

const accentFont = localFont({
  src: '../../app/fonts/InstrumentSerif.ttf',
});

interface DefinitionClientProps {
  term: string;
  termKey: string;
  partOfSpeech: string;
  definition: string;
}

export const DefinitionClient = ({
  term,
  termKey,
  partOfSpeech,
  definition,
}: DefinitionClientProps) => {
  const popoverId = useId();

  const trackDefinition = () => {
    va.track('View Definition', {
      term: termKey,
    });
  };

  return (
    <span className={styles.wrapper}>
      {term}
      <button
        popoverTarget={popoverId}
        className={styles.button}
        aria-label={`Show definition for ${term}`}
        onClick={trackDefinition}
      >
        <FontAwesomeIcon icon={faQuestionCircle} className={styles.icon} />
      </button>
      <span popover="auto" id={popoverId} className={styles.popover}>
        <strong className={accentFont.className}>{termKey}</strong>:{' '}
        <em className={accentFont.className}>{partOfSpeech}</em>
        <br />
        {definition}
      </span>
    </span>
  );
};
