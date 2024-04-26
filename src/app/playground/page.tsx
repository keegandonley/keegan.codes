'use client';

import { injectVariables, merge } from '@keegancodes/foundations';
import styles from './playground.module.css';
import { GeistMono } from 'geist/font/mono';
import { KeyboardEvent, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { track } from '@vercel/analytics/server';
import sanitizeHtml from 'sanitize-html';

export default function PlaygroundPage() {
  const urlQuery = useSearchParams();
  const hasTracked = useRef(false);

  const htmlParam = urlQuery?.get('html');
  const cssParam = urlQuery?.get('css');

  const [cssContent, setCssContent] = useState(() =>
    cssParam ? atob(decodeURIComponent(cssParam)) : '',
  );
  const [htmlContent, setHtmlContent] = useState(() =>
    htmlParam ? atob(decodeURIComponent(htmlParam)) : '',
  );

  const htmlBase64 = btoa(htmlContent);
  const cssBase64 = btoa(cssContent);

  if (htmlBase64 !== htmlParam || cssBase64 !== cssParam) {
    window.history.pushState(
      {
        path: `?html=${encodeURIComponent(htmlBase64)}&css=${encodeURIComponent(cssBase64)}`,
      },
      '',
      `?html=${encodeURIComponent(htmlBase64)}&css=${encodeURIComponent(cssBase64)}`,
    );
  }

  if (!hasTracked.current) {
    hasTracked.current = true;
    track('View Playground');
  }

  const handleSetCSS = (value: string) => {
    setCssContent(value);
  };

  const handleSetHTML = (value: string) => {
    setHtmlContent(value);
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
      <div className={styles.output}>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(htmlContent, {
              allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                '*': ['class', 'id', 'style', 'width', 'height'],
              },
            }),
          }}
        />
      </div>
      <div className={styles.inputs}>
        <div className={merge(styles.input, styles.html)}>
          <span className={merge(styles.header)}>
            <span className={styles.langText}>html</span>
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
            <span className={styles.langText}>css</span>
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
      <style>{cssContent}</style>
    </div>
  );
}
