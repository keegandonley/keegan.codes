import { merge } from '@/util/classNames';
import { MDXComponentBaseProps } from '../../types';
import h3Styles from './h3.module.css';
import hStyles from '../h.module.css';
import { getId } from '../util';
import localFont from 'next/font/local';

const accentFont = localFont({
  // src: './fonts/Domine.ttf',
  src: '../../../../app/fonts/InstrumentSerif.ttf',
});

interface H3Props extends MDXComponentBaseProps {}

export const H3 = ({ children, className }: H3Props) => {
  return (
    <h3
      className={merge(hStyles.h, h3Styles.h3, className, accentFont.className)}
      id={getId(children)}
    >
      {children}
    </h3>
  );
};
