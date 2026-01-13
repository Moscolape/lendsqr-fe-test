import { useState, useEffect, useCallback } from "react";
import DashboardWrapper from "../../components/dashboard/wrapper/wrapper";
import Pagination from "../../components/users/pagination/pagination";
import UserStats from "../../components/users/ui/user-stats";
import UsersTable from "../../components/users/table/users-table";

import { useSearchParams } from "react-router-dom";

import mockapi from "../../services/mockApi";
import type { ApiFilterOptions, ClientFilterValues, User } from "../../../globalTypes";
import "./users.scss";
import { usePageTitle } from "../../hooks/usePageTitle";

/**
 * Maps client-side filter values to API-compatible filters
 */
const mapClientToApiFilters = (clientFilters: ClientFilterValues): ApiFilterOptions => {
  return {
    organization: clientFilters.organization || undefined,
    username: clientFilters.username || undefined,
    email: clientFilters.email || undefined,
    phoneNumber: clientFilters.phoneNumber || undefined,
    dateJoined: clientFilters.dateJoined || undefined,
    status: clientFilters.status || undefined,
  };
};

/**
 * Users Page Component
 * - Fetches user data from API
 * - Applies filters, pagination, and search
 * - Renders user stats, table, pagination, loading, and empty states
 */
export default function Users() {
  usePageTitle("Users | Lendsqr");

  // Pagination state
  const [page, setPage] = useState(1);

  const PAGE_SIZE_KEY = "users_page_size";
  const getInitialPageSize = (): number => {
    const stored = localStorage.getItem(PAGE_SIZE_KEY);
    const parsed = Number(stored);
    return parsed && [10, 20, 50, 100].includes(parsed) ? parsed : 10;
  };
  const [pageSize, setPageSize] = useState<number>(getInitialPageSize);

  // User data and status
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [activeApiFilters, setActiveApiFilters] = useState<ApiFilterOptions>({});
  const [tempDropdownFilters, setTempDropdownFilters] = useState<ClientFilterValues>({
    organization: "",
    username: "",
    email: "",
    dateJoined: "",
    phoneNumber: "",
    status: "",
  });
  const [activeDropdownFilters, setActiveDropdownFilters] = useState<ClientFilterValues>({
    organization: "",
    username: "",
    email: "",
    dateJoined: "",
    phoneNumber: "",
    status: "",
  });

  // Search query from URL
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Update filters based on URL search query
  useEffect(() => {
    if (searchQuery) {
      setActiveApiFilters((prev) => ({ ...prev, search: searchQuery }));
      setPage(1);
    } else {
      setActiveApiFilters((prev) => {
        const next = { ...prev };
        delete next.search;
        return next;
      });
    }
  }, [searchQuery]);

  /**
   * Load users from API based on page, pageSize, and active filters
   */
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const combinedFilters = {
        ...mapClientToApiFilters(activeDropdownFilters),
        ...activeApiFilters,
      };

      const result = await mockapi.getUsers(page, pageSize, combinedFilters);

      setUsers(result.users);
      setTotalUsers(result.totalCount);
    } catch (err) {
      console.error("Failed to load users:", err);
      setError("Failed to load users. Please try again.");
      setUsers([]);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, activeDropdownFilters, activeApiFilters]);

  // Load users on component mount and whenever filters/pagination change
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Persist page size in localStorage
  useEffect(() => {
    localStorage.setItem(PAGE_SIZE_KEY, String(pageSize));
  }, [pageSize]);

  // Handlers for temporary filter changes in dropdown
  const handleTempFilterChange = (field: keyof ClientFilterValues, value: string) => {
    setTempDropdownFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Apply dropdown filters
  const handleApplyDropdownFilters = () => {
    setActiveDropdownFilters(tempDropdownFilters);
    setPage(1);
  };

  // Reset dropdown filters
  const handleResetDropdownFilters = () => {
    setTempDropdownFilters({
      organization: "",
      username: "",
      email: "",
      dateJoined: "",
      phoneNumber: "",
      status: "",
    });
    setActiveDropdownFilters({
      organization: "",
      username: "",
      email: "",
      dateJoined: "",
      phoneNumber: "",
      status: "",
    });
    setActiveApiFilters({});
    setPage(1);
  };

  // Reset all filters including API and dropdown filters
  const handleResetAllFilters = () => {
    handleResetDropdownFilters();
  };

  // Transform API user data into table-friendly format
  const tableData = users.map((user) => ({
    id: user.id,
    organization: user.organization,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateJoined: user.dateJoined,
    status: user.status as "active" | "inactive" | "pending" | "blacklisted",
  }));

  return (
    <DashboardWrapper>
      <div className="users-page">
        {/* Page header */}
        <div className="users-header">
          <h1>Users</h1>
        </div>

        {/* User statistics summary */}
        <UserStats />

        {/* Display error if present */}
        {error && (
          <div className="error-alert">
            {error}
            <button onClick={loadUsers}>Retry</button>
          </div>
        )}

        {/* Show loading skeleton while fetching */}
        {loading && users.length === 0 ? (
          <div className="loading-skeleton">
            <div className="table-skeleton">
              {[...Array(pageSize)].map((_, i) => (
                <div key={i} className="row-skeleton">
                  <div className="cell-skeleton"></div>
                  <div className="cell-skeleton"></div>
                  <div className="cell-skeleton"></div>
                  <div className="cell-skeleton"></div>
                  <div className="cell-skeleton"></div>
                  <div className="cell-skeleton"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Users Table with filters */}
            <UsersTable
              data={tableData}
              onTempFilterChange={handleTempFilterChange}
              onApplyFilters={handleApplyDropdownFilters}
              onResetFilters={handleResetDropdownFilters}
              tempFilters={tempDropdownFilters}
              activeFilters={activeDropdownFilters}
            />

            {/* Pagination if users exist */}
            {users.length > 0 && (
              <Pagination
                totalItems={totalUsers}
                pageSize={pageSize}
                currentPage={page}
                totalPages={Math.ceil(totalUsers / pageSize)}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
            )}
          </>
        )}

        {/* Empty state when no users */}
        {!loading && users.length === 0 && !error && (
          <div className="empty-state">
            <p>No users found.</p>
            <button onClick={handleResetAllFilters}>Clear all filters</button>
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
}
