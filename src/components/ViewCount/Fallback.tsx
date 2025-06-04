import { merge } from '@/util/classNames';

interface ViewCountFallbackProps {
  className?: string;
  digits?: number;
}

export const ViewCountFallback = ({
  className,
  digits = 2,
}: ViewCountFallbackProps) => {
  return (
    <span className={merge(className)}>
      {Array.from({ length: digits }).map((_, i) => (
        <span key={i}>-</span>
      ))}
    </span>
  );
};
