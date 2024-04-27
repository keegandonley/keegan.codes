'use client';

import { injectVariables, merge } from '@keegancodes/foundations';
import styles from './playground.module.css';
import { GeistMono } from 'geist/font/mono';
import { KeyboardEvent, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { track } from '@vercel/analytics/server';
import sanitizeHtml from 'sanitize-html';
import { Avatar } from '@/components/Avatar';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@keegandonley/pro-solid-svg-icons';
import { useCopyElementText } from '@keegancodes/foundations-react';

export const runtime = 'edge';

// This is invalid: <div id=“test”>Hello</div>
const cleanQuotes = (str: string) => {
  return str.replace(/“/g, '"').replace(/”/g, '"');
};

export default function PlaygroundPage() {
  const urlQuery = useSearchParams();

  const htmlParam = urlQuery?.get('html');
  const cssParam = urlQuery?.get('css');
  const frameless = urlQuery?.get('frameless') || 'false';
  const isFrameless = frameless === 'true';
  const nameParam = urlQuery?.get('name') || 'Playground';
  const decodedNameParam = decodeURIComponent(nameParam);

  const [cssContent, setCssContent] = useState(() =>
    cssParam
      ? cleanQuotes(decodeURIComponent(atob(decodeURIComponent(cssParam))))
      : '',
  );
  const [htmlContent, setHtmlContent] = useState(() =>
    htmlParam
      ? cleanQuotes(decodeURIComponent(atob(decodeURIComponent(htmlParam))))
      : '',
  );
  const [name, setName] = useState(decodedNameParam);

  const htmlBase64 = encodeURIComponent(btoa(encodeURIComponent(htmlContent)));
  const cssBase64 = encodeURIComponent(btoa(encodeURIComponent(cssContent)));

  const { onClick: onClickCopyHTML, pending: pendingCopyHTML } =
    useCopyElementText(htmlContent);
  const { onClick: onClickCopyCSS, pending: pendingCopyCSS } =
    useCopyElementText(cssContent);

  if (
    htmlBase64 !== htmlParam ||
    cssBase64 !== cssParam ||
    decodedNameParam !== name
  ) {
    const url = `?html=${htmlBase64}&css=${cssBase64}&frameless=${frameless}&name=${encodeURIComponent(name)}`;
    window.history.replaceState(
      {
        path: url,
      },
      '',
      url,
    );
  }

  const handleSetCSS = (value: string) => {
    setCssContent(cleanQuotes(value));
  };

  const handleSetHTML = (value: string) => {
    setHtmlContent(cleanQuotes(value));
  };

  const handleKeyPress = (type: 'css' | 'html') => (e: KeyboardEvent<any>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      if (start === end) {
        const result =
          e.currentTarget.value.substring(0, start) +
          '  ' +
          e.currentTarget.value.substring(end);
        e.currentTarget.value = result;
        e.currentTarget.selectionStart = start + 2;
        e.currentTarget.selectionEnd = start + 2;
        if (type === 'css') {
          handleSetCSS(result);
        } else if (type === 'html') {
          handleSetHTML(result);
        }
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {isFrameless ? null : (
        <h1 className={merge(styles.heading, GeistMono.className)}>
          <input
            placeholder="Playground"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className={merge(styles.field, styles.name, GeistMono.className)}
          />
        </h1>
      )}
      <div className={styles.output}>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(htmlContent, {
              allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                '*': ['class', 'id', 'style', 'width', 'height'],
              },
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            }),
          }}
        />
      </div>
      <div className={styles.inputs}>
        <div className={merge(styles.input, styles.html)}>
          <span className={merge(styles.header)}>
            <span className={merge(styles.langText, GeistMono.className)}>
              html
            </span>
            <button
              className={styles.button}
              onClick={onClickCopyHTML}
              disabled={pendingCopyHTML}
            >
              <div
                className={merge(
                  styles.clicker,
                  pendingCopyHTML ? styles.clicked : styles.copy,
                )}
              >
                <FontAwesomeIcon icon={faCheck} />
                <FontAwesomeIcon icon={faCopy} />
              </div>
            </button>
          </span>
          <textarea
            className={merge(styles.htmlBlock, styles.codeBlock)}
            style={injectVariables([
              ['ffamily', GeistMono.style.fontFamily],
              ['fstyle', GeistMono.style.fontStyle],
            ])}
            onChange={(e) => handleSetHTML(e.currentTarget.value)}
            onKeyDown={handleKeyPress('html')}
            value={htmlContent}
          />
        </div>
        <div className={merge(styles.input, styles.css)}>
          <span className={merge(styles.header)}>
            <span className={merge(styles.langText, GeistMono.className)}>
              css
            </span>
            <button
              className={styles.button}
              onClick={onClickCopyCSS}
              disabled={pendingCopyCSS}
            >
              <div
                className={merge(
                  styles.clicker,
                  pendingCopyCSS ? styles.clicked : styles.copy,
                )}
              >
                <FontAwesomeIcon icon={faCheck} />
                <FontAwesomeIcon icon={faCopy} />
              </div>
            </button>
          </span>
          <textarea
            className={merge(styles.styleBlock, styles.codeBlock)}
            style={injectVariables([
              ['ffamily', GeistMono.style.fontFamily],
              ['fstyle', GeistMono.style.fontStyle],
            ])}
            onChange={(e) => handleSetCSS(e.currentTarget.value)}
            onKeyDown={handleKeyPress('css')}
            value={cssContent}
          />
        </div>
      </div>
      {frameless === 'true' ? (
        <div className={styles.framelessFooter}>
          <Link href="https://keegan.codes" target="_blank">
            <div>
              <Avatar width={40} />
            </div>
            Keegan Donley | keegan.codes
          </Link>
        </div>
      ) : null}
      <style>{cssContent}</style>
    </div>
  );
}
