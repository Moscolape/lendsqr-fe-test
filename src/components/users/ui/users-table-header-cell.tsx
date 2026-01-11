import { useRef, useState, cloneElement, type ReactElement } from "react";
import { ASSETS } from "../../../constants/assets";

interface ClosableDropdownProps {
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLImageElement | null>;
}

interface HeaderCellProps {
  label: string;
  children?: ReactElement<ClosableDropdownProps>;
}

const HeaderCell: React.FC<HeaderCellProps> = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLImageElement>(null);
  const hasDropdown = Boolean(children);

  return (
    <th className="filterable">
      {label}

      <img
        ref={triggerRef}
        src={ASSETS.filter}
        className="filter-icon"
        onClick={() => hasDropdown && setOpen((p) => !p)}
      />

      {hasDropdown && open && children && (
        <div className="filter-dropdown-wrapper">
          {cloneElement(children, {
            onClose: () => setOpen(false),
            triggerRef,
          })}
        </div>
      )}
    </th>
  );
};

export default HeaderCell;