import React, { useRef } from "react";
import "./user-actions-dropdown.scss";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { userActions } from "../../../../configs/actionsConfig";
import ActionItem from "../ui/user-actions";

export type UserAction = "view" | "blacklist" | "activate";

interface UserActionsDropdownProps {
  onClose: () => void;
  onAction?: (action: UserAction) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const UserActionsDropdown: React.FC<UserActionsDropdownProps> = ({
  onClose,
  onAction,
  triggerRef
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, onClose, triggerRef ? [triggerRef] : []);

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
