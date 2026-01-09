import { useState, cloneElement, type ReactElement } from "react";
import { ASSETS } from "../../../constants/assets";

interface ClosableDropdownProps {
  onClose: () => void;
}

interface HeaderCellProps {
  label: string;
  children?: ReactElement<ClosableDropdownProps>;
}

const HeaderCell: React.FC<HeaderCellProps> = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const hasDropdown = Boolean(children);

  return (
    <th className="filterable">
      {label}

      <img
        src={ASSETS.filter}
        className="filter-icon"
        onClick={() => hasDropdown && setOpen((p) => !p)}
      />

      {hasDropdown && open && children && (
        <div className="filter-dropdown-wrapper">
          {cloneElement(children, {
            onClose: () => setOpen(false),
          })}
        </div>
      )}
    </th>
  );
};

export default HeaderCell;
