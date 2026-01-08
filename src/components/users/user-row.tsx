import { useState } from "react";
import { MoreVertical } from "lucide-react";
import UserActionsDropdown from "./dropdowns/user-actions-dropdown";
import { type UserRow } from "./users-table";

interface Props {
  user: UserRow;
  isLast: boolean;
}

const UserRowItem: React.FC<Props> = ({ user, isLast }) => {
  const [open, setOpen] = useState(false);

  return (
    <tr style={!isLast ? { borderBottom: "1px solid #e5e7eb" } : undefined}>
      <td>{user.organization}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.dateJoined}</td>
      <td>
        <span className={`status ${user.status}`}>{user.status}</span>
      </td>

      <td className="actions">
        <button className="kebab-btn" onClick={() => setOpen(!open)}>
          <MoreVertical size={20} />
        </button>

        {open && <UserActionsDropdown onClose={() => setOpen(false)} />}
      </td>
    </tr>
  );
};

export default UserRowItem;
