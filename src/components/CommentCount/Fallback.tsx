import { merge } from '@/util/classNames';

interface CommentCountFallbackProps {
  className?: string;
  digits?: number;
}

export const CommentCountFallback = ({
  className,
  digits = 2,
}: CommentCountFallbackProps) => {
  return (
    <span className={merge(className)}>
      {Array.from({ length: digits }).map((_, i) => (
        <span key={i}>-</span>
      ))}
    </span>
  );
};
