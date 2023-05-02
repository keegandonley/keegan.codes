import { Suspense } from "react";
import { CheersServerRenderer as _CheersServerRenderer } from "./ServerRenderer";
import { CheersClientRenderer } from "./ClientRenderer";

const CheersServerRenderer = _CheersServerRenderer as any;

interface CheersProps {
  slug: string;
  location: string;
}

export const Cheers = ({ slug, location }: CheersProps) => {
  return (
    <Suspense
      fallback={
        <CheersClientRenderer slug={slug} location={location} count={-1} />
      }
    >
      <CheersServerRenderer slug={slug} location={location} />
    </Suspense>
  );
};
