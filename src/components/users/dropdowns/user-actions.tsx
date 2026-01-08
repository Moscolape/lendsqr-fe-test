interface ActionItemProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button className="dropdown-item" onClick={onClick}>
      <img src={icon} alt={label} />
      <span>{label}</span>
    </button>
  );
};

export default ActionItem;
