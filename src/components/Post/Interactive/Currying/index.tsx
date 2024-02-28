import dynamic from "next/dynamic";

const DynamicCurryingExampleClient = dynamic(() => import("./Client"));

export const CurryingExample = () => {
  return <DynamicCurryingExampleClient />;
};
