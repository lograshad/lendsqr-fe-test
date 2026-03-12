"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getUsers } from "@/lib/api/users";
import type { AppUser } from "@/types/user";
import { Table } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { ColumnDef } from "@tanstack/react-table";
import styles from "./page.module.scss";

const SORT_OPTIONS = [
  { value: "createdAt", label: "Date joined" },
  { value: "fullName", label: "Username" },
  { value: "email", label: "Email" },
  { value: "organization", label: "Organization" },
  { value: "status", label: "Status" },
] as const;

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
  return (
    <span className={`${styles.statusBadge} ${statusClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState<string>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", page, limit, search, sort, order],
    queryFn: () => getUsers({ page, limit, search: search || undefined, sort, order }),
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

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
        cell: ({ row }) => (
          <Link href={`/users/${row.original.id}`} className={styles.userLink}>
            {row.original.fullName}
          </Link>
        ),
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
        cell: ({ row }) => (
          <Link href={`/users/${row.original.id}`} className={styles.actionLink}>
            View details
          </Link>
        ),
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
    <div className={styles.page}>
      <h1 className={styles.title}>Users</h1>
      <p className={styles.subtitle}>
        Manage and view all users. Search, sort, and paginate through the list.
      </p>

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

      {isLoading && (
        <div className={styles.stateMessage}>
          <p>Loading users…</p>
          {/* TODO: use loading spinner instead */}
        </div>
      )}

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
          <Table<AppUser>
            columns={columns}
            data={users}
            pageSize={users.length}
            hidePagination
            className={styles.table}
          />
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
