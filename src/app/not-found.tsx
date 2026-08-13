/*
 Note: This page is using inline styles because there seems to be a nextjs
 bug that causes a FOUC when navigating to the not-found page if it uses
 CSS modules. I'll need to investigate this further but this works fine for now.
*/

import { Suspense } from 'react';
import { Graphic } from './routing-error/graphic';
import { NotFoundDetail, NotFoundDetailFallback } from './not-found-detail';

export default function NotFound() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        color: 'var(--theme-text)',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          textAlign: 'center',
          padding: '0 2rem',
        }}
      >
        <Graphic />
        <Suspense fallback={<NotFoundDetailFallback />}>
          <NotFoundDetail />
        </Suspense>
      </div>
    </div>
  );
}
