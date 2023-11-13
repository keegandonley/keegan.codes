import { ViewCountRenderer as _ViewCountRenderer } from "./Renderer";
import { Suspense } from "react";
import { ViewCountFallback } from "./Fallback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/pro-solid-svg-icons";

const ViewCountRenderer = _ViewCountRenderer as any;

interface ViewCountProps {
  slug: string;
  className?: string;
  fixedCount?: number;
}

export default function ViewCount({
  slug,
  className,
  fixedCount,
}: ViewCountProps) {
  return (
    <span className={className}>
      <FontAwesomeIcon icon={faEye} fixedWidth />
      {fixedCount ? (
        <span>{fixedCount}</span>
      ) : (
        <Suspense fallback={<ViewCountFallback />}>
          <ViewCountRenderer slug={slug} />
        </Suspense>
      )}
    </span>
  );
}
