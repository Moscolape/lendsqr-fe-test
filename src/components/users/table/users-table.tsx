import type { ClientFilterValues } from "../../../../globalTypes";
import UserRowItem from "../ui/user-row";
import UsersTableHeader from "../ui/users-table-header";
import "./users-table.scss";

// Status types for users
type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

// Type for a row in the users table
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
  data: UserRow[]; // Array of users to display
  onTempFilterChange?: (field: keyof ClientFilterValues, value: string) => void;
  onApplyFilters?: () => void;
  onResetFilters?: () => void;
  tempFilters?: ClientFilterValues; // filters being edited
  activeFilters?: ClientFilterValues; // filters applied
}

const UsersTable: React.FC<Props> = ({
  data,
  onTempFilterChange = () => {}, // safe defaults to prevent undefined
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
        {/* Header handles filter inputs */}
        <UsersTableHeader
          tempFilters={tempFilters}
          onTempFilterChange={onTempFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />

        <tbody>
          {data.map((user, idx) => (
            <UserRowItem
              key={user.id} // ensure unique key for React rendering
              user={user}
              isLast={idx === data.length - 1} // used for styling
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;