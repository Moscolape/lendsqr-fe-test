import React, { useRef } from "react";
import "./filter-dropdown.scss";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { filterConfig } from "../../../../configs/filterConfig";
import FilterField from "../ui/filter-field";
import FilterActions from "../ui/filter-actions";

export type FilterValues = {
  organization: string;
  username: string;
  email: string;
  date: string;
  phone: string;
  status: string;
};

interface FilterDropdownProps {
  values: FilterValues;
  onChange: (field: keyof FilterValues, value: string) => void;
  onReset: () => void;
  onFilter: () => void;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLImageElement | null>;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  values,
  onChange,
  onReset,
  onFilter,
  onClose,
  triggerRef
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, onClose, triggerRef ? [triggerRef] : []);

  return (
    <div className="filter-dropdown" ref={ref}>
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
