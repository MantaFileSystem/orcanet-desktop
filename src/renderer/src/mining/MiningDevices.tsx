"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn/components/ui/table";

import { Switch } from "../shadcn/components/ui/switch";
import { devicesData } from "./deviceData";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="font-semibold text-stone-900"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const columns = [
  {
    accessorKey: "id",
    header: "Devices",
    cell: ({ row }: { row: any }) => {
      return (
        <div>
          <div className="font-md">{row.original.model}</div>
          {row.original.hashpower && (
            <div className="text-gray-500">
              Hash Power: {row.original.hashpower}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: any }) => {
      const status = row.getValue("status") as string;
      const color =
        status === "disabled"
          ? "text-gray-500"
          : status === "Mining"
            ? "text-green-500"
            : "text-red-500";
      return (
        <div>
          <div className={`font-medium ${color}`}>{status}</div>
          <div className="text-gray-500">{row.original.power}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Profitability</div>,
    cell: ({ row }: { row: any }) => {
      return (
        <div>
          <div className={`text-right font-medium`}>
            {row.getValue("amount")}/day
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "switch",
    header: () => <div className="text-right">Off / On</div>,
    cell: () => {
      return (
        <div>
          <div className={`text-right font-medium`}>
            <Switch
              //   checked={row.original.switch}
              onCheckedChange={() => {
                console.log("Switched");
              }}
            />
          </div>
        </div>
      );
    },
  },
];

export default function MiningDevices() {
  return (
    <>
      <DataTable columns={columns} data={devicesData} />
    </>
  );
}
