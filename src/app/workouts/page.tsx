import { Workout } from '@keegandonley/fitness-embed';
import styles from './workouts.module.css';

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <Workout
        distanceFeet={138811}
        gpxUrl="https://fitness.static.donley.xyz/realale2024.gpx"
      />
    </div>
  );
}
