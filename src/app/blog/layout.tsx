import { Suspense } from "react";
import Loading from "./LoadingComponent";

export default function BlogLayout({ children, modal }: any) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
