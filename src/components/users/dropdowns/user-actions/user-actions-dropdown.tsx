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
  status?: string;
}

const UserActionsDropdown: React.FC<UserActionsDropdownProps> = ({
  onClose,
  onAction,
  triggerRef,
  status
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Closes dropdown if click occurs outside menu or optional trigger
  useClickOutside(menuRef, onClose, triggerRef ? [triggerRef] : []);

  return (
    <div className="actions-dropdown" ref={menuRef}>
      {/* Map over config, pass status down for ActionItem disable logic */}
      {userActions.map((action) => (
        <ActionItem
          key={action.key}
          icon={action.icon}
          label={action.label}
          onClick={() => {
            onAction?.(action.key); // optional chaining ensures safe call
            onClose();              // dropdown always closes on action
          }}
          status={status}
        />
      ))}
    </div>
  );
};

export default UserActionsDropdown;
