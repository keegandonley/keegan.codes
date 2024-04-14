'use client';

import { injectVariables, merge } from '@/util/classNames';
import { GeistMono } from 'geist/font/mono';
import styles from './code.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@keegandonley/pro-solid-svg-icons';
import { useCopyElementText } from '@keegancodes/foundations-react';

interface CodeProps {
  children?: any;
  className?: string;
}

export const Code = ({ children, className }: CodeProps) => {
  const language = className?.replace('language-', '');

  const { ref, onClick, pending } = useCopyElementText();

  return (
    <code
      className={merge(className, styles.parent)}
      style={injectVariables([
        ['ffamily', GeistMono.style.fontFamily],
        ['fstyle', GeistMono.style.fontStyle],
      ])}
    >
      {language ? (
        <span className={merge(styles.header)}>
          <span className={styles.langText}>{language}</span>
          <button
            className={styles.button}
            onClick={onClick}
            disabled={pending}
          >
            <div
              className={merge(
                styles.clicker,
                pending ? styles.clicked : styles.copy,
              )}
            >
              <FontAwesomeIcon icon={faCheck} />
              <FontAwesomeIcon icon={faCopy} />
            </div>
          </button>
        </span>
      ) : null}
      <span ref={ref} className={language ? styles.text : ''}>
        {children}
      </span>
    </code>
  );
};
