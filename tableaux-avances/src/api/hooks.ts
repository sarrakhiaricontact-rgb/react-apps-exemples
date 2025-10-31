import { useQuery } from "@tanstack/react-query";
import type { FilterState } from "../types/types";
import { fetchPostsService, fetchUsersService } from "./api";

/**
 * Hook personnalisé pour gérer la pagination des utilisateurs
 */
export const useUsersPaginated = (filters: FilterState) => {
  return useQuery({
    queryKey: [
      "users",
      filters.currentPage,
      filters.pageSize,
      filters.sortBy,
      filters.sortOrder,
      filters.searchTerm,
    ],
    queryFn: () =>
      fetchUsersService({
        page: filters.currentPage,
        pageSize: filters.pageSize,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        search: filters.searchTerm,
      }),
  });
};

/**
 * Hook personnalisé pour gérer la pagination des posts
 */
export const usePostsPaginated = (filters: FilterState) => {
  return useQuery({
    queryKey: [
      "posts",
      filters.currentPage,
      filters.pageSize,
      filters.sortBy,
      filters.sortOrder,
      filters.searchTerm,
    ],
    queryFn: () =>
      fetchPostsService({
        page: filters.currentPage,
        pageSize: filters.pageSize,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        search: filters.searchTerm,
      }),
  });
};
