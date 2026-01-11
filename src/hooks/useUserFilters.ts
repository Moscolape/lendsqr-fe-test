import { useState, useMemo } from "react";
import type { UserRow } from "../components/users/table/users-table";

export type Filters = {
  organization: string;
  username: string;
  email: string;
  phone: string;
  date: string;
  status: string;
};

const initialFilters: Filters = {
  organization: "",
  username: "",
  email: "",
  phone: "",
  date: "",
  status: "",
};

export const useUserFilters = (data: UserRow[]) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const filteredData = useMemo(() => {
    return data.filter((user) => {
      return (
        (!filters.organization ||
          user.organization
            .toLowerCase()
            .includes(filters.organization.toLowerCase())) &&
        (!filters.username ||
          user.username
            .toLowerCase()
            .includes(filters.username.toLowerCase())) &&
        (!filters.email ||
          user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.phone || user.phoneNumber.includes(filters.phone)) &&
        (!filters.date || user.dateJoined === filters.date) &&
        (!filters.status || user.status === filters.status)
      );
    });
  }, [data, filters]);

  const resetFilters = () => setFilters(initialFilters);

  return {
    filters,
    setFilters,
    filteredData,
    resetFilters,
  };
};
