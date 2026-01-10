import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MoreVertical } from "lucide-react";
import UserActionsDropdown from "../dropdowns/user-actions-dropdown";
import { type UserRow } from "../users-table";
import BlacklistUserModal from "../../modals/blacklist-modal";
import ActivateUserModal from "../../modals/activate-modal";

interface Props {
  user: UserRow;
  isLast: boolean;
}

const UserRowItem: React.FC<Props> = ({ user, isLast }) => {
  const [open, setOpen] = useState(false);
  const [blacklistModalOpen, setBlacklistModalOpen] = useState(false);
  const [activateModalOpen, setActivateModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleAction = (action: string) => {
    switch (action) {
      case "view":
        navigate(`/user/${user.id}`);
        break;

      case "blacklist":
        setOpen(false);
        setBlacklistModalOpen(true);
        break;

      case "activate":
        setOpen(false);
        setActivateModalOpen(true);
        break;

      default:
        break;
    }
  };

  return (
    <>
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

          {open && (
            <UserActionsDropdown
              onAction={handleAction}
              onClose={() => setOpen(false)}
            />
          )}
        </td>
      </tr>

      {blacklistModalOpen && (
        <BlacklistUserModal
          isOpen={blacklistModalOpen}
          userId={user.id}
          close={() => setBlacklistModalOpen(false)}
        />
      )}

      {activateModalOpen && (
        <ActivateUserModal
          isOpen={activateModalOpen}
          userId={user.id}
          close={() => setActivateModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserRowItem;
