import { useUserFilters } from "../../hooks/useUserFilters";
import UserRowItem from "./user-row";
import UsersTableHeader from "./users-table-header";
import "./users-table.scss";

type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

export interface UserRow {
  id: number;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
}

interface Props {
  data: UserRow[];
}

const UsersTable: React.FC<Props> = ({ data }) => {
  const { filters, setFilters, filteredData, resetFilters } =
    useUserFilters(data);

  return (
    <div className="users-table-wrapper">
      <table className="users-table">
        <UsersTableHeader
          filters={filters}
          onChange={(field, value) =>
            setFilters((prev) => ({ ...prev, [field]: value }))
          }
          onReset={resetFilters}
        />

        <tbody>
          {filteredData.map((user, idx) => (
            <UserRowItem
              key={user.id}
              user={user}
              isLast={idx === filteredData.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
