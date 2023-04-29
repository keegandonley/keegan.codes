import { merge } from "@/util/classNames";

interface ViewCountFallbackProps {
  className?: string;
}

export const ViewCountFallback = ({ className }: ViewCountFallbackProps) => {
  return <span className={merge(className)}>--</span>;
};
