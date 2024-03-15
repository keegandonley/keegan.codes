import { merge } from "@/util/classNames";

const getValue = async (): Promise<number> => {
  try {
    const data = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3561"
          : "https://keegan.codes"
      }/api/view/total`,
      { cache: "no-store" }
    );

    const { views } = await data.json();

    return views;
  } catch (ex) {
    console.error("Error when getting total page views", ex);
    return 0;
  }
};

interface ViewCountRendererProps {
  className?: string;
}

export const ViewCountRenderer = async ({
  className,
}: ViewCountRendererProps) => {
  const views = await getValue();
  return <span className={merge(className)}>{views.toLocaleString()}</span>;
};
