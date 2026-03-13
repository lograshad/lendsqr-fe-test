import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LogoIcon } from "@/components/icons";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <header className={styles.header}>
        <Link href="/">
          <LogoIcon size={144.8} />
        </Link>
      </header>

      <div className={styles.illustrationContainer}>
        <h1 className={styles.errCode}>404</h1>
        <div className={styles.illustration}>
          <Image
            src="/piggy_bank_transparent.png"
            alt="404 Page Not Found"
            width={350}
            height={350}
            priority
          />
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Oops! Page not found</h1>
        <p className={styles.description}>
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <div className={styles.actions}>
          <Link href="/">
            <Button variant="primary" size="md">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
