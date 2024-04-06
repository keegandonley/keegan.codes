import { SlideControls } from '@/components/SlideControls';

export default function SlidesLayout({ children }: { children: any }) {
  return (
    <>
      {children}
      <SlideControls />
    </>
  );
}
