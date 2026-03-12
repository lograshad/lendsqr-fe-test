import Link from "next/link";
import styles from "./page.module.scss";

export default function ForgotPasswordPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Forgot password</h1>
        <p className={styles.message}>
          This feature is not implemented. Use any password to log in.
        </p>
        <Link href="/login" className={styles.backLink}>
          Back to login
        </Link>
      </div>
    </main>
  );
}
