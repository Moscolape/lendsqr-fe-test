import { useState, useEffect, useCallback } from "react";
import mockapi from "../services/mockApi";
import {
  type User,
  type PaginationResult,
  type FilterOptions,
} from "../../globalTypes";

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
  refetch: () => Promise<void>;
}

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
        refetch: loadUsers,
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

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return state;
}
