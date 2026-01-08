import { useState } from "react";
import { ASSETS } from "../../constants/assets";

interface HeaderCellProps {
  label: string;
  children?: React.ReactNode;
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

      {hasDropdown && open && (
        <div className="filter-dropdown-wrapper">
          {children}
        </div>
      )}
    </th>
  );
};

export default HeaderCell;
