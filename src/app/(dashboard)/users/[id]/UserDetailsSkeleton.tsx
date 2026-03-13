import { Skeleton } from "@/components/ui/Skeleton";
import styles from "./UserDetailsSkeleton.module.scss";

export function UserDetailsSkeleton() {
  return (
    <div className={styles.container}>
      <Skeleton width={120} height={20} className={styles.backLink} />

      <div className={styles.header}>
        <Skeleton width={200} height={32} />
        <div className={styles.actions}>
          <Skeleton width={150} height={40} />
          <Skeleton width={150} height={40} />
        </div>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.profileInfo}>
            <Skeleton variant="circle" width={100} height={100} />
            <div className={styles.profileName}>
              <Skeleton width={150} height={24} />
              <Skeleton width={80} height={16} />
            </div>
          </div>
          <div className={styles.profileTier}>
            <Skeleton width={100} height={16} />
            <Skeleton width={80} height={16} />
          </div>
          <div className={styles.profileBalance}>
            <Skeleton width={120} height={24} />
            <Skeleton width={150} height={16} />
          </div>
        </div>
        <div className={styles.tabs}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} width={100} height={40} />
          ))}
        </div>
      </div>

      <div className={styles.detailsCard}>
        {[1, 2].map((section) => (
          <div key={section} className={styles.section}>
            <Skeleton width={180} height={20} className={styles.sectionTitle} />
            <div className={styles.fieldGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((field) => (
                <div key={field} className={styles.field}>
                  <Skeleton width="40%" height={12} />
                  <Skeleton width="80%" height={16} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
