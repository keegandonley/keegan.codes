import { merge } from '@/util/classNames';
import { MDXComponentBaseProps } from '../types';
import aStyles from './a.module.css';
import Link from 'next/link';

interface AnchorProps extends MDXComponentBaseProps {
  href?: string;
}

export const Anchor = ({ children, className, href }: AnchorProps) => {
  if (href?.startsWith('/')) {
    return (
      <Link className={merge(aStyles.a, className)} href={href}>
        {children}
      </Link>
    );
  }

  if (href?.startsWith('#')) {
    return (
      <a className={merge(aStyles.a, className)} href={href}>
        {children}
      </a>
    );
  }

  return (
    <a
      className={merge(aStyles.a, className)}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );
};
