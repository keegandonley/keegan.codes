import { injectVariables, merge } from '@/util/classNames';
import { GeistMono } from 'geist/font/mono';
import styles from './code.module.css';

interface CodeProps {
  children?: any;
  className?: string;
}

export const Code = ({ children, className }: CodeProps) => {
  return (
    <code
      className={merge(className, styles.parent)}
      style={injectVariables([
        ['ffamily', GeistMono.style.fontFamily],
        ['fstyle', GeistMono.style.fontStyle],
      ])}
    >
      {children}
    </code>
  );
};
