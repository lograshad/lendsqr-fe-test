import { Skeleton } from "@/components/ui/Skeleton";
import styles from "./StatCardsSkeleton.module.scss";

export function StatCardsSkeleton() {
  return (
    <div className={styles.statCards}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={styles.statCard}>
          <Skeleton variant="circle" width={40} height={40} className={styles.icon} />
          <Skeleton width="60%" height={14} className={styles.label} />
          <Skeleton width="40%" height={24} className={styles.value} />
        </div>
      ))}
    </div>
  );
}
