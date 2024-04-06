import { merge } from '@/util/classNames';
import { MDXComponentBaseProps } from '../../types';
import h5Styles from './h5.module.css';
import hStyles from '../h.module.css';
import { getId } from '../util';

interface H5Props extends MDXComponentBaseProps {}

export const H5 = ({ children, className }: H5Props) => {
  return (
    <h5
      className={merge(hStyles.h, h5Styles.h5, className)}
      id={getId(children)}
    >
      {children}
    </h5>
  );
};
