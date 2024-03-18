import { merge } from "@/util/classNames";
import { getFullyQualifiedDeploymentUrl } from "@/util/deployment";

interface ViewCountRendererProps {
  slug: string;
  className?: string;
  fixedCount?: number;
}

const getValue = async (slug: string): Promise<number> => {
  try {
    const data = await fetch(
      getFullyQualifiedDeploymentUrl(`/api/view?slug=${slug}`),
      { cache: "no-store" }
    );

    const { views } = await data.json();

    return views;
  } catch (ex) {
    console.error("Error for slug when getting page views", slug, ex);
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
