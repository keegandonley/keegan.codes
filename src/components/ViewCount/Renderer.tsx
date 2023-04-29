import { merge } from "@/util/classNames";
import { cache } from "react";

interface ViewCountRendererProps {
  slug: string;
  className?: string;
}

const getValue = async (slug: string): Promise<number> => {
  const data = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://keegan.codes"
    }/api/view?slug=${slug}`,
    { next: { revalidate: 60 } }
  );

  const { views } = await data.json();

  return views;
};

export const ViewCountRenderer = async ({
  slug,
  className,
}: ViewCountRendererProps) => {
  const views = await getValue(slug);

  return <span className={merge(className)}>{views}</span>;
};
