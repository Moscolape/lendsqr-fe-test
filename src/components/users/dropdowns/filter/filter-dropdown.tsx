import React, { useRef } from "react";
import "./filter-dropdown.scss";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { filterConfig } from "../../../../configs/filterConfig";
import FilterField from "../ui/filter-field";
import FilterActions from "../ui/filter-actions";

// Central type for all supported filter fields
export type FilterValues = {
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: string;
};

interface FilterDropdownProps {
  // Current filter values (controlled by parent)
  values: FilterValues;

  // Called when a specific filter field changes
  onChange: (field: keyof FilterValues, value: string) => void;

  // Clears all filter values
  onReset: () => void;

  // Applies current filters
  onFilter: () => void;

  // Closes the dropdown
  onClose: () => void;

  // Optional reference to the element that triggered the dropdown
  triggerRef?: React.RefObject<HTMLImageElement | null>;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  values,
  onChange,
  onReset,
  onFilter,
  onClose,
  triggerRef,
}) => {
  // Ref used to detect outside clicks
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside, excluding trigger element if provided
  useClickOutside(ref, onClose, triggerRef ? [triggerRef] : []);

  return (
    <div className="filter-dropdown" ref={ref}>
      {/* Dynamically render fields based on configuration */}
      {filterConfig.map((field) => (
        <FilterField
          key={field.key}
          label={field.label}
          value={values[field.key]}
          type={field.type}
          placeholder={field.placeholder}
          options={field.options}
          onChange={(value) => onChange(field.key, value)}
        />
      ))}

      {/* Action buttons for resetting or applying filters */}
      <FilterActions
        onReset={onReset}
        onFilter={() => {
          onFilter();
          onClose();
        }}
      />
    </div>
  );
};

export default FilterDropdown;
