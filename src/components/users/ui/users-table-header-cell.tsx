import { useRef, useState, cloneElement, type ReactElement } from "react";
import { ASSETS } from "../../../constants/assets";

// Props passed to any dropdown child component
interface ClosableDropdownProps {
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLImageElement | null>; // Reference to the icon for positioning
}

// Props for HeaderCell component
interface HeaderCellProps {
  label: string; // Column label
  children?: ReactElement<ClosableDropdownProps>; // Optional dropdown element
}

const HeaderCell: React.FC<HeaderCellProps> = ({ label, children }) => {
  const [open, setOpen] = useState(false); // Dropdown open/close state
  const triggerRef = useRef<HTMLImageElement>(null);
  const hasDropdown = Boolean(children); // Flag if dropdown exists

  return (
    <th className="filterable">
      {label}

      {/* Dropdown trigger icon */}
      <img
        ref={triggerRef}
        src={ASSETS.filter}
        className="filter-icon"
        onClick={() => hasDropdown && setOpen((p) => !p)}
      />

      {/* Render dropdown if it exists and is open */}
      {hasDropdown && open && children && (
        <div className="filter-dropdown-wrapper">
          {cloneElement(children, {
            onClose: () => setOpen(false), // Close callback
            triggerRef, // Pass icon reference for dropdown positioning
          })}
        </div>
      )}
    </th>
  );
};

export default HeaderCell;