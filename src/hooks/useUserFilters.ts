import { useState, useMemo } from "react";
import type { UserRow } from "../components/users/table/users-table";

/**
 * Defines the structure of user filters
 */
export type Filters = {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
};

// Default initial filter state (all empty)
const initialFilters: Filters = {
  organization: "",
  username: "",
  email: "",
  phoneNumber: "",
  dateJoined: "",
  status: "",
};

/**
 * Custom hook to manage filtering logic for a list of users.
 *
 * @param data - The array of user objects to filter
 * @returns filters, setter, filtered data, and reset function
 */
export const useUserFilters = (data: UserRow[]) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  // Compute filtered data whenever the raw data or filters change
  const filteredData = useMemo(() => {
    return data.filter((user) => {
      return (
        (!filters.organization ||
          user.organization
            .toLowerCase()
            .includes(filters.organization.toLowerCase())) &&
        (!filters.username ||
          user.username.toLowerCase().includes(filters.username.toLowerCase())) &&
        (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.phoneNumber || user.phoneNumber.includes(filters.phoneNumber)) &&
        (!filters.dateJoined || user.dateJoined === filters.dateJoined) &&
        (!filters.status || user.status === filters.status)
      );
    });
  }, [data, filters]);

  // Reset all filters to initial empty state
  const resetFilters = () => setFilters(initialFilters);

  return {
    filters,
    setFilters,
    filteredData,
    resetFilters,
  };
};
