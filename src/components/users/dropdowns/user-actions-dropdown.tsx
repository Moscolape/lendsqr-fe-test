import React, { useRef } from "react";
import "./user-actions-dropdown.scss";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { userActions } from "../../../utils/actionsConfig";
import ActionItem from "./user-actions";


interface UserActionsDropdownProps {
  onClose: () => void;
  onAction?: (action: string) => void;
}

const UserActionsDropdown: React.FC<UserActionsDropdownProps> = ({
  onClose,
  onAction,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, onClose);

  return (
    <div className="actions-dropdown" ref={menuRef}>
      {userActions.map((action) => (
        <ActionItem
          key={action.key}
          icon={action.icon}
          label={action.label}
          onClick={() => {
            onAction?.(action.key);
            onClose();
          }}
        />
      ))}
    </div>
  );
};

export default UserActionsDropdown;
