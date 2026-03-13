"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUserById, updateUserStatus } from "@/lib/api/users";
import { QUERY_KEYS } from "@/lib/query-keys";
import { BackArrowIcon, StarFilledIcon, StarEmptyIcon, UserAvatarIcon } from "@/components/icons";
import { UserDetailsSkeleton } from "./UserDetailsSkeleton";
import styles from "./page.module.scss";

const TABS = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
] as const;

interface UserDetailsProps {
  userId: string;
}

function InfoField({ label, value }: { label: string; value?: string }) {
  return (
    <div className={styles.infoField}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoValue}>{value || "—"}</span>
    </div>
  );
}

function TierStars({ tier = 1 }: { tier?: number }) {
  return (
    <span className={styles.tierStars}>
      {[1, 2, 3].map((n) =>
        n <= tier ? (
          <StarFilledIcon key={n} size={14} className={styles.starFilled} />
        ) : (
          <StarEmptyIcon key={n} size={14} className={styles.starEmpty} />
        )
      )}
    </span>
  );
}

export function UserDetails({ userId }: UserDetailsProps) {
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.users, "detail", userId],
    queryFn: ({ signal }) => getUserById(userId, { signal }),
  });

  const handleBlacklist = () => {
    const p = updateUserStatus(userId, "blacklisted");
    toast.promise(p, {
      loading: "Blacklisting user…",
      success: "User blacklisted.",
      error: "Failed to blacklist user.",
    });
    p.then((updated) => {
      queryClient.setQueryData([QUERY_KEYS.users, "detail", userId], updated);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.users] });
    });
  };

  const handleActivate = () => {
    const p = updateUserStatus(userId, "active");
    toast.promise(p, {
      loading: "Activating user…",
      success: "User activated.",
      error: "Failed to activate user.",
    });
    p.then((updated) => {
      queryClient.setQueryData([QUERY_KEYS.users, "detail", userId], updated);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.users] });
    });
  };

  if (isError) {
    return (
      <div className={styles.page}>
        <Link href="/users" className={styles.backLink}>
          <BackArrowIcon size={26} />
          Back to Users
        </Link>
        <div className={styles.errorBanner} role="alert">
          {error instanceof Error ? error.message : "Failed to load user"}
        </div>
      </div>
    );
  }

  if (isLoading || !user) {
    return (
      <div className={styles.page}>
        <UserDetailsSkeleton />
      </div>
    );
  }

  const shortId = `LSQFf${user.id.slice(0, 5).padEnd(5, "0")}`;

  return (
    <div className={styles.page}>
      <Link href="/users" className={styles.backLink}>
        <BackArrowIcon size={20} />
        Back to Users
      </Link>

      <div className={styles.headerRow}>
        <h1 className={styles.title}>User Details</h1>
        <div className={styles.headerActions}>
          {user.status !== "blacklisted" && (
            <button type="button" className={styles.blacklistBtn} onClick={handleBlacklist}>
              BLACKLIST USER
            </button>
          )}
          {user.status !== "active" && (
            <button type="button" className={styles.activateBtn} onClick={handleActivate}>
              ACTIVATE USER
            </button>
          )}
        </div>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.profileInfo}>
            <div className={styles.avatar}>
              <UserAvatarIcon size={40} />
            </div>
            <div className={styles.profileName}>
              <h2>{user.fullName}</h2>
              <p>{shortId}</p>
            </div>
          </div>
          <div className={styles.profileDivider} />
          <div className={styles.profileTier}>
            <span className={styles.tierLabel}>User&apos;s Tier</span>
            <TierStars tier={user.userTier} />
          </div>
          <div className={styles.profileDivider} />
          <div className={styles.profileBalance}>
            <h2>{user.accountBalance ?? "₦0.00"}</h2>
            <p>
              {user.accountNumber ?? ""}/{user.bankName ?? ""}
            </p>
          </div>
        </div>

        <nav className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "General Details" ? (
        <div className={styles.detailsCard}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.fieldGrid}>
              <InfoField label="FULL NAME" value={user.fullName} />
              <InfoField label="PHONE NUMBER" value={user.phoneNumber} />
              <InfoField label="EMAIL ADDRESS" value={user.email} />
              <InfoField label="BVN" value={user.bvn} />
              <InfoField label="GENDER" value={user.gender} />
              <InfoField label="MARITAL STATUS" value={user.maritalStatus} />
              <InfoField label="CHILDREN" value={user.children} />
              <InfoField label="TYPE OF RESIDENCE" value={user.typeOfResidence} />
            </div>
          </section>

          <hr className={styles.sectionDivider} />

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Education and Employment</h3>
            <div className={styles.fieldGrid}>
              <InfoField label="LEVEL OF EDUCATION" value={user.levelOfEducation} />
              <InfoField label="EMPLOYMENT STATUS" value={user.employmentStatus} />
              <InfoField label="SECTOR OF EMPLOYMENT" value={user.sectorOfEmployment} />
              <InfoField label="DURATION OF EMPLOYMENT" value={user.durationOfEmployment} />
              <InfoField label="OFFICE EMAIL" value={user.officeEmail} />
              <InfoField label="MONTHLY INCOME" value={user.monthlyIncome} />
              <InfoField label="LOAN REPAYMENT" value={user.loanRepayment} />
            </div>
          </section>

          <hr className={styles.sectionDivider} />

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Socials</h3>
            <div className={styles.fieldGrid}>
              <InfoField label="TWITTER" value={user.twitter} />
              <InfoField label="FACEBOOK" value={user.facebook} />
              <InfoField label="INSTAGRAM" value={user.instagram} />
            </div>
          </section>

          <hr className={styles.sectionDivider} />

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Guarantors</h3>
            {(user.guarantors ?? []).map((g, i) => (
              <div key={i} className={styles.guarantorCard}>
                {i > 0 && <hr className={styles.sectionDivider} />}
                <div className={styles.fieldGrid}>
                  <InfoField label="FULL NAME" value={g.fullName} />
                  <InfoField label="PHONE NUMBER" value={g.phoneNumber} />
                  <InfoField label="EMAIL ADDRESS" value={g.email} />
                  <InfoField label="RELATIONSHIP" value={g.relationship} />
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <div className={styles.detailsCard}>
          <p className={styles.tabPlaceholder}>{activeTab} content will be available here.</p>
        </div>
      )}
    </div>
  );
}
