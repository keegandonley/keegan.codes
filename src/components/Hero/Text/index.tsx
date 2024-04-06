import { ElementBaseProps } from '@/types/elements';
import styles from './herotext.module.css';
import { merge } from '@/util/classNames';

interface HeroTextProps extends ElementBaseProps {}

export const HeroText = ({ children, className }: HeroTextProps) => {
  return <h1 className={merge(styles.text, className)}>{children}</h1>;
};
