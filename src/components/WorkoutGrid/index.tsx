import styles from './workoutGrid.module.css';

type WorkoutGridProps = {
  children: any;
};

export default function WorkoutGrid(props: WorkoutGridProps) {
  const { children } = props;

  return <div className={styles.wrapper}>{children}</div>;
}
