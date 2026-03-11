"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { SearchIcon, BellIcon, HamburgerIcon, LogoIcon, ChevronDownIcon } from "@/components/icons";
import styles from "./Header.module.scss";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          className={styles.hamburger}
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <HamburgerIcon size={24} />
        </button>
        <Link href="/" className={styles.logo}>
          <LogoIcon size={25} />
          <span className={styles.logoText}>lendsqr</span>
        </Link>
      </div>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for anything"
          aria-label="Search for anything"
        />
        <button className={styles.searchButton} aria-label="Search">
          <SearchIcon size={14} />
        </button>
      </div>

      <div className={styles.right}>
        <Link href="/docs" className={styles.docsLink}>
          Docs
        </Link>
        <button className={styles.notificationBtn} aria-label="Notifications">
          <BellIcon size={26} />
        </button>
        <div className={styles.userMenu}>
          <Avatar size="md" fallback="A" alt="Adedeji" />
          <span className={styles.userName}>Adedeji</span>
          <ChevronDownIcon size={10} />
        </div>
      </div>
    </header>
  );
}
