"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { useState } from "react";
import { FilterIcon } from "@/components/icons";
import styles from "./Table.module.scss";

interface TableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  pageSize?: number;
  onFilter?: (columnId: string) => void;
  className?: string;
  hidePagination?: boolean;
}

export function Table<T>({
  columns,
  data,
  pageSize = 10,
  onFilter,
  className,
  hidePagination,
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const classNames = [styles.tableWrapper, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classNames}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const isLastColumn = index === headerGroup.headers.length - 1;
                const showFilter = onFilter && !isLastColumn;
                return (
                  <th
                    key={header.id}
                    data-column-id={header.column.id}
                    scope="col"
                    style={
                      header.column.getSize() !== 150
                        ? { width: header.column.getSize() }
                        : undefined
                    }
                  >
                    <span className={styles.thContent}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {showFilter && (
                        <button
                          className={styles.filterBtn}
                          onClick={() => onFilter(header.column.id)}
                          aria-label={`Filter by ${header.column.id}`}
                        >
                          <FilterIcon size={16} />
                        </button>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyRow}>
                No data available
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} data-cy="users-row">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} data-column-id={cell.column.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {data.length > 0 && !hidePagination && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            Showing{" "}
            <strong>
              {pagination.pageIndex * pagination.pageSize + 1}-
              {Math.min((pagination.pageIndex + 1) * pagination.pageSize, data.length)}
            </strong>{" "}
            out of {data.length}
          </span>
          <div className={styles.pageControls}>
            <button
              className={styles.pageBtn}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              &lt;
            </button>
            {Array.from({ length: Math.min(table.getPageCount(), 5) }, (_, i) => {
              const pageCount = table.getPageCount();
              let pageNum: number;
              if (pageCount <= 5) {
                pageNum = i;
              } else if (pagination.pageIndex < 3) {
                pageNum = i;
              } else if (pagination.pageIndex > pageCount - 4) {
                pageNum = pageCount - 5 + i;
              } else {
                pageNum = pagination.pageIndex - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`${styles.pageNum} ${pagination.pageIndex === pageNum ? styles.activePageNum : ""}`}
                  onClick={() => table.setPageIndex(pageNum)}
                >
                  {pageNum + 1}
                </button>
              );
            })}
            <button
              className={styles.pageBtn}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
