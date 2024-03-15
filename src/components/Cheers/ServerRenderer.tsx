import { CheersClientRenderer } from "./ClientRenderer";
import styles from "./cheers.module.css";

interface CheersServerRendererProps {
  slug: string;
  location: string;
}

const getValue = async (slug: string): Promise<number> => {
  try {
    const data = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3561"
          : "https://keegan.codes"
      }/api/cheers?slug=${slug}`,
      {
        cache: "no-store",
      }
    );

    const { count } = await data.json();

    return parseInt(count);
  } catch (ex) {
    console.error("Error for slug when getting cheers count", slug, ex);
    return 0;
  }
};

export const CheersServerRenderer = async ({
  slug,
  location,
}: CheersServerRendererProps) => {
  const count = await getValue(slug);
  return (
    <div className={styles.container}>
      <CheersClientRenderer count={count} slug={slug} location={location} />
    </div>
  );
};
