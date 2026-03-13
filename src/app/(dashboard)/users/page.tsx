"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getUsers, getOrganizations, updateUserStatus, getUserById } from "@/lib/api/users";
import { QUERY_KEYS } from "@/lib/query-keys";
import type { AppUser } from "@/types/user";
import { Table } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  MoreIcon,
  EyeIcon,
  BlacklistIcon,
  ActivateIcon,
  UserFriendsOutlineIcon,
  UsersOutlineIcon,
  LoanRequestOutlineIcon,
  CoinsOutlineIcon,
} from "@/components/icons";
import type { ColumnDef } from "@tanstack/react-table";
import { UsersTableSkeleton } from "./UsersTableSkeleton";
import { StatCardsSkeleton } from "./StatCardsSkeleton";
import styles from "./page.module.scss";

const SORT_OPTIONS = [
  { value: "createdAt", label: "Date joined" },
  { value: "fullName", label: "Username" },
  { value: "email", label: "Email" },
  { value: "organization", label: "Organization" },
  { value: "status", label: "Status" },
] as const;

export interface UsersTableFilters {
  organization: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

const EMPTY_FILTERS: UsersTableFilters = {
  organization: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  status: "",
  dateFrom: "",
  dateTo: "",
};

const FILTER_LABELS: Record<keyof UsersTableFilters, string> = {
  organization: "Organization",
  fullName: "Username",
  email: "Email",
  phoneNumber: "Phone number",
  status: "Status",
  dateFrom: "Date from",
  dateTo: "Date to",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: AppUser["status"] }) {
  const statusClass =
    status === "active"
      ? styles.statusActive
      : status === "inactive"
        ? styles.statusInactive
        : status === "pending"
          ? styles.statusPending
          : styles.statusBlacklisted;
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`${styles.statusBadge} ${statusClass}`} aria-label={`User status: ${label}`}>
      {label}
    </span>
  );
}

function ActionMenu({ userId, status }: { userId: string; status: AppUser["status"] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrefetchDetails = () => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.users, "detail", userId],
      queryFn: ({ signal }) => getUserById(userId, { signal }),
    });
  };

  const handleBlacklist = () => {
    setOpen(false);
    const p = updateUserStatus(userId, "blacklisted");
    toast.promise(p, {
      loading: "Blacklisting user...",
      success: "User blacklisted.",
      error: "Failed to blacklist user.",
    });
    p.then(() => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.users] }));
  };

  const handleActivate = () => {
    setOpen(false);
    const p = updateUserStatus(userId, "active");
    toast.promise(p, {
      loading: "Activating user...",
      success: "User activated.",
      error: "Failed to activate user.",
    });
    p.then(() => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.users] }));
  };

  return (
    <div
      className={styles.actionMenuWrapper}
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={styles.actionMenuBtn}
        onClick={() => setOpen((o) => !o)}
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreIcon size={18} />
      </button>
      {open && (
        <div className={styles.actionPopover} role="menu">
          <button
            type="button"
            onClick={() => router.push(`/users/${userId}`)}
            onMouseEnter={handlePrefetchDetails}
            onFocus={handlePrefetchDetails}
            role="menuitem"
          >
            <EyeIcon />
            View Details
          </button>
          {status !== "blacklisted" && (
            <button type="button" onClick={handleBlacklist} role="menuitem">
              <BlacklistIcon />
              Blacklist User
            </button>
          )}
          {status !== "active" && (
            <button type="button" onClick={handleActivate} role="menuitem">
              <ActivateIcon />
              Activate User
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ColumnFilterDropdown({
  isOpen,
  onClose,
  filters,
  onFilterSubmit,
  organizationOptions,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: UsersTableFilters;
  onFilterSubmit: (filters: UsersTableFilters) => void;
  organizationOptions: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<UsersTableFilters>(filters);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onFilterSubmit(draft);
    onClose();
  };

  const handleReset = () => {
    onFilterSubmit(EMPTY_FILTERS);
    onClose();
  };

  return (
    <div className={styles.filterDropdown} ref={ref}>
      <div className={styles.filterField}>
        <label>Organization</label>
        <select
          value={draft.organization}
          onChange={(e) => setDraft((prev) => ({ ...prev, organization: e.target.value }))}
        >
          <option value="">Select</option>
          {organizationOptions.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filterField}>
        <label>Username</label>
        <input
          type="text"
          placeholder="User"
          value={draft.fullName}
          onChange={(e) => setDraft((prev) => ({ ...prev, fullName: e.target.value }))}
        />
      </div>
      <div className={styles.filterField}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={draft.email}
          onChange={(e) => setDraft((prev) => ({ ...prev, email: e.target.value }))}
        />
      </div>
      <div className={styles.filterField}>
        <label>Date joined (from)</label>
        <input
          type="date"
          value={draft.dateFrom}
          onChange={(e) => setDraft((prev) => ({ ...prev, dateFrom: e.target.value }))}
        />
      </div>
      <div className={styles.filterField}>
        <label>Date joined (to)</label>
        <input
          type="date"
          value={draft.dateTo}
          onChange={(e) => setDraft((prev) => ({ ...prev, dateTo: e.target.value }))}
        />
      </div>
      <div className={styles.filterField}>
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          value={draft.phoneNumber}
          onChange={(e) => setDraft((prev) => ({ ...prev, phoneNumber: e.target.value }))}
        />
      </div>
      <div className={styles.filterField}>
        <label>Status</label>
        <select
          value={draft.status}
          onChange={(e) => setDraft((prev) => ({ ...prev, status: e.target.value }))}
        >
          <option value="">Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="blacklisted">Blacklisted</option>
        </select>
      </div>
      <div className={styles.filterActions}>
        <button type="button" className={styles.filterResetBtn} onClick={handleReset}>
          Reset
        </button>
        <button type="button" className={styles.filterSubmitBtn} onClick={handleSubmit}>
          Filter
        </button>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState<string>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [openFilterCol, setOpenFilterCol] = useState<string | null>(null);
  const [filters, setFilters] = useState<UsersTableFilters>(EMPTY_FILTERS);

  const { data: organizations = [] } = useQuery({
    queryKey: [QUERY_KEYS.organizations],
    queryFn: getOrganizations,
  });

  const { data: activeUsersData } = useQuery({
    queryKey: [QUERY_KEYS.users, "active-count"],
    queryFn: () => getUsers({ page: 1, limit: 1, status: "active" }),
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.users, page, limit, search, sort, order, filters],
    queryFn: () =>
      getUsers({
        page,
        limit,
        search: search || undefined,
        sort,
        order,
        organization: filters.organization || undefined,
        fullName: filters.fullName || undefined,
        email: filters.email || undefined,
        phoneNumber: filters.phoneNumber || undefined,
        status: filters.status || undefined,
        dateFrom: filters.dateFrom || undefined,
        dateTo: filters.dateTo || undefined,
      }),
  });

  const handleFilterSubmit = (newFilters: UsersTableFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleSearchReset = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const handleFilterToggle = (columnId: string) => {
    setOpenFilterCol((prev) => (prev === columnId ? null : columnId));
  };

  const clearFilter = (key: keyof UsersTableFilters) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
    setPage(1);
  };

  const activeFilters = (Object.entries(filters) as [keyof UsersTableFilters, string][]).filter(
    ([, v]) => (v ?? "").trim() !== ""
  );

  const columns = useMemo<ColumnDef<AppUser, unknown>[]>(
    () => [
      {
        accessorKey: "organization",
        header: "Organization",
        cell: ({ getValue }) => getValue() ?? "—",
      },
      {
        accessorKey: "fullName",
        header: "Username",
        cell: ({ getValue }) => getValue() as string,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => getValue() as string,
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone number",
        cell: ({ getValue }) => getValue() as string,
      },
      {
        accessorKey: "createdAt",
        header: "Date joined",
        cell: ({ getValue }) => formatDate(getValue() as string),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => <StatusBadge status={getValue() as AppUser["status"]} />,
      },
      {
        id: "action",
        header: "",
        size: 40,
        cell: ({ row }) => <ActionMenu userId={row.original.id} status={row.original.status} />,
      },
    ],
    []
  );

  const total = data?.total ?? 0;
  const users = data?.data ?? [];
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className={styles.page} aria-labelledby="users-page-title">
      <h1 id="users-page-title" className={styles.title}>
        Users
      </h1>
      {isLoading || !activeUsersData ? (
        <StatCardsSkeleton />
      ) : (
        <div className={styles.statCards}>
          <div className={styles.statCard}>
            <span className={`${styles.statIcon} ${styles.statIconPink}`}>
              <UserFriendsOutlineIcon size={22} />
            </span>
            <span className={styles.statLabel}>USERS</span>
            <span className={styles.statValue}>{total.toLocaleString()}</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statIcon} ${styles.statIconPurple}`}>
              <UsersOutlineIcon size={22} />
            </span>
            <span className={styles.statLabel}>ACTIVE USERS</span>
            <span className={styles.statValue}>
              {(activeUsersData?.total ?? 0).toLocaleString()}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statIcon} ${styles.statIconOrange}`}>
              <LoanRequestOutlineIcon size={22} />
            </span>
            <span className={styles.statLabel}>USERS WITH LOANS</span>
            <span className={styles.statValue}>12,453</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statIcon} ${styles.statIconRed}`}>
              <CoinsOutlineIcon size={22} />
            </span>
            <span className={styles.statLabel}>USERS WITH SAVINGS</span>
            <span className={styles.statValue}>102,453</span>
          </div>
        </div>
      )}

      <div className={styles.toolbar}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <Input
            placeholder="Search by name, email, phone, or organization"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
          />
          <Button type="submit" variant="secondary" size="md">
            Search
          </Button>
          <Button type="button" variant="outline" size="md" onClick={handleSearchReset}>
            Reset
          </Button>
        </form>
        <div className={styles.sortRow}>
          <label htmlFor="sort" className={styles.sortLabel}>
            Sort by
          </label>
          <select
            id="sort"
            className={styles.sortSelect}
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            className={styles.orderSelect}
            value={order}
            onChange={(e) => {
              setOrder(e.target.value as "asc" | "desc");
              setPage(1);
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className={styles.activeFilters}>
          {activeFilters.map(([key, value]) => (
            <span key={key} className={styles.filterChip}>
              <span className={styles.filterChipText}>
                {FILTER_LABELS[key]}: {value}
              </span>
              <button
                type="button"
                className={styles.filterChipCancel}
                onClick={() => clearFilter(key)}
                aria-label={`Remove ${FILTER_LABELS[key]} filter`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {isLoading && <UsersTableSkeleton />}

      {isError && (
        <div className={styles.errorState}>
          <p>{error instanceof Error ? error.message : "Failed to load users"}</p>
          <Button variant="outline" size="md" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && users.length === 0 && (
        <div className={styles.stateMessage}>
          <p>{search ? "No users match your search." : "No users yet."}</p>
        </div>
      )}

      {!isLoading && !isError && users.length > 0 && (
        <>
          <div className={styles.tableContainer}>
            <Table<AppUser>
              columns={columns}
              data={users}
              pageSize={users.length}
              hidePagination
              onFilter={handleFilterToggle}
              className={styles.table}
              data-cy="users-table"
            />
            <ColumnFilterDropdown
              key={openFilterCol !== null ? "open" : "closed"}
              isOpen={openFilterCol !== null}
              onClose={() => setOpenFilterCol(null)}
              filters={filters}
              onFilterSubmit={handleFilterSubmit}
              organizationOptions={organizations}
            />
          </div>
          <div className={styles.pagination}>
            <span className={styles.pageInfo}>
              Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{total}</strong>
            </span>
            <div className={styles.pageControls}>
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                aria-label="Previous page"
              >
                &lt;
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    type="button"
                    className={`${styles.pageNum} ${page === pageNum ? styles.activePageNum : ""}`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                aria-label="Next page"
              >
                &gt;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// TODO: review my plan and crosscheck that everything i plnned to implemnted has been done and completed
