import { Skeleton } from "@/components/ui/Skeleton";
import styles from "./UsersTableSkeleton.module.scss";

export function UsersTableSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.tableSkeleton}>
        <div className={styles.header}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} height={20} width="80%" />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className={styles.row}>
            {[1, 2, 3, 4, 5, 6].map((col) => (
              <Skeleton key={col} height={16} width="90%" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
