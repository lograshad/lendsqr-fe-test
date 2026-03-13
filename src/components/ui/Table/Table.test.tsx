import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Table } from "./Table";

interface RowData {
  id: number;
  name: string;
}

const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
];

describe("Table", () => {
  it("paginates data when there are more rows than pageSize", () => {
    const data: RowData[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Row ${i + 1}`,
    }));

    render(<Table columns={columns} data={data} pageSize={5} />);

    expect(screen.getByText("Row 1")).toBeInTheDocument();
    expect(screen.getByText("Row 5")).toBeInTheDocument();
    expect(screen.queryByText("Row 6")).not.toBeInTheDocument();

    const nextBtn = screen.getByRole("button", { name: /next page/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText("Row 6")).toBeInTheDocument();
    expect(screen.getByText("Row 10")).toBeInTheDocument();
  });
});
