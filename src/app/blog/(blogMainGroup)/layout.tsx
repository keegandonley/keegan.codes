import dynamic from "next/dynamic";
import { Suspense } from "react";

const DeferredGraph = dynamic(() =>
  import("@/app/blog/(blogMainGroup)/DeferredGraph").then(
    (mod) => mod.DeferredGraph
  )
);

export default function BlogLayout({ children }: any) {
  return (
    <>
      {children}
      <Suspense>
        <DeferredGraph />
      </Suspense>
    </>
  );
}
