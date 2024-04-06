import { ElementBaseProps } from '@/types/elements';
import { fallback } from '@/util/classNames';
import Link from 'next/link';
import styles from './button.module.css';

interface ButtonProps extends ElementBaseProps {
  href: string;
}

export const Button = ({ href, children, className }: ButtonProps) => {
  return (
    <Link href={href} className={fallback(className, styles.button)}>
      {children}
    </Link>
  );
};
