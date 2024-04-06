'use client';

import { useEffect } from 'react';

// This component scrolls you to the top of the page if it's rendered
// because nextjs has some weird scroll-preservation behavior:
// https://github.com/vercel/next.js/issues/42492
const ScrollFixer = () => {
  useEffect(
    () =>
      window.document.scrollingElement?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      }),
    [],
  );

  return null;
};

export default ScrollFixer;
