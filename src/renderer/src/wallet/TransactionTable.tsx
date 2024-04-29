"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/components/ui/dropdown-menu";
import { Button } from "../shadcn/components/ui/button";

import { ChevronsLeft, ChevronsRight, Grip } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { WalletData } from "./WalletData";
import { useState } from "react";
import { AiFillFile } from "react-icons/ai";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  path?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  path,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  // const { page } = useParams();
  const page = path;

  return (
    <div className="rounded-md bg-white">
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
      {page === "transactions" && (
        <div className="space-x-2 text-right">
          <Button
            size="sm"
            className="bg-black text-white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size="sm"
            className="bg-black text-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export const columns = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: any }) => {
      const status = row.getValue("status") as string;
      const color =
        status === "Pending"
          ? "text-yellow-500"
          : status === "Processing"
            ? "text-blue-500"
            : status === "Success"
              ? "text-green-500"
              : "text-red-500";
      return (
        <div>
          <div className={`font-medium ${color}`}>{status}</div>
          <div className="text-gray-500">2021-10-10</div>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }: { row: any }) => {
      return (
        <div>
          <div className="font-md text-black">{row.getValue("id")}</div>
          {row.original.reason && (
            <div className="text-gray-500">Reason: {row.original.reason}</div>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }: { row: any }) => {
      const amount = parseFloat(row.getValue("amount"));
      const color = amount > 0 ? "text-green-500" : "text-red-500";
      return (
        <div>
          <div className={`text-right font-medium ${color}`}>{amount}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }: { row: any }) => {
      const payment = row.original;
      const [IsTransactionDetailModalOpen, setIsTransactionDetailModalOpen] =
        useState(false);
      const dateObj = row.original.date;
      const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate() + 1}/${dateObj.getFullYear()}`;

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8  p-0 flex">
                <Grip className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy Transaction ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTransactionDetailModalOpen(true);
                }}
              >
                View Transaction Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {IsTransactionDetailModalOpen && (
            <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4">
                <h2 className="text-2xl font-bold text-black mb-6 text-center">
                  Transaction Details
                </h2>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-black">From:</p>
                  <p className="text-black">{row.original.From}</p>
                </div>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-black">To:</p>
                  <p className="text-black">{row.original.To}</p>
                </div>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-black">
                    Transaction ID:
                  </p>
                  <p className="text-black">{row.original.id}</p>
                </div>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-black">Amount:</p>
                  <p className="text-black">{row.original.amount} ORC</p>
                </div>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-black">Date:</p>
                  <p className="text-black">{formattedDate}</p>
                </div>
                <div className="flex items-center justify-center space-x-4 bg-gray-200 p-4 rounded-b-2xl">
                  <button
                    className="flex-1 justify-center py-3 px-6 border border-transparent shadow text-lg font-medium rounded-md text-black bg-red-300 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                    onClick={() => {
                      setIsTransactionDetailModalOpen(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
];

export default function TransactionTable({ path }: { path: string }) {
  const page = path;
  const top5Data = WalletData.slice(0, 5);

  return (
    <div className={`rounded-md p-5 ${page !== "transactions" && "border"}`}>
      <div className="flex justify-between font-bold mb-2">
        <h3 className="text-stone-900 text-xl">Transactions</h3>
        {page !== "transactions" && (
          <Link to="/wallet/transactions">
            <div className="text-indigo-500 flex gap-2 text-sm items-center hover:cursor-pointer">
              <h3>View All</h3>
              <ChevronsRight />
            </div>
          </Link>
        )}
        {page === "transactions" && (
          <Link to="/wallet">
            <div className="text-indigo-500 flex gap-2 text-sm items-center hover:cursor-pointer">
              <h3>Return</h3>
              <ChevronsLeft />
            </div>
          </Link>
        )}
      </div>
      <DataTable
        columns={columns}
        data={page !== "transactions" ? top5Data : WalletData}
        path={path}
      />
    </div>
  );
}
