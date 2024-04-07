import { merge } from '@keegancodes/foundations';
import styles from './thirstyBot.module.css';

interface CaptionProps {
  children: any;
}

export const Caption = (props: CaptionProps) => {
  const { children } = props;

  return <div className={merge(styles.caption)}>{children}</div>;
};

interface ChecklistProps {
  children: any;
}

export const Checklist = (props: ChecklistProps) => {
  const { children } = props;

  return <div className={merge(styles.checklist)}>{children}</div>;
};
