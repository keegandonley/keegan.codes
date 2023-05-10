import { Suspense } from "react";
import dynamic from "next/dynamic";

const DynamicCurryingExampleClient = dynamic(() => import("./Client"));

export const CurryingExample = () => {
  return (
    <Suspense>
      <DynamicCurryingExampleClient />
    </Suspense>
  );
};
