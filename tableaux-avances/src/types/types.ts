// Types
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { city: string };
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface FilterState {
  searchTerm: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  currentPage: number;
  pageSize: number;
  selectedTab: "users" | "posts";
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface TableColumns {
  key: string;
  label: string;
}
interface FetchParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}

export type {
  User,
  Post,
  FilterState,
  TableColumns,
  PaginatedResponse,
  FetchParams,
};
