"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getIcon,
  BriefcaseDropdownIcon,
  DashboardIcon,
  LogoutIcon,
  ChevronDownIcon,
  CloseIcon,
} from "@/components/icons";
import { useAuth } from "@/context/AuthContext";
import { sidebarGroups } from "./sidebarData";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />}

      <aside
        id="main-sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
        aria-label="Primary"
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close navigation">
          <CloseIcon size={24} />
        </button>

        <nav className={styles.nav} aria-label="Main navigation">
          <div className={styles.orgSwitcher}>
            <BriefcaseDropdownIcon size={16} />
            <span>Switch Organization</span>
            <ChevronDownIcon size={10} />
          </div>

          <Link
            href="/"
            className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <DashboardIcon size={16} />
            <span>Dashboard</span>
          </Link>

          {sidebarGroups.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              {group.items.map((item) => {
                const IconComponent = getIcon(item.icon);
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {IconComponent && <IconComponent size={16} />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}

          <div className={styles.divider} />

          <button className={styles.navItem} onClick={logout}>
            <LogoutIcon size={16} />
            <span>Logout</span>
          </button>

          <span className={styles.version}>v1.2.0</span>
        </nav>
      </aside>
    </>
  );
}
