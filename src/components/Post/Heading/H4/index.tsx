import { merge } from '@/util/classNames';
import { MDXComponentBaseProps } from '../../types';
import h4Styles from './h4.module.css';
import hStyles from '../h.module.css';
import { getId } from '../util';

interface H4Props extends MDXComponentBaseProps {}

export const H4 = ({ children, className }: H4Props) => {
  return (
    <h4
      className={merge(hStyles.h, h4Styles.h4, className)}
      id={getId(children)}
    >
      {children}
    </h4>
  );
};
