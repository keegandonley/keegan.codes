import { SlideControls } from '@/components/SlideControls';
import { Suspense } from 'react';

export default function SlidesLayout({ children }: { children: any }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <SlideControls />
      </Suspense>
    </>
  );
}
