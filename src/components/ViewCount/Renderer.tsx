import { merge } from "@/util/classNames";

interface ViewCountRendererProps {
  slug: string;
  className?: string;
}

const getValue = async (slug: string): Promise<number> => {
  try {
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
  } catch (ex) {
    console.error("Error for slug", slug, ex);
    return 0;
  }
};

export const ViewCountRenderer = async ({
  slug,
  className,
}: ViewCountRendererProps) => {
  const views = await getValue(slug);

  return <span className={merge(className)}>{views}</span>;
};
