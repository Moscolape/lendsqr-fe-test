import { useState, useEffect, useCallback } from "react";
import mockapi from "../services/mockApi";
import {
  type User,
  type PaginationResult,
  type FilterOptions,
} from "../../globalTypes";

/**
 * Return type for the useUsers hook
 */
interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
  refetch: () => Promise<void>; // Function to reload users on demand
}

/**
 * Custom hook for fetching paginated user data with optional filters.
 *
 * @param page - Current page number (default 1)
 * @param limit - Items per page (default 20)
 * @param filters - Optional filter object for api query
 * @returns users, loading state, error, pagination, and refetch function
 */
export function useUsers(
  page: number = 1,
  limit: number = 20,
  filters: FilterOptions = {}
): UseUsersReturn {
  const [state, setState] = useState<UseUsersReturn>({
    users: [],
    loading: true,
    error: null,
    pagination: {
      page,
      limit,
      totalCount: 0,
      totalPages: 0,
    },
    refetch: async () => {},
  });

  // Function to load users from API
  const loadUsers = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result: PaginationResult = await mockapi.getUsers(
        page,
        limit,
        filters
      );

      setState({
        users: result.users,
        loading: false,
        error: null,
        pagination: {
          page: result.currentPage,
          limit,
          totalCount: result.totalCount,
          totalPages: result.totalPages,
        },
        refetch: loadUsers, // refetch calls the same function
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to load users",
        refetch: loadUsers,
      }));
    }
  }, [page, limit, filters]);

  // Automatically load users on mount or whenever dependencies change
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return state;
};
