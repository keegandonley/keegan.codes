import { LayoutProps } from "../../../.next/types/app/blog/layout";

export default function BlogLayout({ children, modal }: LayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
