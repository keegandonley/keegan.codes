import { merge } from '@/util/classNames';
import { MDXComponentBaseProps } from '../types';
import pStyles from './p.module.css';

interface ParagraphProps extends MDXComponentBaseProps {}

export const Paragraph = ({ children, className }: ParagraphProps) => {
  return <p className={merge(pStyles.p, className)}>{children}</p>;
};
