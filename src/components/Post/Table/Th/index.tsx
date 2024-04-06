import { merge } from '@/util/classNames';
import { MDXComponentBaseProps } from '../../types';
import tableStyles from '../table.module.css';
import styles from './th.module.css';

interface ThProps extends MDXComponentBaseProps {}

export const Th = ({ children, className }: ThProps) => {
  return (
    <th className={merge(styles.th, tableStyles.cell, className)}>
      {children}
    </th>
  );
};
