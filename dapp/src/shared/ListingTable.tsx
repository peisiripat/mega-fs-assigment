"use client";
import {
  LinearProgress,
  Box,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from "@mui/material";
import React from "react";

export interface ListingTableProps<T> {
  loading?: boolean;
  table: DataTable<T>;
}

type DataTable<T> = {
  data?: T[];
  columns?: TableDataColumn<T>[];
};

type TableDataColumn<T> = {
  Header: string;
  attr?: keyof T;
  Cell?: (row: T) => React.ReactNode;
};

const ListingTable = <DataType,>({
  loading,
  table = { columns: [], data: [] },
  ...rest
}: ListingTableProps<DataType>) => {
  const data = table?.data ?? [];
  const columns = table?.columns ?? [];
  const headers = (
    <TableRow>
      {columns.map((column, idx) => (
        <TableCell key={`column-${column.Header}`}>
          <>{column.Header}</>
        </TableCell>
      ))}
    </TableRow>
  );
  const rows = (table?.data ?? []).map((row, idx) => (
    <TableRow key={`row-${idx}`}>
      {columns.map((column, idx) => (
        <TableCell key={`column-${idx}`}>
          <>{column?.attr ? row[column.attr] : column?.Cell?.(row)}</>
        </TableCell>
      ))}
    </TableRow>
  ));
  return (
    <>
      {loading && <LinearProgress />}
      {
        <Box>
          <Table {...rest}>
            <TableHead>{headers}</TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </Box>
      }
    </>
  );
};
export default ListingTable;
