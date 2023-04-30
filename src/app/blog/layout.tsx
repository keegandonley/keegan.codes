import { ModalBoundary } from "@/components/ModalBoundary";

export default function BlogLayout({ children, modal }: any) {
  return (
    <>
      {children}
      <ModalBoundary>{modal}</ModalBoundary>
    </>
  );
}
