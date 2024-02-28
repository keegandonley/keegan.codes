import dynamic from "next/dynamic";

const DeferredGraph = dynamic(
  () =>
    import("@/app/blog/(blogMainGroup)/DeferredGraph").then(
      (mod) => mod.DeferredGraph
    ),
  {
    ssr: false,
  }
);

export default function BlogLayout({ children }: any) {
  return (
    <>
      {children}
      <DeferredGraph />
    </>
  );
}
