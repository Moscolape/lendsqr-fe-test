import { useState } from "react";

import DashboardWrapper from "../../components/dashboard/wrapper";
import Pagination from "../../components/users/pagination";
import UserStats from "../../components/users/ui/user-stats";
import UsersTable from "../../components/users/users-table";

import { users } from "../../utils/dummy-user-data";

import "./users.scss";

export default function Users() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  return (
    <DashboardWrapper>
      <div className="users-page">
        <h1>Users</h1>
        <UserStats />
        <UsersTable data={users} />
        <Pagination
          totalItems={100}
          pageSize={pageSize}
          currentPage={page}
          totalPages={16}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </DashboardWrapper>
  );
}
