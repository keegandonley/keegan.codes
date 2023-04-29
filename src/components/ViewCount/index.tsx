import { merge } from "@/util/classNames";
import { ViewCountRenderer as _ViewCountRenderer } from "./Renderer";
import { Suspense } from "react";
import { ViewCountFallback } from "./Fallback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/pro-solid-svg-icons";

const ViewCountRenderer = _ViewCountRenderer as any;

interface ViewCountProps {
  slug: string;
  className?: string;
}

export const ViewCount = ({ slug, className }: ViewCountProps) => {
  return (
    <span className={className}>
      <FontAwesomeIcon icon={faEye} fixedWidth />
      <Suspense fallback={<ViewCountFallback />}>
        <ViewCountRenderer slug={slug} />
      </Suspense>
    </span>
  );
};
