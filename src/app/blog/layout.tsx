import { Suspense } from "react";
import Loading from "./LoadingComponent";

export default function BlogLayout({ children, modal }: any) {
  return (
    <>
      {modal}
      {/*
        Manually doing suspense here instead of loading.tsx because it seems
        to have some issues with parallel routes, and route interception.
      */}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
