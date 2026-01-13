interface ActionItemProps {
  // Icon URL for the action
  icon: string;

  // Action label displayed to the user
  label: string;

  // Optional click handler (some actions may be read-only)
  onClick?: () => void;

  // Current user status, used to control disabled state
  status?: string;
}

const ActionItem: React.FC<ActionItemProps> = ({
  icon,
  label,
  onClick,
  status,
}) => {
  // Centralized disable logic to prevent invalid user actions
  const isDisabled =
    (label === "Activate User" && status === "active") ||
    (label === "Blacklist User" && status === "blacklisted");

  return (
    <button
      className="dropdown-item"
      onClick={onClick}
      disabled={isDisabled}
    >
      {/* Icon improves visual affordance of the action */}
      <img src={icon} alt={label} />

      {/* Label communicates the action intent */}
      <span>{label}</span>
    </button>
  );
};

export default ActionItem;
