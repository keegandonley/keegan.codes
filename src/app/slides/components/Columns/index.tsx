import { injectVariables } from '@/util/classNames';
import styles from './columns.module.css';

export const Columns = ({
  children,
  count,
}: {
  children: any;
  count: number;
}) => {
  return (
    <div
      className={styles.wrapper}
      style={injectVariables([['columns', String(count)]])}
    >
      {children}
    </div>
  );
};
