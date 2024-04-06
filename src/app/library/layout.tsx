import { ModalBoundary } from '@/components/ModalBoundary';

export default function LibraryLayout({ children, libraryModal }: any) {
  return (
    <>
      {children}
      <ModalBoundary>{libraryModal}</ModalBoundary>
    </>
  );
}
