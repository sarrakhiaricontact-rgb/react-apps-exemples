/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pagination } from "./Pagination";
import { SortButton } from "./SortButton";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchTerm: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  currentPage: number;
  pageSize: number;
}

export const DataTable = <T extends object>({
  data,
  columns,
  searchTerm,
  sortBy,
  sortOrder,
  currentPage,
  pageSize,
}: DataTableProps<T>) => {
  // Get all string values of an object recursively for search
  const getAllValues = <T extends object>(obj: T): string[] => {
    let values: string[] = [];
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      const val = obj[key];
      if (val && typeof val === "object") {
        values = values.concat(getAllValues(val));
      } else if (val !== undefined && val !== null) {
        values.push(String(val).toLowerCase());
      }
    }
    return values;
  };

  const getValue = <T extends object>(obj: T, key: string): unknown => {
    if (key.includes(".")) {
      return key.split(".").reduce((acc, part) => {
        if (acc && typeof acc === "object" && part in acc) {
          return (acc as Record<string, unknown>)[part];
        }
        return undefined;
      }, obj as unknown);
    }
    return (obj as Record<string, unknown>)[key];
  };

  const processedData = useMemo(() => {
    if (!data) return { items: [], total: 0 };

    // Filter
    let filtered = data;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        getAllValues(item).some((val) => val.includes(term))
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      const aVal = getValue(a, sortBy);
      const bVal = getValue(b, sortBy);

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = aVal !== undefined ? String(aVal) : "";
      const bStr = bVal !== undefined ? String(bVal) : "";

      return sortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    // Pagination
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = sorted.slice(startIndex, startIndex + pageSize);

    return { items: paginated, total: filtered.length };
  }, [data, searchTerm, sortBy, sortOrder, currentPage, pageSize]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>
                {col.render ? (
                  col.label
                ) : (
                  <SortButton column={col.key} label={col.label} />
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {processedData.items.map((item, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render
                    ? col.render(item)
                    : String(getValue(item, col.key))}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination totalItems={processedData.total} />
    </div>
  );
};
