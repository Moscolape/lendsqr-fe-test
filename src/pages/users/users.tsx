import { useState } from "react";
import DashboardWrapper from "../../components/dashboard/wrapper";
import Pagination from "../../components/users/pagination";
import UserStats from "../../components/users/user-stats";
import UsersTable, { type UserRow } from "../../components/users/users-table";
import "./users.scss";

export default function Users() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const users: UserRow[] = [
    {
      id: 1,
      organization: "Lendsqr",
      username: "Adedeji",
      email: "adedeji@lendsqr.com",
      phoneNumber: "08078903721",
      dateJoined: "May 15, 2020 10:00 AM",
      status: "inactive",
    },
    {
      id: 2,
      organization: "Lendsqr",
      username: "Adedeji",
      email: "adedeji@lendsqr.com",
      phoneNumber: "08078903721",
      dateJoined: "May 15, 2020 10:00 AM",
      status: "active",
    },
    {
      id: 3,
      organization: "Lendsqr",
      username: "Adedeji",
      email: "adedeji@lendsqr.com",
      phoneNumber: "08078903721",
      dateJoined: "May 15, 2020 10:00 AM",
      status: "pending",
    },
    {
      id: 4,
      organization: "Lendsqr",
      username: "Adedeji",
      email: "adedeji@lendsqr.com",
      phoneNumber: "08078903721",
      dateJoined: "May 15, 2020 10:00 AM",
      status: "blacklisted",
    },
    {
      id: 5,
      organization: "Lendsqr",
      username: "Adedeji",
      email: "adedeji@lendsqr.com",
      phoneNumber: "08078903721",
      dateJoined: "May 15, 2020 10:00 AM",
      status: "inactive",
    },
    {
      id: 6,
      organization: "Lendsqr",
      username: "Adedeji",
      email: "adedeji@lendsqr.com",
      phoneNumber: "08078903721",
      dateJoined: "May 15, 2020 10:00 AM",
      status: "active",
    },
    {
      id: 7,
      organization: "Lendsqr",
      username: "Adedeji",
      email: "adedeji@lendsqr.com",
      phoneNumber: "08078903721",
      dateJoined: "May 15, 2020 10:00 AM",
      status: "pending",
    },
    {
      id: 8,
      organization: "Lendsqr",
      username: "Adedeji",
      email: "adedeji@lendsqr.com",
      phoneNumber: "08078903721",
      dateJoined: "May 15, 2020 10:00 AM",
      status: "blacklisted",
    },
  ];

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
