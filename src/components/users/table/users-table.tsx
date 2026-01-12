import type { ClientFilterValues } from "../../../../globalTypes";
import UserRowItem from "../ui/user-row";
import UsersTableHeader from "../ui/users-table-header";
import "./users-table.scss";

type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

export interface UserRow {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
}

interface Props {
  data: UserRow[];
  onTempFilterChange?: (field: keyof ClientFilterValues, value: string) => void;
  onApplyFilters?: () => void;
  onResetFilters?: () => void;
  tempFilters?: ClientFilterValues;
  activeFilters?: ClientFilterValues;
}

const UsersTable: React.FC<Props> = ({
  data,
  onTempFilterChange = () => {},
  onApplyFilters = () => {},
  onResetFilters = () => {},
  tempFilters = {
    organization: "",
    username: "",
    email: "",
    dateJoined: "",
    phoneNumber: "",
    status: "",
  },
}) => {
  return (
    <div className="users-table-wrapper">
      <table className="users-table">
        <UsersTableHeader
          tempFilters={tempFilters}
          onTempFilterChange={onTempFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />

        <tbody>
          {data.map((user, idx) => (
            <UserRowItem
              key={user.id}
              user={user}
              isLast={idx === data.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
