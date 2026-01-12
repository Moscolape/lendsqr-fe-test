import { useState, useEffect, useCallback } from "react";
import DashboardWrapper from "../../components/dashboard/wrapper/wrapper";
import Pagination from "../../components/users/pagination/pagination";
import UserStats from "../../components/users/ui/user-stats";
import UsersTable from "../../components/users/table/users-table";

import { useSearchParams } from "react-router-dom";

import mockapi from "../../services/mockApi";
import type {
  ApiFilterOptions,
  ClientFilterValues,
  User,
} from "../../../globalTypes";
import "./users.scss";
import { usePageTitle } from "../../hooks/usePageTitle";

const mapClientToApiFilters = (
  clientFilters: ClientFilterValues
): ApiFilterOptions => {
  return {
    organization: clientFilters.organization || undefined,
    username: clientFilters.username || undefined,
    email: clientFilters.email || undefined,
    phoneNumber: clientFilters.phoneNumber || undefined,
    dateJoined: clientFilters.dateJoined || undefined,
    status: clientFilters.status || undefined,
  };
};

export default function Users() {
  usePageTitle("Users | Lendsqr");

  const [page, setPage] = useState(1);

  const PAGE_SIZE_KEY = "users_page_size";
  const getInitialPageSize = (): number => {
    const stored = localStorage.getItem(PAGE_SIZE_KEY);
    const parsed = Number(stored);
    return parsed && [10, 20, 50, 100].includes(parsed) ? parsed : 10;
  };

  const [pageSize, setPageSize] = useState<number>(getInitialPageSize);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeApiFilters, setActiveApiFilters] = useState<ApiFilterOptions>(
    {}
  );

  const [tempDropdownFilters, setTempDropdownFilters] =
    useState<ClientFilterValues>({
      organization: "",
      username: "",
      email: "",
      dateJoined: "",
      phoneNumber: "",
      status: "",
    });

  const [activeDropdownFilters, setActiveDropdownFilters] =
    useState<ClientFilterValues>({
      organization: "",
      username: "",
      email: "",
      dateJoined: "",
      phoneNumber: "",
      status: "",
    });

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchQuery) {
      setActiveApiFilters((prev) => ({
        ...prev,
        search: searchQuery,
      }));
      setPage(1);
    } else {
      setActiveApiFilters((prev) => {
        const next = { ...prev };
        delete next.search;
        return next;
      });
    }
  }, [searchQuery]);

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

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    localStorage.setItem(PAGE_SIZE_KEY, String(pageSize));
  }, [pageSize]);

  const handleTempFilterChange = (
    field: keyof ClientFilterValues,
    value: string
  ) => {
    setTempDropdownFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyDropdownFilters = () => {
    setActiveDropdownFilters(tempDropdownFilters);
    setPage(1);
  };

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

  const handleResetAllFilters = () => {
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
        <div className="users-header">
          <h1>Users</h1>
        </div>

        <UserStats />

        {error && (
          <div className="error-alert">
            {error}
            <button onClick={loadUsers}>Retry</button>
          </div>
        )}

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
            <UsersTable
              data={tableData}
              onTempFilterChange={handleTempFilterChange}
              onApplyFilters={handleApplyDropdownFilters}
              onResetFilters={handleResetDropdownFilters}
              tempFilters={tempDropdownFilters}
              activeFilters={activeDropdownFilters}
            />

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
